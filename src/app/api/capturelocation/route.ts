import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/schema/user.schema';

export const POST = async (req: NextRequest) => {
  console.log('Received request to /api/capturelocation at:', new Date().toISOString());

  try {
    // Get IP address
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               req.headers.get('cf-connecting-ip') ||
               req.headers.get('x-real-ip') ||
               req.ip || '127.0.0.1';
    console.log('Detected IP:', ip);

    // Fetch location from ipgeolocation.io
    let geoData;
    try {
      console.log('Fetching location for IP:', ip);
      const apiKey = process.env.IPGEOLOCATION_API_KEY;
      if (!apiKey) {
        console.log('IPGEOLOCATION_API_KEY not set');
        throw new Error('IPGEOLOCATION_API_KEY not set');
      }
      const geoResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`);
      console.log('Geo API Status:', geoResponse.status);
      if (!geoResponse.ok) {
        console.log('Geo API Response:', await geoResponse.text());
        throw new Error('Failed to fetch location data');
      }
      geoData = await geoResponse.json();
      console.log('Geo Data:', geoData);
    } catch (error) {
      console.log('Error fetching geo data from ipgeolocation.io:', error);
      // Fallback to ipapi.co
      try {
        console.log('Attempting fallback with ipapi.co for IP:', ip);
        const fallbackResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        console.log('Fallback Geo API Status:', fallbackResponse.status);
        if (!fallbackResponse.ok) {
          console.log('Fallback Geo API Response:', await fallbackResponse.text());
          throw new Error('Fallback API failed');
        }
        const fallbackData = await fallbackResponse.json();
        geoData = {
          city: fallbackData.city,
          region: fallbackData.region,
          country_name: fallbackData.country_name,
          latitude: fallbackData.latitude,
          longitude: fallbackData.longitude,
        };
        console.log('Using fallback Geo Data:', geoData);
      } catch (fallbackError) {
        console.log('Fallback API also failed:', fallbackError);
        return NextResponse.json({ error: 'Unable to fetch location data' }, { status: 400 });
      }
    }

    // Validate geoData
    if (!geoData.city || !geoData.region || !geoData.country_name) {
      console.log('Incomplete Geo Data:', geoData);
      return NextResponse.json({ error: 'Incomplete location data' }, { status: 400 });
    }

    const locationData = {
      ipAddress: ip,
      city: geoData.city,
      region: geoData.region,
      country: geoData.country_name,
      latitude: geoData.latitude ? parseFloat(geoData.latitude) : null,
      longitude: geoData.longitude ? parseFloat(geoData.longitude) : null,
      candidateLocation: `${geoData.city}, ${geoData.region}, ${geoData.country_name}`,
    };
    console.log('Location Data Prepared:', locationData);

    // Get user email
    let email;
    try {
      const body = await req.json();
      email = body.email;
    } catch (error) {
      console.log('Error parsing request body:', error);
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    console.log('Received Email:', email);
    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      console.log('Invalid or missing email');
      return NextResponse.json({ error: 'Invalid or missing email' }, { status: 400 });
    }

    // Check MongoDB connection
    console.log('MongoDB Connection State:', mongoose.connection.readyState);
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected');
      return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }

    // Check if user exists
    const user = await User.findOne({ email, isDeleted: false });
    console.log('Found User:', user ? user.email : 'null');
    if (!user) {
      console.log('User not found for email:', email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user in database
    console.log('Updating user with email:', email);
    const updatedUser = await User.findOneAndUpdate(
      { email, isDeleted: false },
      { $set: locationData },
      { new: true }
    );

    console.log('Updated User:', updatedUser);
    if (!updatedUser) {
      console.log('Update failed for email:', email);
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Location captured and updated', location: locationData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/capturelocation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};