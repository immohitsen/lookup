import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import { Subscriber } from '@/lib/models/Subscriber';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const subs = await Subscriber.find({ userId: new mongoose.Types.ObjectId(session.user.id) }).sort({ createdAt: -1 }).lean();

  const rows = ['Email,Source,Date', ...subs.map(s =>
    `${s.email},${s.source},${new Date(s.createdAt).toISOString().split('T')[0]}`
  )].join('\n');

  return new NextResponse(rows, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="subscribers.csv"',
    },
  });
}
