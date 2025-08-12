import mongoose, { Schema, Document } from 'mongoose';

export interface IOTP extends Document {
  email: string;
  name: string;
  phone: string;
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
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // 5 minutes me auto delete
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

// Unique index on email
otpSchema.index({ email: 1 }, { unique: true });

const OtpSchema = mongoose.models.Otp || mongoose.model<IOTP>('Otp', otpSchema);

export default OtpSchema;