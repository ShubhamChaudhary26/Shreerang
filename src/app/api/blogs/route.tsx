
import { NextResponse } from 'next/server';
import Blog from '@/schema/blog';
import connectDB from '@/lib/db';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const { title, slug, category, content, status, featuredImage } = data;

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

    const blog = new Blog({
      title: title || 'Default Title',
      slug: slug || 'default-slug-' + Date.now(),
      category: category || 'General',
      content: content || 'Default Content',
      status: status || 'Draft',
      featuredImage: featuredImage || undefined,
    });

    await blog.save();
    // console.log('Blog saved:', blog);
    return NextResponse.json({ message: 'Blog created', blog }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error.message);
    return NextResponse.json({ message: 'Error creating blog', error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // console.log('GET /api/blogs called');
    await connectDB();
    const blogs = await Blog.find();
    // console.log('Fetched blogs:', blogs);
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    // console.error('Error fetching blogs:', error.message);
    return NextResponse.json({ message: 'Error fetching blogs', error: error.message }, { status: 500 });
  }
}

