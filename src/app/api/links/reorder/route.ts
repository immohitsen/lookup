import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import { Link } from '@/lib/models/Link';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const { order }: { order: string[] } = await req.json();
  if (!Array.isArray(order)) return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  await Promise.all(order.map((id, index) =>
    Link.updateOne({ _id: id, userId: session.user.id }, { order: index })
  ));
  return NextResponse.json({ ok: true });
}
