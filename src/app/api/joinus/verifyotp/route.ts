import { NextResponse } from "next/server";
import { Model } from "mongoose";
import connectDB from "@/lib/db";
import OTP, { IOTP } from "@/schema/otp.schema";
import User from "@/schema/user.schema";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { email, otp, name, phone } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required." },
        { status: 400 }
      );
    }

    // OTP Model type cast
    const OtpModel = OTP as Model<IOTP>;

    // Find OTP record by email and otp
    const otpRecord: IOTP | null = await OtpModel.findOne({ email, otp });

    if (!otpRecord) {
      return NextResponse.json({ message: "Invalid OTP. Please request a new one." }, { status: 401 });
    }

    // Check OTP expiry
    if (otpRecord.expiresAt.getTime() < Date.now()) {
      await OtpModel.deleteOne({ email });
      return NextResponse.json({ message: "OTP expired. Please request a new one." }, { status: 401 });
    }

    // Check if email is admin
    const isAdminEmail = email.toLowerCase() === "sc3617378@gmail.com";

    // Find or create user (now always setting termsAgreed: true)
    let user = await User.findOne({ email });

    if (user) {
      user = await User.findOneAndUpdate(
        { email },
        {
          fullName: name || user.fullName,
          phone: phone || user.phone,
          termsAgreed: true,  // <-- force set to true here
        },
        { new: true }
      );
    } else {
      user = await User.create({
        email,
        fullName: name || "",
        phone: phone || "",
        termsAgreed: true,  // <-- force set to true here
      });
    }

    // Delete OTP record after successful verification
    await OtpModel.deleteOne({ email });

    // Return success response with redirect info
    return NextResponse.json(
      {
        message: "OTP verified successfully. You can now proceed!",
        isAdmin: isAdminEmail,
        redirectTo: isAdminEmail ? "/admin" : "/",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      {
        message:
          "An unexpected error occurred during OTP verification. Please try again later.",
      },
      { status: 500 }
    );
  }
}
