import mongoose, { Schema, Document, Model } from "mongoose";

// plain object interface (lean() ke liye)
export interface IDocumentUpload {
  name: string;
  phone: string;
  ownerAadhar?: string;
  ownerPan?: string;
  ownerIndex2?: string;
  renterAadhar?: string;
  renterPan?: string;
  ownerAadharText?: string;
  ownerPanText?: string;
  ownerIndex2Text?: string;
  renterAadharText?: string;
  renterPanText?: string;
  createdAt: Date;
  updatedAt: Date;
}

// mongoose document type (schema ke liye)
export type IDocumentUploadDoc = IDocumentUpload & Document;

const DocumentUploadSchema = new Schema<IDocumentUploadDoc>(
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
  },
  { timestamps: true }
);

const DocumentUpload: Model<IDocumentUploadDoc> =
  mongoose.models.DocumentUpload ||
  mongoose.model<IDocumentUploadDoc>("DocumentUpload", DocumentUploadSchema);

export default DocumentUpload;
