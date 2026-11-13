import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { User } from '@/lib/models/User';
import { Event } from '@/lib/models/Event';
import { detectSource, detectDevice } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, sessionId, referrer, search } = body;
    if (!username || !sessionId) return NextResponse.json({ ok: false });

    await connectDB();
    const user = await User.findOne({ username: username.toLowerCase() }).lean();
    if (!user) return NextResponse.json({ ok: false });

    // Dedup: one view per session per user
    const exists = await Event.exists({ userId: user._id, type: 'page_view', sessionId });
    if (exists) return NextResponse.json({ ok: true, deduped: true });

    const params = new URLSearchParams(search ?? '');
    const source = detectSource(referrer ?? null, params);
    const ua = req.headers.get('user-agent') ?? '';
    const device = detectDevice(ua);
    const country =
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-country-code') ||
      'US';

    await Event.create({ userId: user._id, type: 'page_view', source, sessionId, device, country });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
