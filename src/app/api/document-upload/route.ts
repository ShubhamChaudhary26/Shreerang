import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import connectDB from "@/lib/db";
import DocumentUpload from "@/schema/DocumentUpload";

export const runtime = "nodejs";

async function embedImageWithLabel(
  pdfDoc: PDFDocument,
  page,
  imagePath: string,
  label: string,
  yStart: number,
  maxWidth: number,
  maxHeight: number,
  font: any
) {
  if (!fs.existsSync(imagePath)) return yStart;

  const imageBytes = fs.readFileSync(imagePath);
  let image;
  if (imagePath.toLowerCase().endsWith(".png")) {
    image = await pdfDoc.embedPng(imageBytes);
  } else {
    image = await pdfDoc.embedJpg(imageBytes);
  }

  const { width: pageWidth } = page.getSize();

  const widthScale = maxWidth / image.width;
  const heightScale = maxHeight / image.height;
  const scale = Math.min(widthScale, heightScale, 1);

  const imgWidth = image.width * scale;
  const imgHeight = image.height * scale;

  const x = (pageWidth - imgWidth) / 2;

  page.drawImage(image, { x, y: yStart - imgHeight, width: imgWidth, height: imgHeight });

  // Draw label centered below image
  const labelY = yStart - imgHeight - 25;
  const textWidth = font.widthOfTextAtSize(label, 16);
  const labelX = (pageWidth - textWidth) / 2;

  page.drawText(label, { x: labelX, y: labelY, size: 16, font, color: rgb(0, 0, 0) });

  return labelY - 40;
}

// Fire and forget PDF generation + email sending (async, separate)
async function processPDFandSendMail(newDoc) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const aadharPath = newDoc.aadharCard
    ? path.join(process.cwd(), "public", newDoc.aadharCard)
    : null;
  const panPath = newDoc.panCard
    ? path.join(process.cwd(), "public", newDoc.panCard)
    : null;
  const agreementPath = newDoc.agreementImage
    ? path.join(process.cwd(), "public", newDoc.agreementImage)
    : null;

  // PAGE 1
  const page1 = pdfDoc.addPage([595, 842]);
  let y = 800;
  page1.drawText("Rent Agreement Submission", { x: 50, y, size: 24, font });
  y -= 50;
  page1.drawText(`Name: ${newDoc.name}`, { x: 50, y, size: 16, font });
  y -= 25;
  page1.drawText(`Phone: ${newDoc.phone}`, { x: 50, y, size: 16, font });
  y -= 40;

  if (aadharPath) {
    y = await embedImageWithLabel(pdfDoc, page1, aadharPath, "Aadhar Card", y, 550, 550, font);
  }

  if (panPath) {
    const page2 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabel(pdfDoc, page2, panPath, "PAN Card", 800, 550, 700, font);
  }

  if (agreementPath) {
    const page3 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabel(pdfDoc, page3, agreementPath, "Agreement Document", 800, 550, 700, font);
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
    from: `"Shereerang" <${process.env.EmailUser}>`,
    to: process.env.RECEIVE_EMAIL,
    subject: "New Rent Agreement Submission",
    text: `New submission from ${newDoc.name} (${newDoc.phone})`,
    attachments: [{ filename: "submission.pdf", content: pdfBuffer }],
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const form = await req.formData();
    const name = form.get("name") as string;
    const phone = form.get("phone") as string;

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const saveFile = async (file: File | null) => {
      if (!file) return "";
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
      fs.writeFileSync(filePath, buffer);
      return `/uploads/${path.basename(filePath)}`;
    };

    const aadharCard = await saveFile(form.get("aadharCard") as File);
    const panCard = await saveFile(form.get("panCard") as File);
    const agreementImage = await saveFile(form.get("agreementImage") as File);

    const newDoc = await DocumentUpload.create({
      name,
      phone,
      aadharCard,
      panCard,
      agreementImage,
    });

    // Fire and forget PDF generation + email sending
    processPDFandSendMail(newDoc).catch(console.error);

    // Immediately respond success to client
    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
