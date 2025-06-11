import connectDB from '@/lib/db';
import Project from '@/schema/project';
// user schema name changed
import User from '@/schema/user.schema';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`PUT /api/projects/${params.id} called`);
    await connectDB();
    console.log('Database connection attempted for PUT');

    const data = await request.json();
    console.log('Request body:', data);

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
      recaptchaToken,
    } = data;

    // Validate reCAPTCHA token
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
      return NextResponse.json({ message: 'Title, description, category, and status are required' }, { status: 400 });
    }
    if (title.length > 50) {
      return NextResponse.json({ message: 'Title cannot exceed 50 characters' }, { status: 400 });
    }

    const validGenders = ['Male', 'Female', 'Other'];
    if (preferredGender && !validGenders.includes(preferredGender)) {
      return NextResponse.json({ message: 'Invalid preferredGender value' }, { status: 400 });
    }

    const validStatuses = ['Published', 'Draft'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: 'Invalid status value' }, { status: 400 });
    }

    const updateData = {
      title,
      description,
      category,
      status,
      startDate: startDate ? new Date(startDate) : undefined,
      preferredAge: preferredAge ? Number(preferredAge) : undefined,
      preferredGender,
      preferredEducation: preferredEducation !== undefined ? preferredEducation : undefined,
      preferredOccupation: preferredOccupation !== undefined ? preferredOccupation : undefined,
      preferredLanguages: Array.isArray(preferredLanguages) ? preferredLanguages : [],
      preferredLocation: preferredLocation !== undefined ? preferredLocation : undefined,
      preferredCountry: preferredCountry !== undefined ? preferredCountry : undefined,
      youtubeLink: youtubeLink !== undefined ? youtubeLink : undefined,
    };

    const updatedProject = await Project.findByIdAndUpdate(
      params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      // console.log(`Project not found for ID: ${params.id}`);
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // console.log('Project updated:', updatedProject);
    return NextResponse.json({ message: 'Project updated', project: updatedProject }, { status: 200 });
  } catch (error: any) {
    // console.error('Error updating project:', error.message, 'Stack:', error.stack);
    return NextResponse.json({ message: 'Error updating project', error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // console.log(`GET /api/projects/${params.id} called at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      // console.log(`Invalid project ID: ${params.id}`);
      return NextResponse.json({ message: 'Invalid project ID' }, { status: 400 });
    }
    await connectDB();
    // console.log('Database connection attempted for GET');
    const project = await Project.findById(params.id);
    if (!project) {
      // console.log(`Project not found for ID: ${params.id}`);
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    // console.log('Project found:', project);
    // console.log('Applicants before processing:', project.applicants);

    // Fetch applicant details
    const applicants = await User.find({ _id: { $in: project.applicants } }).select(
      'fullName email candidateLocation educationHistory workHistory'
    );
    // console.log('Fetched applicants:', applicants);

    // Attach applicants to project
    project.applicants = applicants as any;
    // console.log('Project with applicants:', project);

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: any) {
    // console.error('Error fetching project:', error.message, 'Stack:', error.stack);
    return NextResponse.json({ message: 'Error fetching project', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // console.log(`DELETE /api/projects/${params.id} called`);
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      // console.log(`Invalid project ID: ${params.id}`);
      return NextResponse.json({ message: 'Invalid project ID' }, { status: 400 });
    }
    await connectDB();
    // console.log('Database connection attempted for DELETE');
    const project = await Project.findByIdAndDelete(params.id);
    if (!project) {
      // console.log(`Project not found for ID: ${params.id}`);
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    // console.log('Project deleted:', project);
    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  } catch (error: any) {
    // console.error('Error deleting project:', error.message, 'Stack:', error.stack);
    return NextResponse.json({ message: 'Error deleting project', error: error.message }, { status: 500 });
  }
}