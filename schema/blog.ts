import mongoose, { Schema, Document, Model } from 'mongoose';

export type BlogStatus = 'Draft' | 'Published' | 'Archived';

export interface BlogFormData {
  title: string;
  slug: string;
  category: string;
  content: string;
  status: BlogStatus;
  featuredImage?: string; // Ensure featuredImage is included
}

interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  content: string;
  status: 'Draft' | 'Published' ;
  publishedDate: Date;
  featuredImage?: string;
}

// Explicitly type the Blog model
interface BlogModel extends Model<IBlog> {}

// Define the schema
const BlogSchema: Schema<IBlog> = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  slug: { type: String, required: true, unique: true },
  category: { type: String, default: 'General' },
  content: { type: String, required: true },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  publishedDate: { type: Date, default: Date.now },
  featuredImage: { type: String },
});

// Export the model with explicit type
const Blog: BlogModel = mongoose.models.Blog || mongoose.model<IBlog, BlogModel>('Blog', BlogSchema);
export default Blog;