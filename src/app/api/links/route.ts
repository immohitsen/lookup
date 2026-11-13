import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import { Link } from '@/lib/models/Link';
import { User } from '@/lib/models/User';
import { normalizeUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const links = await Link.find({ userId: session.user.id }).sort({ isPinned: -1, order: 1 }).lean();
  return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const { type = 'link', title, url, icon, thumbnail, config, isPinned } = body;
  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

  const count = await Link.countDocuments({ userId: session.user.id });

  const link = await Link.create({
    userId: session.user.id,
    type,
    title,
    url: url ? normalizeUrl(url) : '',
    order: count,
    icon: icon ?? '',
    thumbnail: thumbnail ?? '',
    config: config ?? {},
    isPinned: isPinned ?? false,
  });

  // If pinned, unpin others
  if (isPinned) {
    await Link.updateMany({ userId: session.user.id, _id: { $ne: link._id } }, { isPinned: false });
  }

  return NextResponse.json(link, { status: 201 });
}
