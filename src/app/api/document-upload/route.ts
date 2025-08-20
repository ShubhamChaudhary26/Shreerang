import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import connectDB from "@/lib/db";
import DocumentUpload, { IDocumentUpload } from "@/schema/DocumentUpload";
import { v2 as cloudinary } from "cloudinary";
import vision from "@google-cloud/vision";

export const runtime = "nodejs";

// ===== Cloudinary =====
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// ===== Google Vision client (from env JSON) =====
const visionClient = new vision.ImageAnnotatorClient({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON as string),
});

// ===== Helpers: OCR & Parsers =====
async function extractTextFromImage(imageUrl?: string | null): Promise<string> {
  if (!imageUrl) return "";
  try {
    const [res] = await visionClient.textDetection(imageUrl);
    return res.textAnnotations?.[0]?.description?.trim() || "";
  } catch (e) {
    console.error("OCR error:", e);
    return "";
  }
}

/** Extract Aadhaar: handles 1234 5678 9012 or 123456789012 */
function parseAadhaarNumber(text: string): string {
  if (!text) return "";
  // remove non-digits, then detect 12 digits
  const compact = text.replace(/\D+/g, "");
  const match = compact.match(/\b\d{12}\b/);
  if (match) return match[0];
  // alt: spaced pattern
  const spaced = text.match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);
  if (spaced) return spaced[0].replace(/\s+/g, "");
  return "";
}

/** Extract PAN: 5 letters + 4 digits + 1 letter (case-insensitive) */
function parsePANNumber(text: string): string {
  if (!text) return "";
  const m = text.toUpperCase().match(/\b([A-Z]{5}\d{4}[A-Z])\b/);
  return m ? m[1] : "";
}

// ===== PDF Helpers =====
async function embedImageWithLabelFromURL(
  pdfDoc: PDFDocument,
  page: any,
  imageUrl: string,
  label: string,
  yStart: number,
  maxWidth: number,
  maxHeight: number,
  font: any
) {
  if (!imageUrl) return yStart;
  const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
  const isPng = imageUrl.toLowerCase().endsWith(".png");
  const image = isPng ? await pdfDoc.embedPng(imageBytes) : await pdfDoc.embedJpg(imageBytes);

  const { width: pageWidth } = page.getSize();
  const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
  const imgWidth = image.width * scale;
  const imgHeight = image.height * scale;
  const x = (pageWidth - imgWidth) / 2;

  page.drawImage(image, { x, y: yStart - imgHeight, width: imgWidth, height: imgHeight });

  const labelY = yStart - imgHeight - 18;
  const textWidth = font.widthOfTextAtSize(label, 14);
  const labelX = (pageWidth - textWidth) / 2;
  page.drawText(label, { x: labelX, y: labelY, size: 14, font, color: rgb(0, 0, 0) });

  return labelY - 26;
}

