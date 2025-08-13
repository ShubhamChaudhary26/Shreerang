import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import fetch from "node-fetch"; // Cloudinary URL se image fetch
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
  let image;
  if (imageUrl.toLowerCase().endsWith(".png")) {
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

  const labelY = yStart - imgHeight - 25;
  const textWidth = font.widthOfTextAtSize(label, 16);
  const labelX = (pageWidth - textWidth) / 2;

  page.drawText(label, { x: labelX, y: labelY, size: 16, font, color: rgb(0, 0, 0) });

  return labelY - 40;
}

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

  if (newDoc.aadharCard) {
    y = await embedImageWithLabelFromURL(pdfDoc, page1, newDoc.aadharCard, "Aadhar Card", y, 550, 550, font);
  }

  if (newDoc.panCard) {
    const page2 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page2, newDoc.panCard, "PAN Card", 800, 550, 700, font);
  }

  if (newDoc.agreementImage) {
    const page3 = pdfDoc.addPage([595, 842]);
    await embedImageWithLabelFromURL(pdfDoc, page3, newDoc.agreementImage, "Agreement Document", 800, 550, 700, font);
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

    const aadharCard = await uploadToCloudinary(form.get("aadharCard") as File);
    const panCard = await uploadToCloudinary(form.get("panCard") as File);
    const agreementImage = await uploadToCloudinary(form.get("agreementImage") as File);

    const newDoc = await DocumentUpload.create({ name, phone, aadharCard, panCard, agreementImage });

    processPDFandSendMail(newDoc).catch(console.error);

    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
