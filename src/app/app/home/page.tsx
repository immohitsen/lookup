'use client';
import { useEffect, useState } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { AnalyticsTrendChart } from '@/components/dashboard/AnalyticsTrendChart';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  EyeIcon,
  CursorPointer01Icon,
  ChartHistogramIcon,
  Mail01Icon,
  SparklesIcon,
} from '@hugeicons/core-free-icons';

type Range = '7d' | '30d' | 'all';

interface Stats {
  views: number;
  clicks: number;
  clickRate: number;
  subscribers: number;
  topLinks: { id: string; title: string; clicks: number }[];
  sources: { source: string; count: number }[];
  timeline?: { date: string; views: number; clicks: number }[];
}

const SOURCE_EMOJI: Record<string, string> = {
  instagram: '📸',
  tiktok: '🎵',
  youtube: '▶️',
  direct: '🔗',
  other: '🌐',
};

export default function HomeDashboard() {
  const [range, setRange] = useState<Range>('7d');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics/stats?range=${range}`)
      .then(r => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, [range]);

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden p-6 sm:p-8 w-full font-sans">
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* ── Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#540B0E]/10">
        <div>
          <h1 className="text-2xl font-black text-[#540B0E] tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-[#766050] mt-0.5">
            Real-time performance metrics and traffic insights for your bio page.
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#540B0E]/12 shadow-2xs self-start sm:self-auto">
          {(['7d', '30d', 'all'] as Range[]).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                range === r
                  ? 'bg-[#540B0E] text-[#FFF3B0] shadow-sm'
                  : 'text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE]'
              }`}
            >
              {r === 'all' ? 'All Time' : r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Page Views"
          value={loading ? '—' : (stats?.views ?? 0).toLocaleString()}
          icon={<HugeiconsIcon icon={EyeIcon} size={22} className="text-[#E09F3E]" />}
        />
        <StatCard
          label="Link Clicks"
          value={loading ? '—' : (stats?.clicks ?? 0).toLocaleString()}
          icon={<HugeiconsIcon icon={CursorPointer01Icon} size={22} className="text-[#335C67]" />}
        />
        <StatCard
          label="Click Rate"
          value={loading ? '—' : `${stats?.clickRate ?? 0}%`}
          icon={<HugeiconsIcon icon={ChartHistogramIcon} size={22} className="text-[#540B0E]" />}
        />
        <StatCard
          label="Subscribers"
          value={loading ? '—' : (stats?.subscribers ?? 0).toLocaleString()}
          icon={<HugeiconsIcon icon={Mail01Icon} size={22} className="text-[#9E2A2B]" />}
        />
      </div>

      {/* ── Visual Performance Timeline ── */}
      <AnalyticsTrendChart data={stats?.timeline ?? []} />

      {/* ── Quick Actions Hero Banner ── */}
      <div className="bg-gradient-to-r from-[#540B0E] to-[#3E0709] rounded-3xl p-6 sm:p-8 text-[#FFF3B0] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E09F3E] uppercase tracking-wider">
            <HugeiconsIcon icon={SparklesIcon} size={14} />
            <span>Customize Your Influence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Elevate Your Bio Page Design
          </h2>
          <p className="text-xs sm:text-sm text-[#FFF3B0]/80 leading-relaxed">
            Customize luxury themes, add newsletter collection, or configure direct social links to convert your followers into customers.
          </p>
        </div>
        <Link href="/app/page">
          <Button size="md" className="whitespace-nowrap shadow-md">
            Open Page Editor →
          </Button>
        </Link>
      </div>

      {/* ── Top Links & Traffic Sources ── */}
      {stats && (stats.topLinks.length > 0 || stats.sources.length > 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Links */}
          <div className="bg-white rounded-3xl p-6 border border-[#540B0E]/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#540B0E]">Top Performing Links</h2>
              <span className="text-[11px] font-semibold text-[#766050]">By Clicks</span>
            </div>
            <div className="space-y-2.5">
              {stats.topLinks.map((l, idx) => (
                <div
                  key={l.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7EE] border border-[#540B0E]/8 hover:border-[#E09F3E]/40 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-white border border-[#540B0E]/10 text-xs font-black text-[#540B0E] flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#540B0E] truncate">{l.title}</span>
                  </div>
                  <span className="text-xs font-black text-[#E09F3E] bg-white px-2.5 py-1 rounded-lg border border-[#540B0E]/10 flex-shrink-0">
                    {l.clicks} clicks
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-3xl p-6 border border-[#540B0E]/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#540B0E]">Referral Traffic Sources</h2>
              <span className="text-[11px] font-semibold text-[#766050]">Distribution</span>
            </div>
            <div className="space-y-2.5">
              {stats.sources.map(s => (
                <div
                  key={s.source}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7EE] border border-[#540B0E]/8"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{SOURCE_EMOJI[s.source] ?? '🌐'}</span>
                    <span className="text-xs font-bold text-[#540B0E] capitalize">{s.source}</span>
                  </div>
                  <span className="text-xs font-bold text-[#766050] bg-white px-2.5 py-1 rounded-lg border border-[#540B0E]/10">
                    {s.count} visits
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : !loading && (
        <EmptyState
          title="No Analytics Recorded Yet"
          description="Share your bio page link on your socials to start recording page visits and link clicks."
          action={
            <Link href="/app/page">
              <Button size="sm">Edit My Bio Page →</Button>
            </Link>
          }
        />
      )}
      </div>
    </div>
  );
}
