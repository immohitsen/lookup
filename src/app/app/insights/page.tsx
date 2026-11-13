'use client';
import { useEffect, useState } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { AnalyticsTrendChart } from '@/components/dashboard/AnalyticsTrendChart';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ChartHistogramIcon,
  Globe02Icon,
  CursorPointer01Icon,
  EyeIcon,
  Mail01Icon,
  SmartPhone01Icon,
  ComputerIcon,
} from '@hugeicons/core-free-icons';

type Range = '7d' | '30d' | 'all';

interface TimelinePoint {
  date: string;
  views: number;
  clicks: number;
}

interface Stats {
  views: number;
  clicks: number;
  clickRate: number;
  subscribers: number;
  topLinks: { id: string; title: string; clicks: number }[];
  sources: { source: string; count: number }[];
  countries?: { country: string; count: number }[];
  devices?: { device: string; count: number }[];
  timeline?: TimelinePoint[];
}

const SOURCE_COLOR: Record<string, string> = {
  instagram: '#E09F3E',
  tiktok: '#9E2A2B',
  youtube: '#540B0E',
  direct: '#335C67',
  other: '#766050',
};

const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  IN: 'India',
  GB: 'United Kingdom',
  CA: 'Canada',
  DE: 'Germany',
  FR: 'France',
  AU: 'Australia',
  BR: 'Brazil',
  JP: 'Japan',
  SG: 'Singapore',
  NL: 'Netherlands',
  ES: 'Spain',
  IT: 'Italy',
  AE: 'United Arab Emirates',
  ZA: 'South Africa',
};

