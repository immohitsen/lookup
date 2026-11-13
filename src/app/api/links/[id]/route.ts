import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import { Link } from '@/lib/models/Link';
import { normalizeUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface Ctx { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  if (body.url) body.url = normalizeUrl(body.url);
  const link = await Link.findOneAndUpdate({ _id: id, userId: session.user.id }, body, { new: true });
  if (!link) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (body.isPinned) {
    await Link.updateMany({ userId: session.user.id, _id: { $ne: link._id } }, { isPinned: false });
  }
  return NextResponse.json(link);
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await connectDB();
  await Link.findOneAndDelete({ _id: id, userId: session.user.id });
  return NextResponse.json({ ok: true });
}
