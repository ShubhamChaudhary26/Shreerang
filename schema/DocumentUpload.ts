import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IDocumentUpload extends Document {
  name: string;
  phone: string;

  ownerAadhar?: string; // URL
  ownerPan?: string;    // URL
  ownerIndex2?: string; // URL
  renterAadhar?: string;// URL
  renterPan?: string;   // URL

  // OCR raw text
  ownerAadharText?: string;
  ownerPanText?: string;
  ownerIndex2Text?: string;
  renterAadharText?: string;
  renterPanText?: string;

  // Parsed (clean) fields
  ownerAadharNumber?: string;
  ownerPanNumber?: string;
  renterAadharNumber?: string;
  renterPanNumber?: string;

  createdAt: Date;
  updatedAt: Date;
}

const DocumentUploadSchema = new Schema<IDocumentUpload>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },

    ownerAadhar: String,
    ownerPan: String,
    ownerIndex2: String,
    renterAadhar: String,
    renterPan: String,

    ownerAadharText: String,
    ownerPanText: String,
    ownerIndex2Text: String,
    renterAadharText: String,
    renterPanText: String,

    ownerAadharNumber: String,
    ownerPanNumber: String,
    renterAadharNumber: String,
    renterPanNumber: String,
  },
  { timestamps: true }
);

// 👇 Cast properly to Model<IDocumentUpload>
const DocumentUpload: Model<IDocumentUpload> =
  (models.DocumentUpload as Model<IDocumentUpload>) ||
  mongoose.model<IDocumentUpload>("DocumentUpload", DocumentUploadSchema);

export default DocumentUpload;
