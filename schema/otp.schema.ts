import mongoose, { Schema, Document } from 'mongoose';

export interface IOTP extends Document {
  email: string;
  otp: string; 
  createdAt: Date; 
  updatedAt: Date; 
  expiresAt: Date; 
}

const otpSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, 
    },
    expiresAt: {
      type: Date,
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Define index only here
otpSchema.index({ email: 1 }, { unique: true });

const OtpSchema = mongoose.models.Otp || mongoose.model<IOTP>('Otp', otpSchema);

export default OtpSchema;