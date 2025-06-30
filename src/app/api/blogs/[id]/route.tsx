import connectDB from '@/lib/db';
import Blog from '@/schema/blog';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdirSync } from 'fs';

// Ensure the uploads directory exists
const uploadDir = join(process.cwd(), 'public', 'uploads');
try {
  mkdirSync(uploadDir, { recursive: true });
} catch (error) {
  console.error('Error creating uploads directory:', error);
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    let blog;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(params.id);
    if (isObjectId) {
      blog = await Blog.findById(params.id);
    } else {
      blog = await Blog.findOne({ slug: params.id });
    }
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching blog', error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log(`PUT /api/blogs/${params.id} called`);
    await connectDB();

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;
    const status = formData.get('status') as string;
    const file = formData.get('featuredImage') as File;
    const existingImageUrl = formData.get('featuredImageUrl') as string;

    // Validate required fields based on your schema
    if (!title || !title.trim()) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }
    if (title.length > 100) {
      return NextResponse.json({ message: 'Title cannot exceed 80 characters' }, { status: 400 });
    }
    if (!slug || !slug.trim()) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }
    if (!content || !content.trim()) {
      return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }

    // Handle the image
    let featuredImage = existingImageUrl || '';
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`; // Sanitize filename
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      featuredImage = `/uploads/${filename}`; // e.g., /uploads/123456-image.jpg
    }

    // Prepare update data
    const updateData = {
      title,
      slug,
      category: category || 'General',
      content,
      status: status || 'Draft',
      publishedDate: new Date(), // Update publishedDate if needed
      featuredImage: featuredImage || undefined,
    };

    // Update the blog by ID
    const updatedBlog = await Blog.findByIdAndUpdate(params.id, { $set: updateData }, { new: true, runValidators: true });

    if (!updatedBlog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog updated', blog: updatedBlog }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating blog', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const blog = await Blog.findByIdAndDelete(params.id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Blog deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error deleting blog', error: error.message }, { status: 500 });
  }
}