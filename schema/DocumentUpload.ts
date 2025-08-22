import mongoose, { Schema, Model, Document } from "mongoose";

export interface IDocumentUpload {
  name: string;
  phone: string;
  rentAmount: number;
  depositAmount: number;
  ownerAadhar: string;
  ownerPan: string;
  ownerIndex2: string;
  renterAadhar?: string;
  renterPan?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DocumentUploadDocument = IDocumentUpload & Document;

const DocumentUploadSchema = new Schema<DocumentUploadDocument>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    ownerAadhar: { type: String, required: true },
    ownerPan: { type: String, required: true },
    ownerIndex2: { type: String, required: true },
    renterAadhar: { type: String },
    renterPan: { type: String },
  },
  { timestamps: true }
);

const DocumentUpload: Model<DocumentUploadDocument> =
  mongoose.models.DocumentUpload ||
  mongoose.model<DocumentUploadDocument>("DocumentUpload", DocumentUploadSchema);

export default DocumentUpload;
