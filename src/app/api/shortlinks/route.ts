import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import { ShortLink } from '@/lib/models/ShortLink';
import { normalizeUrl, slugify } from '@/lib/utils';
import { nanoid } from 'nanoid';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const links = await ShortLink.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const { destination, slug: rawSlug } = body;
  if (!destination) return NextResponse.json({ error: 'Destination required' }, { status: 400 });

  const slug = rawSlug ? slugify(rawSlug) : nanoid(6).toLowerCase();
  const exists = await ShortLink.exists({ slug });
  if (exists) return NextResponse.json({ error: 'Slug already taken' }, { status: 409 });

  const link = await ShortLink.create({
    userId: session.user.id,
    slug,
    destination: normalizeUrl(destination),
  });
  return NextResponse.json(link, { status: 201 });
}
