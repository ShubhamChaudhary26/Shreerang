export const dynamic = 'force-dynamic';

import '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/schema/user.schema';
import { cookies } from 'next/headers';

export const GET = async (req: NextRequest) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('session');
    if (!session) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    let sessionData;
    try {
      sessionData = JSON.parse(session.value);
    } catch (error: any) {
      return NextResponse.json({ error: 'Invalid session data' }, { status: 400 });
    }

    // if (!sessionData.role || sessionData.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    // }

    const candidates = await User.find({});
    if (!candidates || candidates.length === 0) {
      return NextResponse.json({ message: 'No candidates found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Candidates retrieved successfully', candidates: candidates },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in GET /api/user/all-candidates:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};