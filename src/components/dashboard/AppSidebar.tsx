'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  DashboardSquare01Icon,
  Edit01Icon,
  UserGroupIcon,
  Link01Icon,
  ChartHistogramIcon,
  Settings01Icon,
  Logout01Icon,
  ArrowUpRight01Icon,
  Menu01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';

const NAV = [
  { href: '/app/home',     label: 'Dashboard', icon: DashboardSquare01Icon },
  { href: '/app/page',     label: 'My Page',   icon: Edit01Icon },
  { href: '/app/audience', label: 'Audience',  icon: UserGroupIcon },
  { href: '/app/links',    label: 'Links & QR', icon: Link01Icon },
  { href: '/app/insights', label: 'Insights',  icon: ChartHistogramIcon },
  { href: '/app/settings', label: 'Settings',  icon: Settings01Icon },
];

export function AppSidebar({ username: initialUsername }: { username: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState(initialUsername || '');

  useEffect(() => {
    if (initialUsername) setUsername(initialUsername);
  }, [initialUsername]);

  useEffect(() => {
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(d => {
        if (d?.username) setUsername(d.username);
      })
      .catch(() => {});
  }, []);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Brand Logo Header */}
      <div className="px-6 py-5 border-b border-[#540B0E]/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E09F3E] text-[#230E01] flex items-center justify-center font-black text-base shadow-sm">
            L
          </div>
          <div>
            <span className="font-black text-lg tracking-tight text-[#540B0E] block leading-none">LOOKUP</span>
            <span className="text-[10px] font-bold text-[#766050] tracking-wider uppercase">Creator Studio</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE] cursor-pointer"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={18} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-5 flex flex-col gap-1.5 px-3 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                active
                  ? 'bg-[#540B0E] text-[#FFF3B0] shadow-sm'
                  : 'text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE]'
              }`}
            >
              <HugeiconsIcon icon={Icon} size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile / Actions */}
      <div className="p-3 border-t border-[#540B0E]/10 space-y-1.5 bg-white">
        <a
          href={username ? `/${username}` : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#540B0E] bg-[#FAF7EE] hover:bg-[#F5EFE0] transition-all group"
          title={username ? `Open /${username} in new tab` : 'Open Bio Page'}
        >
          <span className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="truncate font-mono">/{username}</span>
          </span>
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="text-[#766050] group-hover:text-[#540B0E] flex-shrink-0" />
        </a>

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#9E2A2B] hover:bg-[#9E2A2B]/10 transition-all cursor-pointer"
        >
          <HugeiconsIcon icon={Logout01Icon} size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Trigger */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-xl bg-white border border-[#540B0E]/15 shadow-sm flex items-center justify-center text-[#540B0E] hover:bg-[#FAF7EE] transition-all cursor-pointer"
          aria-label="Open navigation menu"
        >
          <HugeiconsIcon icon={Menu01Icon} size={18} />
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 bottom-0 left-0 w-[260px] bg-white z-50 shadow-2xl transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>

      {/* Desktop Fixed Sidebar (Permanently Fixed) */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] h-screen bg-white border-r border-[#540B0E]/10 flex-col font-sans z-40">
        {sidebarContent}
      </aside>
    </>
  );
}
