import { NextResponse } from 'next/server';
import Project from '@/schema/project';
import User from '@/schema/user.schema';
import connectDB from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { projectId } = await request.json();

    // Get user email from session cookie
    const cookieStore = cookies();
    const session = cookieStore.get('session');
    if (!session) {
      return NextResponse.json({ message: 'No session found' }, { status: 401 });
    }

    let email;
    try {
      const sessionData = JSON.parse(session.value);
      email = sessionData.email;
    } catch (error) {
      return NextResponse.json({ message: 'Invalid session data' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ message: 'Email not found in session' }, { status: 400 });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Find project
    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Check if user already applied
    if (project.applicants.includes(user._id)) {
      return NextResponse.json({ message: 'You have already applied to this project' }, { status: 400 });
    }

    // Update project with user as applicant
    project.applicants.push(user._id);
    await project.save();

    // Update user with applied project
    user.appliedProjects.push(project._id);
    await user.save();

    return NextResponse.json({ message: 'Applied to project successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error applying to project:', error);
    return NextResponse.json({ message: 'Error applying to project', error: error.message }, { status: 500 });
  }
}