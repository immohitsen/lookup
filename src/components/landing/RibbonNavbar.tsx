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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-4 select-none">
      <nav className="pointer-events-auto relative flex items-center bg-white/95 backdrop-blur-xl border border-[#540B0E]/12 shadow-[0_8px_30px_rgba(84,11,14,0.06)] rounded-full p-1.5 sm:p-2 gap-2 sm:gap-6 transition-all duration-300 max-w-fit">
        
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-2.5 pl-2 sm:pl-3 pr-1 group">
          <div className="w-7 h-7 rounded-lg bg-[#E09F3E] text-[#230E01] flex items-center justify-center text-xs font-black shadow-xs group-hover:scale-105 transition-transform">
            L
          </div>
          <span className="text-sm font-black tracking-tight text-[#540B0E]">LOOKUP</span>
        </Link>

        {/* Center Nav Anchors (Desktop) */}
        <div className="hidden md:flex items-center gap-6 px-1 text-xs font-semibold text-[#766050]">
          <a href="#sandbox" className="hover:text-[#540B0E] transition-colors">
            Live Sandbox
          </a>
          <a href="#showcase" className="hover:text-[#540B0E] transition-colors">
            Real Bios
          </a>
          <a href="#architecture" className="hover:text-[#540B0E] transition-colors">
            How It Works
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
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:inline-block px-3 py-1.5 text-xs font-semibold text-[#766050] hover:text-[#540B0E] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#E09F3E] text-[#230E01] px-4 py-2 text-xs font-bold shadow-xs hover:brightness-105 active:scale-[0.96] transition-all cursor-pointer"
          >
            <span>Claim Handle</span>
            <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-full text-[#540B0E] hover:bg-[#FAF7EE] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <HugeiconsIcon icon={mobileOpen ? Cancel01Icon : Menu01Icon} size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="pointer-events-auto md:hidden fixed inset-x-4 top-20 bg-white/95 backdrop-blur-xl border border-[#540B0E]/12 rounded-3xl p-5 shadow-2xl space-y-3 z-50">
          <a
            href="#sandbox"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-[#540B0E] py-2 border-b border-[#540B0E]/8"
          >
            Live Sandbox
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-[#540B0E] py-2 border-b border-[#540B0E]/8"
          >
            Real Bios
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-[#540B0E] py-2 border-b border-[#540B0E]/8"
          >
            How It Works
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
          <div className="pt-2 flex items-center justify-between">
            <Link
              href="/login"
              className="text-xs font-bold text-[#540B0E]"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-xl bg-[#E09F3E] text-[#230E01] text-xs font-bold shadow-xs"
            >
              Claim Link Free →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
