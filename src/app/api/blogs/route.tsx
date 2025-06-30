import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdirSync } from 'fs';
import Blog from '@/schema/blog';
import connectDB from '@/lib/db';

// Ensure the uploads directory exists
const uploadDir = join(process.cwd(), 'public', 'uploads');
try {
  mkdirSync(uploadDir, { recursive: true });
} catch (error) {
  console.error('Error creating uploads directory:', error);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;
    const status = formData.get('status') as string;
    const file = formData.get('featuredImage') as File;

    // Validate required fields
    if (!title || !title.trim()) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }
    if (!slug || !slug.trim()) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }
    if (!content || !content.trim()) {
      return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }

    let featuredImageUrl = '';
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`; // Sanitize filename
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      featuredImageUrl = `/uploads/${filename}`; // e.g., /uploads/123456-image.jpg
    }

    const blog = new Blog({
      title: title || 'Default Title',
      slug: slug || 'default-slug-' + Date.now(),
      category: category || 'General',
      content: content || 'Default Content',
      status: status || 'Draft',
      featuredImage: featuredImageUrl || undefined,
    });

    await blog.save();
    return NextResponse.json({ message: 'Blog created', blog }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error.message);
    return NextResponse.json({ message: 'Error creating blog', error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const blogs = await Blog.find();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching blogs', error: error.message }, { status: 500 });
  }
}