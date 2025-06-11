import mongoose, { Schema, Model } from 'mongoose';

// Sub-schema for Education
const EducationSchema: Schema = new Schema({
  id: { type: Number },
  degree: { type: String, trim: true },
  institution: { type: String, trim: true },
  duration: { type: String, trim: true },
  description: { type: String, trim: true, default: '' },
});

// Sub-schema for Experience
const ExperienceSchema: Schema = new Schema({
  id: { type: Number },
  title: { type: String, trim: true },
  company: { type: String, trim: true },
  duration: { type: String, trim: true },
  description: { type: String, trim: true, default: '' },
});

// Sub-schema for Work Availability
const WorkAvailabilitySchema: Schema = new Schema({
  days: { type: [String] },
  hours: { type: Number },
});

const userSchema: Schema = new Schema(
  {
    age: {
      type: String,
      enum: ['18 - 22 Years', '23 - 27 Years', '28 - 32 Years', '33 - 37 Years', '38+ Years'],
      // required: true,
    },
    companyName: {
      type: String,
      trim: true,
      // required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    employmentStatus: {
      type: String,
      enum: ['Employed', 'Unemployed'],
      // required: true,
    },
    experience: {
      type: String,
      trim: true,
      // required: true,
    },
    fullName: {
      type: String,
      trim: true,
      // required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
      // required: true,
    },
    industry: {
      type: String,
      trim: true,
      // required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    jobTitle: {
      type: String,
      trim: true,
      // required: true,
    },
    languages: {
      type: [String],
      trim: true,
      // required: true,
    },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married without kids', 'Married with kids'],
    //   required: true,
    },
    message: {
      type: String,
      trim: true,
      // required: true,
    },
    phone: {
      type: String,
      trim: true,
      // required: true,
    },
    profession: {
      type: String,
      trim: true,
      // required: true,
    },
    role: {
      type: String,
      enum: ['candidate', 'client', 'admin', 'manager'],
      default: 'candidate',
    },
    vehicleBrand: {
      type: String,
      trim: true,
      // required: true,
    },
    vehicleOwnership: {
      type: String,
      enum: ['None', '2-Wheeler', '4-Wheeler', 'Both'],
      // required: true,
    },
    vehiclePurchaseYear: {
      type: Number,
    //   required: true,
    },
    website: {
      type: String,
      trim: true,
      // required: true,
    },
    workTimings: {
      type: String,
      trim: true,
      // required: true,
    },
    appliedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    country: {
      type: String,
      trim: true,
      default: '',
    },
    candidateLocation: {
      type: String,
      trim: true,
      // required: true,
    },
    preferredCategories: {
      type: [String],
      // required: true,
    },
    preferredDomains: {
      type: [String],
      // required: true,
    },
    alternativePhone: {
      type: String,
      trim: true,
      // required: true,
    },
    alternativeEmail: {
      type: String,
      trim: true,
      // required: true,
    },
    whatsappAvailable: {
      type: Boolean,
      // required: true,
    },
    workAvailability: {
      type: WorkAvailabilitySchema,
      // required: true,
    },
    educationHistory: {
      type: [EducationSchema],
      // required: true,
    },
    workHistory: {
      type: [ExperienceSchema],
      // required: true,
    },
    ipAddress: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    region: {
      type: String,
      trim: true,
      default: '',
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    termsAgreed: {
      type: Boolean,
      required: true,
    },
    newsletterOptIn: {
      type: Boolean,
      
    },
    profileCompletion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    profilePicture: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema: Model<any> = mongoose.models.User || mongoose.model('User', userSchema);
export default UserSchema;