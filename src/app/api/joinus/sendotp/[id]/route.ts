import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validate as validateEmailFull } from 'email-validator';
import { Model } from 'mongoose';
import connectDB from '@/lib/db';
import OTP, { IOTP } from '@/schema/otp.schema';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EmailUser,
    pass: process.env.EmailPassword,
  },
  tls: { rejectUnauthorized: false }, // add this
});



export async function POST(request: Request) {
  await connectDB();

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    if (!validateEmailFull(email)) {
      return NextResponse.json({ message: 'Please provide a valid email address format.' }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const OtpModel = OTP as Model<IOTP>;

    await OtpModel.findOneAndUpdate(
      { email },
      {
        otp,
        expiresAt,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    const mailOptions = {
  from: process.env.EmailUser,
  to: email,
  subject: 'Your OTP Code for Login - Shreerang Associate',
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Hello from Shreerang Associate!</h2>
      <p>Your OTP code to access the Rent Agreement service is: <strong>${otp}</strong></p>
      <p>This OTP will expire in 5 minutes.</p>
      <p>Please enter this code to proceed with your rent agreement.</p>
      <p>Thank you,</p>
      <p>Shreerang Associate Team</p>
    </div>
  `,
};


    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);

    return NextResponse.json({ message: 'OTP sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending OTP:', error);
    if ((error as any).code === 11000) {
      return NextResponse.json(
        { message: 'An OTP has already been sent to this email. Please check your inbox or wait 5 minutes.' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'An unexpected error occurred while sending OTP. Please try again later.' },
      { status: 500 }
    );
  }
}
