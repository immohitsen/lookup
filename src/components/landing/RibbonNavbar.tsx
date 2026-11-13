'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowRight01Icon,
  Cancel01Icon,
  Menu01Icon,
} from '@hugeicons/core-free-icons';

export function RibbonNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-2.5 sm:pt-4 px-2.5 sm:px-4 select-none">
      <nav className="pointer-events-auto relative flex items-center justify-between sm:justify-start bg-white/95 backdrop-blur-xl border border-[#540B0E]/12 shadow-[0_8px_30px_rgba(84,11,14,0.06)] rounded-full p-1.5 sm:p-2 gap-1.5 sm:gap-6 transition-all duration-300 w-full max-w-[95%] sm:max-w-fit">
        
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-2 pl-2 sm:pl-3 pr-1 group flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#E09F3E] text-[#230E01] flex items-center justify-center text-xs font-black shadow-xs group-hover:scale-105 transition-transform">
            L
          </div>
          <span className="text-sm font-black tracking-tight text-[#540B0E]">LOOKUP</span>
        </Link>

        {/* Center Nav Anchors (Desktop) */}
        <div className="hidden md:flex items-center gap-6 px-1 text-xs font-semibold text-[#766050]">
          <a href="#platform" className="hover:text-[#540B0E] transition-colors">
            Pro Features
          </a>
          <a href="#showcase" className="hover:text-[#540B0E] transition-colors">
            Real Bios
          </a>
          <a href="#manifesto" className="hover:text-[#540B0E] transition-colors">
            Manifesto
          </a>
          <a href="#features" className="hover:text-[#540B0E] transition-colors">
            Capabilities
          </a>
          <a href="#faq" className="hover:text-[#540B0E] transition-colors">
            FAQs
          </a>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <Link
            href="/login"
            className="hidden sm:inline-block px-3 py-1.5 text-xs font-semibold text-[#766050] hover:text-[#540B0E] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-[#E09F3E] text-[#230E01] px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold shadow-xs hover:brightness-105 active:scale-[0.96] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Claim Handle</span>
            <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-full text-[#540B0E] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <HugeiconsIcon icon={mobileOpen ? Cancel01Icon : Menu01Icon} size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileOpen && (
        <div
          className="pointer-events-auto md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="pointer-events-auto md:hidden fixed inset-x-4 top-16 bg-white/98 backdrop-blur-2xl border border-[#540B0E]/12 rounded-3xl p-5 shadow-2xl space-y-3 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <a
            href="#platform"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-[#540B0E] py-2 border-b border-[#540B0E]/8"
          >
            Pro Features
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-[#540B0E] py-2 border-b border-[#540B0E]/8"
          >
            Real Bios
          </a>
          <a
            href="#manifesto"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-[#540B0E] py-2 border-b border-[#540B0E]/8"
          >
            Manifesto
          </a>
          <a
            href="#features"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-[#540B0E] py-2 border-b border-[#540B0E]/8"
          >
            Capabilities
          </a>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-[#540B0E] py-2"
          >
            FAQs
          </a>
          <div className="pt-3 border-t border-[#540B0E]/8 flex items-center justify-between gap-3">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-xs font-bold text-[#540B0E] px-3 py-2 rounded-xl hover:bg-[#FAF7EE]"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#E09F3E] text-[#230E01] text-xs font-bold shadow-xs hover:brightness-105 active:scale-95 transition-all"
            >
              Claim Link Free →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
