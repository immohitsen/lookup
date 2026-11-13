'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowRight01Icon,
  ArrowDown01Icon,
  SparklesIcon,
  Mail01Icon,
  QrCodeIcon,
  ChartHistogramIcon,
  Tick01Icon,
} from '@hugeicons/core-free-icons';
import { RibbonNavbar } from '@/components/landing/RibbonNavbar';
import { PixelHeroBackground } from '@/components/landing/PixelHeroBackground';
import { ProPlatformShowcase } from '@/components/landing/ProPlatformShowcase';
import { RealBioShowcase } from '@/components/landing/RealBioShowcase';
import { ScrollManifesto } from '@/components/landing/ScrollManifesto';
import { EditorialFeatures } from '@/components/landing/EditorialFeatures';

const FAQS = [
  {
    q: 'What is a scrolling spatial bio link?',
    a: 'Unlike traditional link aggregators that force every link into a vertical list of squished rectangular buttons, Lookup puts your links, audio tracks, lookbooks, and newsletters onto a curated spatial canvas. Visitors can scroll, inspect, and experience your work at full fidelity.',
  },
  {
    q: 'How does Lookup compare to Linktree or Beacons?',
    a: 'Lookup is engineered for creators who demand editorial elegance. We provide 3 spatial architectures (Classic Stack, Bento Grid, and Haute Editorial), sub-second 0.78s global edge delivery, vector QR downloads, and direct email newsletter capture without taking a single penny of commission.',
  },
  {
    q: 'Are custom colors, themes, and 3D avatars really free?',
    a: 'Yes. All themes from our luxury palette, procedural 3D avatar generators, halo glows, and spatial layouts are unlocked without requiring a credit card. We believe styling is essential, not something to paywall behind a $15/month subscription.',
  },
  {
    q: 'Can I collect email subscribers directly on my page?',
    a: 'Yes. Lookup includes an integrated direct email capture block with automated honeypot spam protection. Fans subscribe directly on your page, and you can export your clean CSV list anytime with zero platform commissions.',
  },
  {
    q: 'Can I generate branded short links and QR codes?',
    a: 'Yes. Every Lookup account includes branded short links (lookup.bio/s/your-slug) and dynamic QR code generation with instant SVG vector and high-resolution PNG downloads for merchandise, packaging, and concert posters.',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [handle, setHandle] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    const clean = handle.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (clean) {
      router.push(`/signup?handle=${clean}`);
    } else {
      router.push('/signup');
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#25150E] font-sans selection:bg-[#E09F3E] selection:text-[#230E01]">
      
      {/* ── 1. FLOATING PILL ISLAND NAVBAR (Ribbon Style) ── */}
      <RibbonNavbar />

      {/* ── 2. HERO SECTION (Ribbon Editorial Serif + Dynamic Claim Pill) ── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#FAF7EE] border-b border-[#540B0E]/10 overflow-hidden">
        
        {/* Subtle Pixelated Background Canvas + Warm Linen Vignette */}
        <PixelHeroBackground />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6 sm:space-y-8">
          
          {/* Top Tag Kicker (Ribbon Style) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#540B0E]/12 text-xs font-mono font-bold text-[#540B0E] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E09F3E] animate-pulse" />
            <span>LOOKUP 1.0 FOR MAC & WEB // THE HAUTE STANDARD</span>
          </div>

          {/* Signature Serif + Italic Display Headline (Ribbon Pattern) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal tracking-tight text-[#540B0E] leading-[1.06] max-w-5xl mx-auto">
            Curate your digital world <br className="hidden sm:block" />
            instead of <span className="italic font-serif text-[#E09F3E]">cluttering</span> it.
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-[#766050] text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            The scrolling editorial link in bio for modern creators. Apps, audio, lookbooks, and newsletters live on an interactive spatial canvas — zero cuts, custom luxury themes, and sub-second edge speed.
          </p>

          {/* Interactive Claim Handle Pill Bar */}
          <form onSubmit={handleClaim} className="pt-2 max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row p-1.5 rounded-full bg-white border-2 border-[#540B0E]/15 shadow-[0_12px_35px_rgba(84,11,14,0.08)] focus-within:border-[#E09F3E] transition-all gap-1.5 sm:gap-0">
              <div className="flex items-center pl-5 pr-1 py-1.5 text-[#766050] text-sm select-none font-semibold">
                lookup.bio/
              </div>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourname"
                maxLength={30}
                className="flex-1 px-2 py-2 text-base text-[#540B0E] font-bold bg-transparent focus:outline-none placeholder:text-[#766050]/40"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#E09F3E] text-[#230E01] font-bold text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Claim Handle</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </button>
            </div>

            {/* Micro Transparency Pills */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-[#766050] pt-1">
              <span>FREE FOREVER</span>
              <span>•</span>
              <span>0% PLATFORM CUTS</span>
              <span>•</span>
              <span>NO CREDIT CARD</span>
            </div>
          </form>

        </div>
      </section>

      {/* ── 3. THE PRO PLATFORM (Real Linktree Paid-Tier Features Unlocked Free) ── */}
      <ProPlatformShowcase />

      {/* ── 4. REAL CREATOR BIO SHOWCASE (Authentic Work, Real Typography & Layouts) ── */}
      <RealBioShowcase />

      {/* ── 6. THE KINETIC SCROLL-SCRUB MANIFESTO (Translucent to Dark Word Reveal) ── */}
      <div id="manifesto">
        <ScrollManifesto />
      </div>

      {/* ── 7. CAPABILITIES & ARCHITECTURE (Deep Feature Breakdown, 0% Tax, Sub-Second Edge) ── */}
      <EditorialFeatures />

      {/* ── 8. FAQS ACCORDION SECTION (Ribbon Clean Full-Width Pattern) ── */}
      <section id="faq" className="py-20 sm:py-28 bg-[#FAF7EE] border-b border-[#540B0E]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 text-left">
          
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#E09F3E]">
              // FAQS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#540B0E] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#766050] font-medium">
              Everything you need to know about spatial bio links, 0% fees, and edge performance.
            </p>
          </div>

          <div className="divide-y divide-[#540B0E]/12 border-t border-b border-[#540B0E]/12">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4 sm:py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left font-bold text-base sm:text-lg text-[#540B0E] flex items-center justify-between gap-4 cursor-pointer hover:text-[#E09F3E] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <HugeiconsIcon
                      icon={isOpen ? ArrowDown01Icon : ArrowRight01Icon}
                      size={16}
                      className="text-[#E09F3E] flex-shrink-0 transition-transform duration-200"
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-3 text-xs sm:text-sm text-[#766050] leading-relaxed max-w-3xl">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 9. ATMOSPHERIC CTA FINALE (Ribbon Atmosphere Canvas) ── */}
      <section className="py-24 sm:py-32 bg-[#540B0E] text-[#FFF3B0] relative overflow-hidden text-center select-none">
        
        {/* Luminous Ambient Halo Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#E09F3E]/20 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E09F3E]/20 border border-[#E09F3E]/40 text-xs font-mono font-bold text-[#E09F3E] shadow-xs">
            <HugeiconsIcon icon={SparklesIcon} size={13} />
            <span className="tracking-wider uppercase text-[10px] sm:text-xs">// GET STARTED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FFF3B0] leading-tight">
            Claim your handle on the <br className="hidden sm:block" />
            <span className="italic font-serif text-[#E09F3E]">creator strip.</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#FFF3B0]/80 max-w-xl mx-auto leading-relaxed">
            Reserve your unique creator URL today before someone else takes it. Free forever, no credit card required.
          </p>

          {/* Centered Glowing Input Pill Bar */}
          <form onSubmit={handleClaim} className="pt-2 max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row p-1.5 rounded-full bg-white border-2 border-[#E09F3E] shadow-[0_15px_40px_rgba(224,159,62,0.35)] focus-within:border-white transition-all gap-1.5 sm:gap-0">
              <div className="flex items-center pl-5 pr-1 py-1.5 text-[#766050] text-sm select-none font-semibold">
                lookup.bio/
              </div>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourname"
                maxLength={30}
                className="flex-1 px-2 py-2 text-base text-[#540B0E] font-bold bg-transparent focus:outline-none placeholder:text-[#766050]/40"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#E09F3E] text-[#230E01] font-bold text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Claim Free</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#FFF3B0]/70 font-semibold pt-1">
              <span>✓ FREE FOREVER</span>
              <span>•</span>
              <span>✓ NO CREDIT CARD</span>
              <span>•</span>
              <span>✓ 0% COMMISSIONS</span>
            </div>
          </form>

        </div>
      </section>

      {/* ── 10. CLEAN EDITORIAL FOOTER (Ribbon Minimalist Pattern) ── */}
      <footer className="py-12 bg-[#FAF7EE] border-t border-[#540B0E]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#766050]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-[#E09F3E] text-[#230E01] font-black text-xs flex items-center justify-center shadow-xs">
              L
            </div>
            <span className="font-black text-[#540B0E] tracking-tight text-sm">LOOKUP</span>
            <span>— The Haute Editorial Canvas for Creators</span>
          </div>
          <div className="font-mono text-[11px]">
            © {new Date().getFullYear()} LOOKUP BIO // ZERO PLATFORM COMMISSIONS.
          </div>
        </div>
      </footer>

    </div>
  );
}
