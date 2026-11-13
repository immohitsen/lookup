import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { ShortLink } from '@/lib/models/ShortLink';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')?.toLowerCase().trim();
  if (!slug) return NextResponse.json({ available: false });
  await connectDB();
  const exists = await ShortLink.exists({ slug });
  return NextResponse.json({ available: !exists });
}

