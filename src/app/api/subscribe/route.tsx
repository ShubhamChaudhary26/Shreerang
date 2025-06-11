import '@/lib/db'
import mongoose from 'mongoose';
import User from '@/schema/user.schema';
import connectDB from '@/lib/db';

type SubscribeResponse = {
  message: string;
};

export async function POST(req: Request) {
  try {
    const { email, industry, newsletterOptIn, termsAgreed } = await req.json();

    if (!req.method || req.method !== 'POST') {
      return new Response(JSON.stringify({ message: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email
    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return new Response(JSON.stringify({ message: 'Please provide a valid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate industry
    if (!industry || typeof industry !== 'string' || industry.trim() === '') {
      return new Response(JSON.stringify({ message: 'Please provide a valid industry' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate newsletter opt-in
    if (typeof newsletterOptIn !== 'boolean' || !newsletterOptIn) {
      return new Response(JSON.stringify({ message: 'You must opt-in to receive the weekly newsletter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate terms agreement
    if (typeof termsAgreed !== 'boolean' || !termsAgreed) {
      return new Response(JSON.stringify({ message: 'You must agree to the terms and confirm you’ve read the privacy notice' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate reCAPTCHA token
    // if (!recaptchaToken) {
    //   return new Response(JSON.stringify({ message: 'reCAPTCHA token is missing' }), {
    //     status: 400,
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // }

    // Verify reCAPTCHA with Google's API using fetch
    // const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: new URLSearchParams({
    //     secret: process.env.RECAPTCHA_SECRET_KEY as string,
    //     response: recaptchaToken,
    //   }).toString(),
    // });

    // const recaptchaData = await recaptchaResponse.json();

    // if (!recaptchaData.success || recaptchaData.score < 0.5) {
    //   // Adjust score threshold as needed (0.5 is a common default)
    //   return new Response(JSON.stringify({ message: 'reCAPTCHA verification failed' }), {
    //     status: 400,
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // }

    // Connect to MongoDB
    // await connectDB();

    // Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      existingUser.isSubscribed = true;
      existingUser.industry = industry.trim();
      existingUser.newsletterOptIn = newsletterOptIn;
      existingUser.termsAgreed = termsAgreed;
      await existingUser.save();
      return new Response(JSON.stringify({ message: 'Successfully subscribed!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      isSubscribed: true,
      industry: industry.trim(),
      newsletterOptIn,
      termsAgreed,
    });

    await newUser.save();
    return new Response(JSON.stringify({ message: 'Successfully subscribed!' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in subscription:', error);
    return new Response(JSON.stringify({ message: 'Server error, please try again later' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}