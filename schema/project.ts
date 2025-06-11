import mongoose, { Schema, Document, Model } from 'mongoose';

interface IProject extends Document {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: 'Published' | 'Draft';
  startDate?: Date;
  applicants: mongoose.Types.ObjectId[];
  preferredAge?: number;
  preferredGender?: 'Male' | 'Female' | 'Other';
  preferredEducation?: string;
  preferredOccupation?: string;
  preferredLanguages?: string[];
  preferredLocation?: string;
  preferredCountry?: string;
  youtubeLink?: string;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['Published', 'Draft'], required: true },
  startDate: { type: Date, required: false },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  preferredAge: { type: Number, required: false },
  preferredGender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
  preferredEducation: { type: String, required: false },
  preferredOccupation: { type: String, required: false },
  preferredLanguages: [{ type: String }],
  preferredLocation: { type: String, required: false },
  preferredCountry: { type: String, required: false },
  youtubeLink: { type: String, required: false },
  
},
{ timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);
export default Project;