function getCountryFlag(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function InsightsPage() {
  const [range, setRange] = useState<Range>('30d');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics/stats?range=${range}`)
      .then(r => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, [range]);

  const maxClicks = stats?.topLinks[0]?.clicks ?? 1;
  const maxSources = stats?.sources[0]?.count ?? 1;
  const maxCountries = stats?.countries?.[0]?.count ?? 1;
  const totalDeviceVisits = (stats?.devices ?? []).reduce((acc, d) => acc + d.count, 0) || 1;

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden p-6 sm:p-8 w-full font-sans">
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#540B0E]/10">
          <div>
            <h1 className="text-2xl font-black text-[#540B0E] tracking-tight">Performance Insights</h1>
            <p className="text-xs text-[#766050] mt-0.5">
              Deep dive into audience behavior, top click drivers, and global traffic distribution.
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

        {/* ── Top Summary Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Views"
            value={loading ? '—' : (stats?.views ?? 0).toLocaleString()}
            icon={<HugeiconsIcon icon={EyeIcon} size={22} className="text-[#E09F3E]" />}
          />
          <StatCard
            label="Total Clicks"
            value={loading ? '—' : (stats?.clicks ?? 0).toLocaleString()}
            icon={<HugeiconsIcon icon={CursorPointer01Icon} size={22} className="text-[#335C67]" />}
          />
          <StatCard
            label="Conversion Rate"
            value={loading ? '—' : `${stats?.clickRate ?? 0}%`}
            icon={<HugeiconsIcon icon={ChartHistogramIcon} size={22} className="text-[#540B0E]" />}
          />
          <StatCard
            label="Audience Subscribers"
            value={loading ? '—' : (stats?.subscribers ?? 0).toLocaleString()}
            icon={<HugeiconsIcon icon={Mail01Icon} size={22} className="text-[#9E2A2B]" />}
          />
        </div>

        {/* ── Visual Performance Timeline ── */}
        <AnalyticsTrendChart data={stats?.timeline ?? []} />

        {/* ── Distribution Section 1: Links & Referrals ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Links Bar Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#540B0E]/8">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={CursorPointer01Icon} size={16} className="text-[#E09F3E]" />
                <h2 className="text-sm font-bold text-[#540B0E]">Link Click Distribution</h2>
              </div>
              <span className="text-xs text-[#766050] font-semibold">Relative Share</span>
            </div>

            {stats && stats.topLinks.length > 0 ? (
              <div className="space-y-4">
                {stats.topLinks.map(l => {
                  const pct = Math.max(8, Math.round((l.clicks / maxClicks) * 100));
                  return (
                    <div key={l.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#540B0E] truncate max-w-[75%]">{l.title}</span>
                        <span className="text-[#766050] font-mono">{l.clicks} clicks</span>
                      </div>
                      <div className="h-3 rounded-full bg-[#FAF7EE] border border-[#540B0E]/10 overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full bg-[#E09F3E] transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#766050]">No link clicks in this timeframe.</div>
            )}
          </div>

          {/* Referral Traffic Sources */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#540B0E]/8">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Globe02Icon} size={16} className="text-[#335C67]" />
                <h2 className="text-sm font-bold text-[#540B0E]">Referral Channel Sources</h2>
              </div>
              <span className="text-xs text-[#766050] font-semibold">Traffic Volume</span>
            </div>

            {stats && stats.sources.length > 0 ? (
              <div className="space-y-4">
                {stats.sources.map(s => {
                  const pct = Math.max(8, Math.round((s.count / maxSources) * 100));
                  const barColor = SOURCE_COLOR[s.source] || '#766050';
                  return (
                    <div key={s.source} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#540B0E] capitalize">{s.source}</span>
                        <span className="text-[#766050] font-mono">{s.count} visits</span>
                      </div>
                      <div className="h-3 rounded-full bg-[#FAF7EE] border border-[#540B0E]/10 overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: barColor }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#766050]">No referral traffic recorded.</div>
            )}
          </div>
        </div>

        {/* ── Distribution Section 2: Countries & Devices (Linktree Pro) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Geographic Countries */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#540B0E]/8">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Globe02Icon} size={16} className="text-[#540B0E]" />
                <h2 className="text-sm font-bold text-[#540B0E]">Top Geographic Locations</h2>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#335C67] bg-[#335C67]/10 px-2 py-0.5 rounded-full">
                Global
              </span>
            </div>

            {stats && stats.countries && stats.countries.length > 0 ? (
              <div className="space-y-3.5">
                {stats.countries.map(c => {
                  const pct = Math.max(8, Math.round((c.count / maxCountries) * 100));
                  const countryName = COUNTRY_NAMES[c.country.toUpperCase()] || c.country.toUpperCase();
                  const flag = getCountryFlag(c.country);
                  return (
                    <div key={c.country} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{flag}</span>
                          <span className="text-[#540B0E]">{countryName}</span>
                          <span className="text-[10px] font-mono text-[#766050] bg-[#FAF7EE] px-1.5 py-0.5 rounded border border-[#540B0E]/10">
                            {c.country.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-[#766050] font-mono">{c.count} visitors</span>
                      </div>
                      <div className="h-3 rounded-full bg-[#FAF7EE] border border-[#540B0E]/10 overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full bg-[#335C67] transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#766050]">
                Country data will appear as visitors arrive from different regions.
              </div>
            )}
          </div>

          {/* Device Distribution */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#540B0E]/8">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={SmartPhone01Icon} size={16} className="text-[#9E2A2B]" />
                <h2 className="text-sm font-bold text-[#540B0E]">Device & Platform Breakdown</h2>
              </div>
              <span className="text-xs text-[#766050] font-semibold">Share of Traffic</span>
            </div>

            {stats && stats.devices && stats.devices.length > 0 ? (
              <div className="space-y-4">
                {stats.devices.map(d => {
                  const pct = Math.round((d.count / totalDeviceVisits) * 100);
                  const isMobile = d.device.toLowerCase() === 'mobile';
                  return (
                    <div
                      key={d.device}
                      className="p-3.5 rounded-2xl bg-[#FAF7EE]/60 border border-[#540B0E]/10 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-[#540B0E]/10 flex items-center justify-center text-[#540B0E]">
                          <HugeiconsIcon
                            icon={isMobile ? SmartPhone01Icon : ComputerIcon}
                            size={18}
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#540B0E] capitalize">
                            {d.device || 'Mobile'}
                          </div>
                          <div className="text-[10px] text-[#766050]">
                            {d.count} total session{d.count === 1 ? '' : 's'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-[#540B0E] font-mono">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#766050]">
                No device breakdown recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}