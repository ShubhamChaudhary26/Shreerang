import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/schema/project';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const {
      title,
      description,
      category,
      status,
      startDate,
      preferredAge,
      preferredGender,
      preferredEducation,
      preferredOccupation,
      preferredLanguages,
      preferredLocation,
      preferredCountry,
      youtubeLink,
    } = data;

    // // Validate reCAPTCHA token
    // if (!recaptchaToken) {
    //   return NextResponse.json({ message: 'reCAPTCHA token is missing' }, { status: 400 });
    // }

    // const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     secret: process.env.RECAPTCHA_SECRET_KEY as string,
    //     response: recaptchaToken,
    //   }).toString(),
    // });

    // const recaptchaData = await recaptchaResponse.json();
    // console.log('reCAPTCHA response:', recaptchaData);
    // if (!recaptchaData.success || recaptchaData.score < 0.5) {
    //   return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
    // }

    // Validate required fields
    if (!title || !description || !category || !status) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const projectData = {
      title,
      description,
      category,
      status,
      startDate: startDate ? new Date(startDate) : undefined,
      applicants: [],
      preferredAge: preferredAge ? Number(preferredAge) : undefined,
      preferredGender,
      preferredEducation: preferredEducation || undefined,
      preferredOccupation: preferredOccupation || undefined,
      preferredLanguages: preferredLanguages && preferredLanguages.length > 0 ? preferredLanguages : undefined,
      preferredLocation: preferredLocation || undefined,
      preferredCountry: preferredCountry || undefined,
      youtubeLink: youtubeLink || undefined,
    };

    const project = new Project(projectData);
    await project.save();
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ message: 'Error creating project', error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const projects = await Project.find({});
    return NextResponse.json(projects);
  } catch (error: any) {
    // console.error('Error fetching projects:', error);
    return NextResponse.json({ message: 'Error fetching projects' }, { status: 500 });
  }
}