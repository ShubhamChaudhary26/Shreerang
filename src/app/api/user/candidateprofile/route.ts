import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // Fixed import
import User from '@/schema/user.schema';
import { cookies } from 'next/headers';

// Helper function to validate required fields
const validateRequiredFields = (body: any, isUpdate: boolean = false) => {
  const errors: string[] = [];

  const requiredFields = [
    'age',
    'email',
    'employmentStatus',
    'gender',
    'maritalStatus',
    'termsAgreed',
    'newsletterOptIn',
    'fullName',
    'candidateLocation',
    'preferredCategories',
  ];

  requiredFields.forEach((field) => {
    if (!isUpdate && (body[field] === undefined || body[field] === '')) {
      errors.push(`${field} is required to fill`);
    } else if (isUpdate && body[field] !== undefined && body[field] === '') {
      errors.push(`${field} is required to fill`);
    }
  });

  if (body.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)) {
    errors.push('Please fill a valid email address');
  }

  if (body.educationHistory && Array.isArray(body.educationHistory)) {
    body.educationHistory.forEach((edu: any, index: number) => {
      if (edu.id === undefined || edu.id === null) {
        errors.push(`Education entry ${index + 1}: id is required to fill`);
      }
    });
  }

  if (body.workHistory && Array.isArray(body.workHistory)) {
    body.workHistory.forEach((exp: any, index: number) => {
      if (exp.id === undefined || exp.id === null) {
        errors.push(`Experience entry ${index + 1}: id is required to fill`);
      }
    });
  }

  if (body.workAvailability) {
    if (body.workAvailability.hours === undefined || body.workAvailability.hours === null) {
      errors.push('Work availability: hours is required to fill');
    }
  }

  if (body.profilePicture) {
    if (!body.profilePicture.startsWith('data:image/jpeg;base64,')) {
      errors.push('Profile picture must be a valid JPEG base64 string');
    } else {
      const base64Data = body.profilePicture.replace(/^data:image\/jpeg;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      if (buffer.length > 2 * 1024 * 1024) {
        errors.push('Profile picture size must be less than 2MB');
      }
    }
  }

  return errors;
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB(); // Connect to MongoDB

    const body = await req.json();

    const errors = validateRequiredFields(body);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists. No action taken.' },
        { status: 409 }
      );
    }

    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in POST /api/user/candidateprofile:', error.message);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await connectDB(); // Connect to MongoDB

    const cookieStore = cookies();
    const session = cookieStore.get('session');
    if (!session) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    let email;
    try {
      const sessionData = JSON.parse(session.value);
      email = sessionData.email;
    } catch (error: any) {
      return NextResponse.json({ error: 'Invalid session data' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email not found in session' }, { status: 400 });
    }

    const body = await req.json();
    const { recaptchaToken, ...updateData } = body;

    // if (!recaptchaToken) {
    //   return NextResponse.json({ error: 'reCAPTCHA token is required' }, { status: 400 });
    // }

    // // Verify reCAPTCHA
    // const recaptchaResponse = await fetch(
    //   `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    //   { method: 'POST' }
    // );
    // const recaptchaData = await recaptchaResponse.json();

    // if (!recaptchaData.success) {
    //   console.error('reCAPTCHA verification failed:', recaptchaData);
    //   return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 });
    // }

    // if (recaptchaData.score < 0.5) {
    //   console.warn('reCAPTCHA score too low:', recaptchaData.score);
    //   return NextResponse.json({ error: 'Suspicious activity detected. Please try again.' }, { status: 400 });
    // }

    const errors = validateRequiredFields(updateData, true);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User updated successfully', user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in PUT /api/user/candidateprofile:', error.message);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectDB(); // Connect to MongoDB

    const cookieStore = cookies();
    const session = cookieStore.get('session');
    if (!session) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    let email;
    try {
      const sessionData = JSON.parse(session.value);
      email = sessionData.email;
    } catch (error: any) {
      return NextResponse.json({ error: 'Invalid session data' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email not found in session' }, { status: 400 });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User retrieved successfully', user: user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in GET /api/user/candidateprofile:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectDB(); // Connect to MongoDB

    const cookieStore = cookies();
    const session = cookieStore.get('session');
    if (!session) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    let email: any;
    try {
      const sessionData = JSON.parse(session.value);
      email = sessionData.email;
    } catch (error: any) {
      return NextResponse.json({ error: 'Invalid session data' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email not found in session' }, { status: 400 });
    }

    const deletedUser = await User.findOneAndDelete({ email: email });

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const response = NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
    response.cookies.set('session', '', { maxAge: 0 });

    return response;
  } catch (error: any) {
    console.error('Error in DELETE /api/user/candidateprofile:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};