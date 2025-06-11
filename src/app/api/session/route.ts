// /app/api/session/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const email = cookies().get('session')?.value;
  return NextResponse.json({ email });
}