import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { User } from '@/lib/models/User';

const RESERVED = ['app', 'api', 'admin', 'login', 'signup', 'onboarding', 'settings', 'dashboard', 'home', 'demo', 's', 'lookup'];

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')?.toLowerCase().trim();
  if (!username || username.length < 3) return NextResponse.json({ available: false, reason: 'Too short' });
  if (!/^[a-z0-9_]+$/.test(username)) return NextResponse.json({ available: false, reason: 'Invalid characters' });
  if (RESERVED.includes(username)) return NextResponse.json({ available: false, reason: 'Reserved' });
  await connectDB();
  const exists = await User.exists({ username });
  return NextResponse.json({ available: !exists });
}
