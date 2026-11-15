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
import { HeroMockup } from '@/components/landing/HeroMockup';
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
    a: 'Yes. All themes from our palette, procedural 3D avatar generators, and spatial layouts are unlocked without requiring a credit card. We believe styling is essential, not something to paywall behind a $15/month subscription.',
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
    <div className="min-h-screen bg-[#FAF8F3] text-[#1C1A17] font-sans selection:bg-[#E09F3E] selection:text-[#1C1A17]">

      {/* ── 1. FLOATING PILL ISLAND NAVBAR (Ribbon Style) ── */}
      <RibbonNavbar />

      {/* ── 2. HERO SECTION (Flat, product-led, calm) ── */}
      <section className="relative pt-28 pb-14 sm:pt-40 sm:pb-24 bg-[#FAF8F3] border-b border-[#1C1A17]/8 overflow-hidden">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left: copy */}
            <div className="text-center lg:text-left space-y-5 sm:space-y-7">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white border border-[#1C1A17]/10 text-[11px] sm:text-xs font-medium text-[#55504A] shadow-xs max-w-full">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E09F3E] flex-shrink-0" />
                <span>Lookup 1.0 is live</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-[#1C1A17] leading-[1.1]">
                The link in bio that<br className="hidden lg:block" /> doesn&apos;t look like everyone else&apos;s.
              </h1>

              <p className="text-[#55504A] text-sm sm:text-lg max-w-xl mx-auto lg:mx-0 leading-[1.6]">
                Build a real page for your links, music, and newsletter — not a stack of grey buttons. Free forever, 0% commission, live in under a minute.
              </p>

              {/* Interactive Claim Handle Pill Bar */}
              <form onSubmit={handleClaim} className="pt-2 max-w-md mx-auto lg:mx-0 space-y-3 px-1 sm:px-0">
                <div className="flex flex-col sm:flex-row p-1.5 rounded-2xl sm:rounded-full bg-white border border-[#1C1A17]/12 shadow-[0_8px_24px_rgba(28,26,23,0.06)] focus-within:border-[#E09F3E] transition-all gap-1.5 sm:gap-0">
                  <div className="flex items-center pl-4 sm:pl-5 pr-1 py-1.5 text-[#8A8379] text-sm select-none font-medium">
                    lookup.bio/
                  </div>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="yourname"
                    maxLength={30}
                    className="flex-1 px-3 sm:px-2 py-2 text-base text-[#1C1A17] font-semibold bg-transparent focus:outline-none placeholder:text-[#8A8379]/60"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl sm:rounded-full bg-[#1C1A17] text-[#FAF8F3] font-semibold text-xs sm:text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Claim handle</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                  </button>
                </div>

                <div className="flex items-center justify-center lg:justify-start flex-wrap gap-x-3 gap-y-1 text-xs text-[#8A8379]">
                  <span>Free forever</span>
                  <span>·</span>
                  <span>0% platform cuts</span>
                  <span>·</span>
                  <span>No credit card</span>
                </div>
              </form>
            </div>

            {/* Right: actual product screenshot, not abstract art */}
            <div className="flex justify-center lg:justify-end">
              <HeroMockup />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2b. VALUE STRIP (what you actually get — no fabricated usage stats) ── */}
      <section className="py-5 sm:py-6 bg-white border-b border-[#1C1A17]/8">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2 text-xs sm:text-sm text-[#55504A]">
          <span className="flex items-center gap-1.5"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-[#8A8379]" />0% commission</span>
          <span className="flex items-center gap-1.5"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-[#8A8379]" />Sub-second edge delivery</span>
          <span className="flex items-center gap-1.5"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-[#8A8379]" />Custom themes included free</span>
          <span className="flex items-center gap-1.5"><HugeiconsIcon icon={Tick01Icon} size={13} className="text-[#8A8379]" />No credit card to start</span>
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
      <section id="faq" className="py-14 sm:py-24 bg-[#FAF8F3] border-b border-[#1C1A17]/8">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 space-y-8 sm:space-y-10 text-left">

          <div className="space-y-2">
            <span className="text-xs font-medium text-[#8A8379]">
              FAQs
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1C1A17] tracking-[-0.02em]">
              Frequently asked questions
            </h2>
            <p className="text-xs sm:text-sm text-[#55504A]">
              Everything you need to know about spatial bio links, 0% fees, and edge performance.
            </p>
          </div>

          <div className="divide-y divide-[#1C1A17]/10 border-t border-b border-[#1C1A17]/10">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-3.5 sm:py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left font-semibold text-sm sm:text-lg text-[#1C1A17] flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:text-[#8A8379] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <HugeiconsIcon
                      icon={isOpen ? ArrowDown01Icon : ArrowRight01Icon}
                      size={16}
                      className="text-[#8A8379] flex-shrink-0 transition-transform duration-200"
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-2.5 sm:pt-3 text-xs sm:text-sm text-[#55504A] leading-[1.6] max-w-3xl">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 9. CTA FINALE (Calm, single accent, no shouting) ── */}
      <section className="py-16 sm:py-32 bg-[#1C1A17] text-[#FAF8F3] relative overflow-hidden text-center select-none">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 sm:space-y-8">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/10 text-xs font-medium text-[#E09F3E]">
            <HugeiconsIcon icon={SparklesIcon} size={13} />
            <span>Get started</span>
          </div>

          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-[#FAF8F3] leading-tight px-1">
            Claim your handle on the <br className="hidden sm:block" />
            <span className="text-[#E09F3E]">creator strip.</span>
          </h2>

          <p className="text-xs sm:text-base lg:text-lg text-[#FAF8F3]/70 max-w-xl mx-auto leading-[1.6] px-2">
            Reserve your unique creator URL today before someone else takes it. Free forever, no credit card required.
          </p>

          {/* Centered Claim Pill Bar */}
          <form onSubmit={handleClaim} className="pt-2 max-w-md mx-auto space-y-3 px-1 sm:px-0">
            <div className="flex flex-col sm:flex-row p-1.5 rounded-2xl sm:rounded-full bg-white border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.3)] focus-within:border-[#E09F3E] transition-all gap-1.5 sm:gap-0">
              <div className="flex items-center pl-4 sm:pl-5 pr-1 py-1.5 text-[#8A8379] text-sm select-none font-medium">
                lookup.bio/
              </div>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourname"
                maxLength={30}
                className="flex-1 px-3 sm:px-2 py-2 text-base text-[#1C1A17] font-semibold bg-transparent focus:outline-none placeholder:text-[#8A8379]/60"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl sm:rounded-full bg-[#E09F3E] text-[#1C1A17] font-semibold text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Claim free</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </button>
            </div>

            <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-xs text-[#FAF8F3]/60">
              <span>Free forever</span>
              <span>·</span>
              <span>No credit card</span>
              <span>·</span>
              <span>0% commissions</span>
            </div>
          </form>

        </div>
      </section>

      {/* ── 10. CLEAN FOOTER ── */}
      <footer className="py-10 sm:py-12 bg-[#FAF8F3] border-t border-[#1C1A17]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8379] text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#E09F3E] text-[#1C1A17] font-bold text-xs flex items-center justify-center">
              L
            </div>
            <span className="font-bold text-[#1C1A17] tracking-[-0.01em] text-sm">Lookup</span>
            <span>— the editorial canvas for creators</span>
          </div>
          <div className="text-[11px]">
            © {new Date().getFullYear()} Lookup. Zero platform commissions.
          </div>
        </div>
      </footer>

    </div>
  );
}