async function processPDFandSendMail(newDoc: any) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page1 = pdfDoc.addPage([595, 842]);
  let y = 800;

  // Title + basic
  page1.drawText("Rent Agreement Submission", { x: 50, y, size: 22, font });
  y -= 40;
  page1.drawText(`Name: ${newDoc.name || "-"}`, { x: 50, y, size: 14, font });
  y -= 20;
  page1.drawText(`Phone: ${newDoc.phone || "-"}`, { x: 50, y, size: 14, font });
  y -= 32;

  // Owner Aadhaar
  if (newDoc.ownerAadhar) {
    y = await embedImageWithLabelFromURL(pdfDoc, page1, newDoc.ownerAadhar, "Owner Aadhaar Card", y, 500, 420, font);
    // extracted
    const aadhaar = newDoc.ownerAadharNumber ? `Aadhaar: ${newDoc.ownerAadharNumber}` : "";
    if (aadhaar) {
      page1.drawText(aadhaar, { x: 50, y, size: 12, font, color: rgb(0, 0, 0) });
      y -= 18;
    }
  }

  // Owner PAN (new page)
  if (newDoc.ownerPan) {
    const page2 = pdfDoc.addPage([595, 842]);
    let y2 = 800;
    y2 = await embedImageWithLabelFromURL(pdfDoc, page2, newDoc.ownerPan, "Owner PAN Card", y2, 500, 600, font);
    const pan = newDoc.ownerPanNumber ? `PAN: ${newDoc.ownerPanNumber}` : "";
    if (pan) page2.drawText(pan, { x: 50, y: y2, size: 12, font, color: rgb(0, 0, 0) });
  }

  // Owner Index-2
  if (newDoc.ownerIndex2) {
    const page3 = pdfDoc.addPage([595, 842]);
    let y3 = 800;
    y3 = await embedImageWithLabelFromURL(
      pdfDoc,
      page3,
      newDoc.ownerIndex2,
      "Owner Index 2 Photo Copy",
      y3,
      500,
      600,
      font
    );
  }

  // Renter Aadhaar
  if (newDoc.renterAadhar) {
    const page4 = pdfDoc.addPage([595, 842]);
    let y4 = 800;
    y4 = await embedImageWithLabelFromURL(pdfDoc, page4, newDoc.renterAadhar, "Renter Aadhaar Card", y4, 500, 600, font);
    const aadhaar = newDoc.renterAadharNumber ? `Aadhaar: ${newDoc.renterAadharNumber}` : "";
    if (aadhaar) page4.drawText(aadhaar, { x: 50, y: y4, size: 12, font, color: rgb(0, 0, 0) });
  }

  // Renter PAN
  if (newDoc.renterPan) {
    const page5 = pdfDoc.addPage([595, 842]);
    let y5 = 800;
    y5 = await embedImageWithLabelFromURL(pdfDoc, page5, newDoc.renterPan, "Renter PAN Card", y5, 500, 600, font);
    const pan = newDoc.renterPanNumber ? `PAN: ${newDoc.renterPanNumber}` : "";
    if (pan) page5.drawText(pan, { x: 50, y: y5, size: 12, font, color: rgb(0, 0, 0) });
  }

  const pdfBytes = await pdfDoc.save();
  const pdfBuffer = Buffer.from(pdfBytes);

  // Email
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

// ===== Cloudinary Upload Helper =====
const uploadToCloudinary = async (file: File | null) => {
  if (!file) return "";
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "rent_agreements" },
      (err, result) => (err ? reject(err) : resolve(result?.secure_url || ""))
    );
    stream.end(buffer);
  });
};

// ===== API Route: POST =====
export async function POST(req: Request) {
  try {
    await connectDB();
    const form = await req.formData();

    // reCAPTCHA
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

    // Basic fields
    const name = (form.get("name") as string) || "";
    const phone = (form.get("phone") as string) || "";
    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    // Upload images
    const [ownerAadhar, ownerPan, ownerIndex2, renterAadhar, renterPan] = await Promise.all([
      uploadToCloudinary(form.get("ownerAadhar") as File),
      uploadToCloudinary(form.get("ownerPan") as File),
      uploadToCloudinary(form.get("ownerIndex2") as File),
      uploadToCloudinary(form.get("renterAadhar") as File),
      uploadToCloudinary(form.get("renterPan") as File),
    ]);

    // OCR (parallel)
    const [ownerAadharText, ownerPanText, ownerIndex2Text, renterAadharText, renterPanText] = await Promise.all([
      extractTextFromImage(ownerAadhar),
      extractTextFromImage(ownerPan),
      extractTextFromImage(ownerIndex2),
      extractTextFromImage(renterAadhar),
      extractTextFromImage(renterPan),
    ]);

    // Parsed numbers
    const ownerAadharNumber = parseAadhaarNumber(ownerAadharText);
    const ownerPanNumber = parsePANNumber(ownerPanText);
    const renterAadharNumber = parseAadhaarNumber(renterAadharText);
    const renterPanNumber = parsePANNumber(renterPanText);

    // Save to DB
const newDoc = (await DocumentUpload.create({
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
  ownerAadharNumber,
  ownerPanNumber,
  renterAadharNumber,
  renterPanNumber,
})) as unknown as IDocumentUpload;


    // Fire & forget email (no blocking)
    processPDFandSendMail(newDoc).catch(console.error);

    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
