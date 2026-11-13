import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Link } from '@/lib/models/Link';
import { Event } from '@/lib/models/Event';
import { detectSource, detectDevice } from '@/lib/utils';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { linkId, referrer, search } = body;
    if (!linkId) return NextResponse.json({ ok: false });

    await connectDB();
    const link = await Link.findById(linkId).lean();
    if (!link) return NextResponse.json({ ok: false });

    const params = new URLSearchParams(search ?? '');
    const source = detectSource(referrer ?? null, params);
    const ua = req.headers.get('user-agent') ?? '';
    const device = detectDevice(ua);

    await Promise.all([
      Event.create({ userId: link.userId, linkId: new mongoose.Types.ObjectId(linkId), type: 'link_click', source, device }),
      Link.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
