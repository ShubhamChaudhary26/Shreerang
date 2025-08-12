import mongoose, { Schema, Model, Document } from "mongoose";

export interface IDocumentUpload {
  name: string;
  phone: string;
  aadharCard: string;
  panCard: string;
  agreementImage: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DocumentUploadDocument = IDocumentUpload & Document;

const DocumentUploadSchema = new Schema<DocumentUploadDocument>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    aadharCard: { type: String, required: true },
    panCard: { type: String, required: true },
    agreementImage: { type: String, required: true },
  },
  { timestamps: true }
);

const DocumentUpload: Model<DocumentUploadDocument> =
  mongoose.models.DocumentUpload ||
  mongoose.model<DocumentUploadDocument>("DocumentUpload", DocumentUploadSchema);

export default DocumentUpload;
