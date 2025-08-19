import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import connectDB from "@/lib/db";
import DocumentUpload from "@/schema/DocumentUpload";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Embed image in PDF
async function embedImageWithLabelFromURL(
  pdfDoc: PDFDocument,
  page,
  imageUrl: string,
  label: string,
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
  const labelY = yStart - imgHeight - 25;
  const textWidth = font.widthOfTextAtSize(label, 16);
  const labelX = (pageWidth - textWidth) / 2;
  page.drawText(label, { x: labelX, y: labelY, size: 16, font, color: rgb(0, 0, 0) });
  return labelY - 40;
}

// Generate PDF & send email
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

  // Owner Docs
  if (newDoc.ownerAadhar) {
    y = await embedImageWithLabelFromURL(pdfDoc, page1, newDoc.ownerAadhar, "Owner Aadhar Card", y, 500, 500, font);
  }
  if (newDoc.ownerPan) {
    const page2 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page2, newDoc.ownerPan, "Owner PAN Card", 800, 500, 600, font);
  }
  if (newDoc.ownerIndex2) {
    const page3 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page3, newDoc.ownerIndex2, "Owner Index 2 Photo Copy", 800, 500, 600, font);
  }

  // Renter Docs
  if (newDoc.renterAadhar) {
    const page4 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page4, newDoc.renterAadhar, "Renter Aadhar Card", 800, 500, 600, font);
  }
  if (newDoc.renterPan) {
    const page5 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page5, newDoc.renterPan, "Renter PAN Card", 800, 500, 600, font);
  }

  const pdfBytes = await pdfDoc.save();
  const pdfBuffer = Buffer.from(pdfBytes);

  const transporter = nodemailer.createTransport({
    service: "gmail",
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

// Upload to Cloudinary
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

export async function POST(req: Request) {
  try {
    await connectDB();
    const form = await req.formData();

    const name = form.get("name") as string;
    const phone = form.get("phone") as string;
    const recaptchaToken = form.get("g-recaptcha-response") as string; // ✅ frontend se milega

    // ✅ Validate required fields
    if (!name || !phone || !recaptchaToken) {
      return NextResponse.json(
        { success: false, error: "Missing fields or reCAPTCHA" },
        { status: 400 }
      );
    }

    // ✅ Verify reCAPTCHA with Google
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );
    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { success: false, error: "Failed reCAPTCHA verification" },
        { status: 400 }
      );
    }

    // ✅ Upload files
    const ownerAadhar = await uploadToCloudinary(form.get("ownerAadhar") as File);
    const ownerPan = await uploadToCloudinary(form.get("ownerPan") as File);
    const ownerIndex2 = await uploadToCloudinary(form.get("ownerIndex2") as File);
    const renterAadhar = await uploadToCloudinary(form.get("renterAadhar") as File);
    const renterPan = await uploadToCloudinary(form.get("renterPan") as File);

    // ✅ Save in DB
    const newDoc = await DocumentUpload.create({
      name,
      phone,
      ownerAadhar,
      ownerPan,
      ownerIndex2,
      renterAadhar,
      renterPan,
    });

    // ✅ Send email & generate PDF asynchronously
    processPDFandSendMail(newDoc).catch(console.error);

    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

