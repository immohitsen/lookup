import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import { User } from '@/lib/models/User';
import { Link } from '@/lib/models/Link';
import { Subscriber } from '@/lib/models/Subscriber';
import { ShortLink } from '@/lib/models/ShortLink';
import { Event } from '@/lib/models/Event';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const user = await User.findById(session.user.id).lean();
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const rawSocial = user.socialLinks;
  const socialLinks =
    rawSocial instanceof Map
      ? Object.fromEntries(rawSocial)
      : typeof rawSocial === 'object' && rawSocial !== null
      ? rawSocial
      : {};

  return NextResponse.json({
    ...user,
    socialLinks,
  });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const allowed = [
    'name',
    'bio',
    'avatarUrl',
    'themeId',
    'fontId',
    'bgType',
    'socialLinks',
    'customColors',
    'socialPosition',
    'seoTitle',
    'seoDescription',
  ];
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) update[key] = body[key];
  }

  // Deep merge customColors so partial updates don't wipe out other appearance settings
  if (body.customColors && typeof body.customColors === 'object') {
    const existing = await User.findById(session.user.id).select('customColors').lean();
    update.customColors = {
      ...(existing?.customColors ?? {}),
      ...body.customColors,
    };
  }

  const user = await User.findByIdAndUpdate(session.user.id, update, { new: true }).lean();
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const rawSocial = user.socialLinks;
  const socialLinks =
    rawSocial instanceof Map
      ? Object.fromEntries(rawSocial)
      : typeof rawSocial === 'object' && rawSocial !== null
      ? rawSocial
      : {};

  return NextResponse.json({
    ...user,
    socialLinks,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const { username, name, bio, avatarUrl, themeId } = body;

  if (!username || username.length < 3)
    return NextResponse.json({ error: 'Username too short' }, { status: 400 });

  const existing = await User.findOne({ username: username.toLowerCase() });
  if (existing && String(existing._id) !== session.user.id)
    return NextResponse.json({ error: 'Username taken' }, { status: 409 });

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { username: username.toLowerCase(), name, bio, avatarUrl, themeId },
    { new: true, upsert: false }
  );
  return NextResponse.json(user);
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const userId = new mongoose.Types.ObjectId(session.user.id);
  await Promise.all([
    User.findByIdAndDelete(userId),
    Link.deleteMany({ userId }),
    Subscriber.deleteMany({ userId }),
    ShortLink.deleteMany({ userId }),
    Event.deleteMany({ userId }),
  ]);
  return NextResponse.json({ ok: true });
}
