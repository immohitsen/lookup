'use client';
import { useEffect, useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Download01Icon,
  Search01Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';

interface Sub {
  _id: string;
  email: string;
  source: string;
  createdAt: string;
}

export default function AudiencePage() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/subscribers')
      .then(r => r.json())
      .then(setSubs)
      .finally(() => setLoading(false));
  }, []);

  const filtered = subs.filter(s => s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden p-6 sm:p-8 w-full font-sans">
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* ── Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#540B0E]/10">
        <div>
          <h1 className="text-2xl font-black text-[#540B0E] tracking-tight">
            Audience & Subscribers{' '}
            <span className="text-[#E09F3E] text-lg font-bold">({subs.length})</span>
          </h1>
          <p className="text-xs text-[#766050] mt-0.5">
            View and export email leads captured via your bio page newsletter block.
          </p>
        </div>

        <a href="/api/subscribers/export" download className="self-start sm:self-auto">
          <Button variant="secondary" size="sm">
            <HugeiconsIcon icon={Download01Icon} size={15} />
            <span>Export CSV</span>
          </Button>
        </a>
      </div>

      {!loading && subs.length === 0 ? (
        <EmptyState
          title="No Subscribers Collected Yet"
          description="Add an Email Newsletter Signup block in your Page Editor to begin collecting audience emails."
        />
      ) : (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-sm">
            <HugeiconsIcon icon={Search01Icon} size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#766050]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search subscriber emails..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#540B0E]/15 bg-white text-xs font-semibold text-[#25150E] outline-none focus:border-[#E09F3E] focus:ring-2 focus:ring-[#E09F3E]/20 transition-all placeholder:text-[#766050]/50"
            />
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-[#540B0E]/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#540B0E]/10 bg-[#FAF7EE]/60 text-xs font-bold text-[#540B0E]">
                    <th className="px-6 py-4">Subscriber Email</th>
                    <th className="px-6 py-4">Lead Source</th>
                    <th className="px-6 py-4">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#540B0E]/8">
                  {filtered.map(s => (
                    <tr key={s._id} className="hover:bg-[#FAF7EE]/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-xs text-[#540B0E]">
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon icon={Mail01Icon} size={15} className="text-[#E09F3E]" />
                          <span>{s.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-[#766050] capitalize">
                        {s.source || 'Bio Page'}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-[#766050]">
                        {new Date(s.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-xs text-[#766050] font-medium">
                        No matching subscribers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
