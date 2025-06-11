import { NextResponse } from "next/server";
import { Model } from "mongoose";
import connectDB from "@/lib/db";
import OTP, { IOTP } from "@/schema/otp.schema";
import User from "@/schema/user.schema";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { email, otp, termsAgreed, newsletterOptIn } = await request.json();

    if (!email || !otp ) {
      return NextResponse.json({ message: "Email, OTP, and reCAPTCHA token are required." }, { status: 400 });
    }

    // // Verify reCAPTCHA
    // const recaptchaResponse = await fetch(
    //   `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    //   { method: "POST" }
    // );
    // const recaptchaData = await recaptchaResponse.json();
    // console.log("reCAPTCHA Data:", recaptchaData);

    // if (!recaptchaData.success) {
    //   console.error("reCAPTCHA verification failed:", recaptchaData);
    //   return NextResponse.json({ message: "reCAPTCHA verification failed. Please try again." }, { status: 400 });
    // }

    // if (recaptchaData.score < 0.5) {
    //   console.warn("reCAPTCHA score too low:", recaptchaData.score);
    //   return NextResponse.json({ message: "Suspicious activity detected. Please try again." }, { status: 400 });
    // }

    // Validate termsAgreed and newsletterOptIn
    if (typeof termsAgreed !== "boolean" || !termsAgreed) {
      return NextResponse.json(
        { message: "You must agree to the terms and confirm you’ve read the privacy notice" },
        { status: 400 }
      );
    }

    if (typeof newsletterOptIn !== "boolean" || !newsletterOptIn) {
      return NextResponse.json(
        { message: "You must opt-in to receive the weekly newsletter" },
        { status: 400 }
      );
    }

    // Cast OTP to its Model type
    const OtpModel = OTP as Model<IOTP>;

    // Find the OTP record
    const otpRecord: IOTP | null = await OtpModel.findOne({ email, otp });

    if (!otpRecord) {
      return NextResponse.json({ message: "Invalid OTP. Please request a new one." }, { status: 401 });
    }

    // Check OTP expiration
    if (otpRecord.expiresAt.getTime() < Date.now()) {
      await OtpModel.deleteOne({ email });
      return NextResponse.json({ message: "OTP expired. Please request a new one." }, { status: 401 });
    }

    // OTP is valid, update or create user
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user
      user = await User.findOneAndUpdate(
        { email },
        {
          termsAgreed,
          newsletterOptIn,
          isSubscribed: newsletterOptIn,
        },
        { new: true }
      );
    } else {
      // Create new user
      user = await User.create({
        email,
        role: "candidate",
        termsAgreed,
        newsletterOptIn,
        isSubscribed: newsletterOptIn,
      });
    }

    // Delete OTP record
    await OtpModel.deleteOne({ email });

    // Set session cookie
    cookies().set("session", JSON.stringify({ email }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      { message: "OTP verified successfully. You can now proceed to login!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred during OTP verification. Please try again later." },
      { status: 500 }
    );
  }
}