import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validate as validateEmailFull } from 'email-validator';
import { Model } from 'mongoose';
import connectDB from '@/lib/db';
import OTP, { IOTP } from '@/schema/otp.schema';

// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EmailUser,
    pass: process.env.EmailPassword,
  },
});

export async function POST(request: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }


    // Server-side email format validation
    if (!validateEmailFull(email)) {
      return NextResponse.json({ message: 'Please provide a valid email address format.' }, { status: 400 });
    }


    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Calculate OTP expiry time (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Cast OTP to its Model type to help TypeScript
    const OtpModel = OTP as Model<IOTP>;

    const updateData: Partial<IOTP> = {
      otp: otp,
      expiresAt: expiresAt,
      createdAt: new Date(),
    };

    await OtpModel.findOneAndUpdate(
      { email: email },
      updateData,
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // Prepare email options
    const mailOptions = {
      from: process.env.EmailUser,
      to: email,
      subject: 'Your OTP Code for Login',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Hello from MintSurvey!</h2>
          <p>Your OTP code for login is: <strong>${otp}</strong></p>
          <p>This OTP will expire in 5 minutes.</p>
          <p>Please use this code to complete your login.</p>
          <p>Thank you,</p>
          <p>MintSurvey Team</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);

    return NextResponse.json({ message: 'OTP sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending OTP:', error);
    if ((error as any).code === 11000) {
      return NextResponse.json({ message: 'An OTP has already been sent to this email. Please check your inbox or wait 5 minutes.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred while sending OTP. Please try again later.' }, { status: 500 });
  }
}