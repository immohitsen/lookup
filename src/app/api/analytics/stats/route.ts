import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import { Event } from '@/lib/models/Event';
import { Link } from '@/lib/models/Link';
import { Subscriber } from '@/lib/models/Subscriber';
import { getDateRange } from '@/lib/utils';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const range = (req.nextUrl.searchParams.get('range') ?? '30d') as '7d' | '30d' | 'all';
  const since = getDateRange(range);
  await connectDB();

  const userId = new mongoose.Types.ObjectId(session.user.id);
  const dateFilter = since ? { createdAt: { $gte: since } } : {};

  const [views, clicks, subscribers, topLinks, sources, timelineRaw, countriesRaw, devicesRaw] =
    await Promise.all([
      Event.countDocuments({ userId, type: 'page_view', ...dateFilter }),
      Event.countDocuments({ userId, type: 'link_click', ...dateFilter }),
      Subscriber.countDocuments({ userId, ...dateFilter }),
      Link.find({ userId }).sort({ clicks: -1 }).limit(5).lean(),
      Event.aggregate([
        { $match: { userId, type: 'link_click', ...dateFilter } },
        { $group: { _id: '$source', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      // Daily timeline aggregation
      Event.aggregate([
        { $match: { userId, ...dateFilter } },
        {
          $group: {
            _id: {
              date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
              type: '$type',
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.date': 1 } },
      ]),
      // Top Countries (Linktree Pro)
      Event.aggregate([
        { $match: { userId, country: { $exists: true, $ne: '' }, ...dateFilter } },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
      // Devices (Mobile / Desktop / Tablet)
      Event.aggregate([
        { $match: { userId, ...dateFilter } },
        { $group: { _id: '$device', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

  // Transform timelineRaw into day-by-day continuous points
  const timelineMap: Record<string, { date: string; views: number; clicks: number }> = {};

  // Default points for the timeframe so the graph has a continuous baseline
  const daysCount = range === '7d' ? 7 : range === '30d' ? 30 : 14;
  const now = new Date();
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    timelineMap[dateStr] = { date: dateStr, views: 0, clicks: 0 };
  }

  timelineRaw.forEach((item: { _id: { date: string; type: string }; count: number }) => {
    const d = item._id.date;
    if (!timelineMap[d]) {
      timelineMap[d] = { date: d, views: 0, clicks: 0 };
    }
    if (item._id.type === 'page_view') {
      timelineMap[d].views += item.count;
    } else if (item._id.type === 'link_click') {
      timelineMap[d].clicks += item.count;
    }
  });

  const timeline = Object.values(timelineMap).sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({
    views,
    clicks,
    subscribers,
    clickRate: views > 0 ? Math.round((clicks / views) * 100) : 0,
    topLinks: topLinks.map(l => ({ id: String(l._id), title: l.title, clicks: l.clicks })),
    sources: sources.map(s => ({ source: s._id, count: s.count })),
    countries: countriesRaw.map(c => ({ country: c._id, count: c.count })),
    devices: devicesRaw.map(d => ({ device: d._id || 'mobile', count: d.count })),
    timeline,
  });
}
