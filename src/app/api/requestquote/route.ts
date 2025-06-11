
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/schema/user.schema';

// Function to check if email is a business email
const isBusinessEmail = (email: string): boolean => {
  const personalEmailDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
  ];
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? !personalEmailDomains.includes(domain) : false;
};

// POST: Create or update user
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { fullName, companyName, email, phone, industry, message, termsAgreed, newsletterOptIn, role } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: 'Business email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if email is a business email
    if (!isBusinessEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid business email (not Gmail, Yahoo, etc.)' }, { status: 400 });
    }

    // Validate termsAgreed and newsletterOptIn
    if (typeof termsAgreed !== 'boolean' || !termsAgreed) {
      return NextResponse.json({ error: 'You must agree to the terms and confirm you’ve read the privacy notice' }, { status: 400 });
    }

    if (typeof newsletterOptIn !== 'boolean' || !newsletterOptIn) {
      return NextResponse.json({ error: 'You must opt-in to receive the weekly newsletter' }, { status: 400 });
    }

    // Validate reCAPTCHA token
    // if (!recaptchaToken) {
    //   return NextResponse.json({ error: 'reCAPTCHA token is missing' }, { status: 400 });
    // }

    // Verify reCAPTCHA with Google API
    // const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     secret: process.env.RECAPTCHA_SECRET_KEY as string,
    //     response: recaptchaToken,
    //   }).toString(),
    // });

    // const recaptchaData = await recaptchaResponse.json();

    // // console.log('reCAPTCHA verification:', recaptchaData);
    // if (!recaptchaData.success || recaptchaData.score < 0.5) {
    //   return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    // }

    // Check if user exists
    let user = await User.findOne({ email });

    // Default values for required fields not provided in the form
    const defaultValues = {
      age: '18 - 22 Years', // Default value
      employmentStatus: 'Employed', // Default value
      experience: 'None', // Default value
      gender: 'Prefer not to say', // Default value
      jobTitle: 'Not specified', // Default value
      languages: ['English'], // Default value
      maritalStatus: 'Single', // Default value
      profession: 'Not specified', // Default value
      vehicleBrand: 'None', // Default value
      vehicleOwnership: 'None', // Default value
      vehiclePurchaseYear: 2020, // Default value
      website: 'Not specified', // Default value
      workTimings: 'Not specified', // Default value
      candidateLocation: 'Not specified', // Default value
      preferredCategories: [], // Default value
      preferredDomains: [], // Default value
      alternativePhone: phone || 'Not specified', // Use provided phone or default
      alternativeEmail: email, // Use provided email
      whatsappAvailable: false, // Default value
      workAvailability: { days: [], hours: 0 }, // Default value
      educationHistory: [], // Default value
      workHistory: [], // Default value
    };

    if (user) {
      // Update existing user
      user = await User.findOneAndUpdate(
        { email },
        {
          fullName: fullName || user.fullName,
          companyName: companyName || user.companyName,
          phone: phone || user.phone,
          industry: industry || user.industry,
          message: message || user.message,
          termsAgreed,
          newsletterOptIn,
          isSubscribed: newsletterOptIn,
          role: role || user.role,
        },
        { new: true }
      );
    } else {
      // Create new user
      user = await User.create({
        fullName,
        companyName,
        email,
        phone,
        industry,
        message,
        termsAgreed,
        newsletterOptIn,
        isSubscribed: newsletterOptIn,
        role: role || 'client',
        ...defaultValues, // Include default values for required fields
      });
    }

    return NextResponse.json({ message: 'User saved successfully', user }, { status: 200 });
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message || 'Unknown error' }, { status: 500 });
  }
}

// GET: Fetch all clients
export async function GET() {
  try {
    await connectDB();
    const clients = await User.find({ role: 'client', isDeleted: false }).select(
      'fullName companyName email phone industry message termsAgreed newsletterOptIn createdAt'
    );
    return NextResponse.json(clients, { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message || 'Unknown error' }, { status: 500 });
  }
}

// DELETE: Soft delete user by email
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();
    const user = await User.findOneAndUpdate({ email }, { isDeleted: true }, { new: true });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message || 'Unknown error' }, { status: 500 });
  }
}