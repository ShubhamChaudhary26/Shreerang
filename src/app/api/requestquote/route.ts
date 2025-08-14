import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/schema/user.schema';
import nodemailer from 'nodemailer';

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

// POST: Create or update user and send email
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { fullName, companyName, email, phone, industry, message, termsAgreed, newsletterOptIn, role, recaptchaToken } = body;

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

    // Validate termsAgreed
    if (typeof termsAgreed !== 'boolean' || !termsAgreed) {
      return NextResponse.json({ error: 'You must agree to the terms and confirm you’ve read the privacy notice' }, { status: 400 });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    // Minimal default values
    const defaultValues = {
      alternativePhone: phone || 'Not specified',
      alternativeEmail: email,
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
        ...defaultValues,
      });
    }

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EmailUser,
        pass: process.env.EmailPassword,
      },
    });

    const mailOptions = {
      from: `"Shreerang Associate Form" <${process.env.EmailUser}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${fullName || 'Unknown User'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${fullName || 'Not provided'}</p>
        <p><strong>Company Name:</strong> ${companyName || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Industry:</strong> ${industry || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
        <p><strong>Terms Agreed:</strong> ${termsAgreed ? 'Yes' : 'No'}</p>
        <p><strong>Newsletter Opt-In:</strong> ${newsletterOptIn ? 'Yes' : 'No'}</p>
        <p><strong>Role:</strong> ${role || 'Not specified'}</p>
      `,
    };

    // Send email to ADMIN_EMAIL
    await transporter.sendMail(mailOptions);

    // If phone starts with +91, +880, +94, +977, also send to managerIND
    if (phone && (phone.startsWith('+91') || phone.startsWith('+880') || phone.startsWith('+94') || phone.startsWith('+977')) && process.env.managerIND) {
      await transporter.sendMail({
        ...mailOptions,
        to: process.env.managerIND,
      });
    }

    return NextResponse.json({ message: 'User saved and email sent successfully', user }, { status: 200 });
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