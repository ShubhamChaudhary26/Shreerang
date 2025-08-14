import mongoose, { Schema, Model } from 'mongoose';

const userSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, 'Full name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, 'Phone number is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'], 
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema: Model<any> = mongoose.models.User || mongoose.model('User', userSchema);
export default UserSchema;
