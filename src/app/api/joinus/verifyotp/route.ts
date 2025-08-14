import { NextResponse } from "next/server";
import { Model } from "mongoose";
import connectDB from "@/lib/db";
import OTP, { IOTP } from "@/schema/otp.schema";
import User from "@/schema/user.schema";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = "7d";

// Email function
async function sendNotificationEmail({ fullName, email, phone }: { fullName: string; email: string; phone: string; }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EmailUser,
        pass: process.env.EmailPassword,
      },
    });

    await transporter.sendMail({
      from: `"New User Notification" <${process.env.EmailUser}>`,
      to: process.env.RECEIVE_EMAIL,
      subject: "New User Registered",
      html: `
        <h2>New User Details</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `,
    });

    console.log("Notification email sent!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const { email, otp, name, phone } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required." }, { status: 400 });
    }

    const OtpModel = OTP as Model<IOTP>;
    const otpRecord = await OtpModel.findOne({ email, otp });

    if (!otpRecord) {
      return NextResponse.json({ message: "Invalid OTP. Please request a new one." }, { status: 401 });
    }

    if (otpRecord.expiresAt.getTime() < Date.now()) {
      await OtpModel.deleteOne({ email });
      return NextResponse.json({ message: "OTP expired. Please request a new one." }, { status: 401 });
    }

    const isAdminEmail = email.toLowerCase() === (process.env.ADMIN_EMAIL?.toLowerCase() || "");

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ message: "Full name and phone number are required." }, { status: 400 });
    }

    let user = await User.findOne({ email });

    if (user) {
      user.fullName = name.trim();
      user.phone = phone.trim();
      user.termsAgreed = true;
      await user.save();
    } else {
      user = await User.create({
        email,
        fullName: name.trim(),
        phone: phone.trim(),
        termsAgreed: true,
      });
    }

    await OtpModel.deleteOne({ email });

    // Send notification email
    await sendNotificationEmail({ fullName: name.trim(), email, phone: phone.trim() });

    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: isAdminEmail },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const response = NextResponse.json(
      {
        message: "OTP verified successfully.",
        isAdmin: isAdminEmail,
        redirectTo: isAdminEmail ? "/admin" : "/",
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();

  try {
    // No `.lean()` here to avoid stale object issue in Vercel cold start
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ message: "Failed to fetch clients" }, { status: 500 });
  }
}
