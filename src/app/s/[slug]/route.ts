import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { ShortLink } from '@/lib/models/ShortLink';
import { normalizeUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface Ctx {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  if (!slug) return NextResponse.redirect(new URL('/', req.url));
  try {
    await connectDB();
    const link = await ShortLink.findOneAndUpdate(
      { slug: slug.toLowerCase() },
      { $inc: { clicks: 1 } },
      { new: true }
    ).lean();
    if (link?.destination) {
      const dest = normalizeUrl(link.destination);
      return NextResponse.redirect(new URL(dest));
    }
  } catch (err) {
    console.error('Shortlink redirect error:', err);
  }
  return NextResponse.redirect(new URL('/', req.url));
}

