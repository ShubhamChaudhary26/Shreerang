import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import connectDB from "@/lib/db";
import DocumentUpload from "@/schema/DocumentUpload";
import { v2 as cloudinary } from "cloudinary";
import Tesseract from "tesseract.js";

export const runtime = "nodejs";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ OCR Function
async function extractTextFromImage(imageUrl: string): Promise<string> {
  try {
    const { data: { text } } = await Tesseract.recognize(imageUrl, "eng");
    return text.trim();
  } catch (err) {
    console.error("OCR Error:", err);
    return "";
  }
}

// ✅ Helper: Embed image in PDF
async function embedImageWithLabelFromURL(
  pdfDoc: PDFDocument,
  page,
  imageUrl: string,
  label: string,
  extractedText: string,
  yStart: number,
  maxWidth: number,
  maxHeight: number,
  font: any
) {
  if (!imageUrl) return yStart;
  const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
  const image = imageUrl.toLowerCase().endsWith(".png")
    ? await pdfDoc.embedPng(imageBytes)
    : await pdfDoc.embedJpg(imageBytes);

  const { width: pageWidth } = page.getSize();
  const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
  const imgWidth = image.width * scale;
  const imgHeight = image.height * scale;
  const x = (pageWidth - imgWidth) / 2;

  page.drawImage(image, { x, y: yStart - imgHeight, width: imgWidth, height: imgHeight });
  let currentY = yStart - imgHeight - 25;

  // Label
  const textWidth = font.widthOfTextAtSize(label, 16);
  const labelX = (pageWidth - textWidth) / 2;
  page.drawText(label, { x: labelX, y: currentY, size: 16, font, color: rgb(0, 0, 0) });

  currentY -= 30;

  // Extracted text
  if (extractedText) {
    page.drawText("Extracted Text:", { x: 50, y: currentY, size: 12, font });
    currentY -= 20;
    const lines = extractedText.split("\n");
    for (let line of lines) {
      page.drawText(line, { x: 50, y: currentY, size: 10, font });
      currentY -= 15;
    }
  }

  return currentY - 40;
}

// ✅ Helper: Generate PDF & send mail
async function processPDFandSendMail(newDoc) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page1 = pdfDoc.addPage([595, 842]);
  let y = 800;
  page1.drawText("Rent Agreement Submission", { x: 50, y, size: 24, font });
  y -= 50;
  page1.drawText(`Name: ${newDoc.name}`, { x: 50, y, size: 16, font });
  y -= 25;
  page1.drawText(`Phone: ${newDoc.phone}`, { x: 50, y, size: 16, font });
  y -= 40;

  if (newDoc.ownerAadhar) {
    y = await embedImageWithLabelFromURL(pdfDoc, page1, newDoc.ownerAadhar, "Owner Aadhar Card", newDoc.ownerAadharText, y, 500, 500, font);
  }
  if (newDoc.ownerPan) {
    const page2 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page2, newDoc.ownerPan, "Owner PAN Card", newDoc.ownerPanText, 800, 500, 600, font);
  }
  if (newDoc.ownerIndex2) {
    const page3 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page3, newDoc.ownerIndex2, "Owner Index 2", newDoc.ownerIndex2Text, 800, 500, 600, font);
  }
  if (newDoc.renterAadhar) {
    const page4 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page4, newDoc.renterAadhar, "Renter Aadhar Card", newDoc.renterAadharText, 800, 500, 600, font);
  }
  if (newDoc.renterPan) {
    const page5 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page5, newDoc.renterPan, "Renter PAN Card", newDoc.renterPanText, 800, 500, 600, font);
  }

  const pdfBytes = await pdfDoc.save();
  const pdfBuffer = Buffer.from(pdfBytes);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EmailUser,
      pass: process.env.EmailPassword,
    },
  });

  await transporter.sendMail({
    from: `"Shreerang" <${process.env.EmailUser}>`,
    to: process.env.RECEIVE_EMAIL,
    subject: "New Rent Agreement Submission",
    text: `New submission from ${newDoc.name} (${newDoc.phone})`,
    attachments: [{ filename: "submission.pdf", content: pdfBuffer }],
  });
}

// ✅ Helper: Upload to Cloudinary
const uploadToCloudinary = async (file: File | null) => {
  if (!file) return "";
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "rent_agreements" }, (err, result) => {
      if (err) reject(err);
      else resolve(result?.secure_url || "");
    });
    stream.end(buffer);
  });
};

// ✅ API Route
export async function POST(req: Request) {
  try {
    await connectDB();
    const form = await req.formData();

    // 🛡️ reCAPTCHA verification
    const token = form.get("captcha") as string;
    if (!token) {
      return NextResponse.json({ success: false, error: "reCAPTCHA token missing" }, { status: 400 });
    }

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json({ success: false, error: "Invalid reCAPTCHA" }, { status: 400 });
    }

    // ✅ Form fields
    const name = form.get("name") as string;
    const phone = form.get("phone") as string;
    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    // ✅ Upload + OCR
    const ownerAadhar = await uploadToCloudinary(form.get("ownerAadhar") as File);
    const ownerAadharText = ownerAadhar ? await extractTextFromImage(ownerAadhar) : "";

    const ownerPan = await uploadToCloudinary(form.get("ownerPan") as File);
    const ownerPanText = ownerPan ? await extractTextFromImage(ownerPan) : "";

    const ownerIndex2 = await uploadToCloudinary(form.get("ownerIndex2") as File);
    const ownerIndex2Text = ownerIndex2 ? await extractTextFromImage(ownerIndex2) : "";

    const renterAadhar = await uploadToCloudinary(form.get("renterAadhar") as File);
    const renterAadharText = renterAadhar ? await extractTextFromImage(renterAadhar) : "";

    const renterPan = await uploadToCloudinary(form.get("renterPan") as File);
    const renterPanText = renterPan ? await extractTextFromImage(renterPan) : "";

    // ✅ Save to DB (only image + OCR text)
 const newDoc = new DocumentUpload({
  name,
  phone,
  ownerAadhar,
  ownerPan,
  ownerIndex2,
  renterAadhar,
  renterPan,
  ownerAadharText,
  ownerPanText,
  ownerIndex2Text,
  renterAadharText,
  renterPanText,
});

await newDoc.save();


    processPDFandSendMail(newDoc).catch(console.error);

    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
