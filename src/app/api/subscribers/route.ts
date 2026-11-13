import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import { Subscriber } from '@/lib/models/Subscriber';
import { User } from '@/lib/models/User';
import { isValidEmail } from '@/lib/utils';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

// Rate limiting (simple in-memory, good enough for MVP)
const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.reset < now) { rateMap.set(ip, { count: 1, reset: now + 60_000 }); return false; }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

// Public: subscribe
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(ip)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await req.json();
  const { email, userId, source } = body;

  // Honeypot check
  if (body.website) return NextResponse.json({ ok: true }); // silently reject bots

  if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

  await connectDB();
  try {
    await Subscriber.create({ userId: new mongoose.Types.ObjectId(userId), email, source: source ?? 'direct' });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    if ((e as { code?: number })?.code === 11000) return NextResponse.json({ error: 'Already subscribed!' }, { status: 409 });
    throw e;
  }
}

// Authenticated: list
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const userId = new mongoose.Types.ObjectId(session.user.id);
  const subs = await Subscriber.find({ userId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(subs);
}
