
import connectDB from '@/lib/db';
import Blog from '@/schema/blog';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // console.log(`GET /api/blogs/${params.id} called`);
    await connectDB();
    let blog;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(params.id);
    if (isObjectId) {
      blog = await Blog.findById(params.id);
    } else {
      blog = await Blog.findOne({ slug: params.id });
    }
    if (!blog) {
      // console.log(`Blog not found for param: ${params.id}`);
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    // console.log('Blog fetched:', blog);
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error: any) {
    // console.error('Error fetching blog:', error.message);
    return NextResponse.json({ message: 'Error fetching blog', error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`PUT /api/blogs/${params.id} called`);
    await connectDB();
    const body = await request.json();
    const { title, slug, category, content, status, publishedDate, featuredImage } = body;

    // Validate reCAPTCHA token
    // if (!recaptchaToken) {
    //   return NextResponse.json({ message: 'reCAPTCHA token is missing' }, { status: 400 });
    // }

    // const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     secret: process.env.RECAPTCHA_SECRET_KEY as string,
    //     // response: recaptchaToken,
    //   }).toString(),
    // });

    // const recaptchaData = await recaptchaResponse.json();
    // console.log('reCAPTCHA response:', recaptchaData);
    // if (!recaptchaData.success || recaptchaData.score < 0.5) {
    //   return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
    // }

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

    // Prepare update data
    const updateData = {
      title,
      slug,
      category: category || 'General',
      content,
      status: status || 'Draft',
      publishedDate: publishedDate ? new Date(publishedDate) : undefined,
      featuredImage: featuredImage || undefined,
    };

    // Update the blog by ID
    const updatedBlog = await Blog.findByIdAndUpdate(params.id, { $set: updateData }, { new: true, runValidators: true });

    if (!updatedBlog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // console.log('Blog updated:', updatedBlog);
    return NextResponse.json({ message: 'Blog updated', blog: updatedBlog }, { status: 200 });
  } catch (error: any) {
    // console.error('Error updating blog:', error.message);
    return NextResponse.json({ message: 'Error updating blog', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // console.log(`DELETE /api/blogs/${params.id} called`);
    await connectDB();
    const blog = await Blog.findByIdAndDelete(params.id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    // console.log('Blog deleted:', blog);
    return NextResponse.json({ message: 'Blog deleted' }, { status: 200 });
  } catch (error: any) {
    // console.error('Error deleting blog:', error.message);
    return NextResponse.json({ message: 'Error deleting blog', error: error.message }, { status: 500 });
  }
}	