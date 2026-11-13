'use client';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowUpRight01Icon,
  SparklesIcon,
  Mail01Icon,
  QrCodeIcon,
  Tick01Icon,
} from '@hugeicons/core-free-icons';

interface Props {
  handle: string;
  activeThemeBg: string;
  activeThemeColor: string;
}

export function BentoHeroCanvas({ handle, activeThemeBg, activeThemeColor }: Props) {
  const displayHandle = handle.trim() || 'kiravance';
  const displayMonogram = (handle.trim() || 'K')[0]?.toUpperCase();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail('');
      }, 3500);
    }
  }

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      
      {/* Outer Luxury Frame Container */}
      <div
        className="p-4 sm:p-5 rounded-[36px] sm:rounded-[44px] border-2 border-[#540B0E]/15 shadow-[0_25px_60px_-15px_rgba(84,11,14,0.18)] transition-colors duration-500"
        style={{ backgroundColor: activeThemeBg }}
      >
        {/* Asymmetric Dribbble-Grade Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-3.5">
          
          {/* ── TILE 1: CREATOR HEADER (Spans 12 columns) ── */}
          <div className="sm:col-span-12 p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-[#540B0E]/10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              
              {/* Creator Avatar Monogram / Photo */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-md border-2 border-white transition-colors duration-300 flex-shrink-0"
                style={{
                  backgroundColor: activeThemeColor,
                  color: '#230E01',
                }}
              >
                {displayMonogram}
              </div>

              {/* Creator Metadata */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <h3 className="text-base sm:text-lg font-black text-[#540B0E] tracking-tight truncate max-w-[200px]">
                    {displayHandle}
                  </h3>
                  <span className="w-4 h-4 rounded-full bg-[#E09F3E] text-[#230E01] flex items-center justify-center text-[10px] font-black shadow-2xs">
                    ✓
                  </span>
                </div>
                <p className="text-xs text-[#766050] font-medium">Visual Director & Independent Storyteller</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 pt-0.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    PARIS • 02:45 AM
                  </span>
                  <span className="text-[10px] font-mono text-[#766050]/60">AVAILABLE</span>
                </div>
              </div>
            </div>

            {/* Custom Domain Pill */}
            <div className="text-[10px] font-mono font-bold text-[#540B0E] bg-[#FAF7EE] px-3 py-1.5 rounded-xl border border-[#540B0E]/10 truncate max-w-[170px]">
              lookup.bio/{displayHandle}
            </div>
          </div>

          {/* ── TILE 2: NOW PLAYING AUDIO WIDGET (Spans 7 columns) ── */}
          <div className="sm:col-span-7 p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-[#540B0E]/10 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#766050]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E09F3E]" />
                NOW PLAYING
              </span>
              <span className="text-[#540B0E]">SPOTIFY // 320 KBPS</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Mini Album Vinyl / Art */}
              <div className="w-12 h-12 rounded-xl bg-[#540B0E] text-[#FFF3B0] flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm overflow-hidden relative group">
                <div className="w-full h-full bg-gradient-to-tr from-[#540B0E] to-[#E09F3E] flex items-center justify-center">
                  🎵
                </div>
              </div>

              {/* Track Name + Waveform */}
              <div className="min-w-0 flex-1">
                <span className="text-xs font-black text-[#540B0E] block truncate">
                  Midnight in Montmartre (Lo-Fi)
                </span>
                <span className="text-[11px] text-[#766050] font-medium block truncate">
                  Kira Vance Studio Tape
                </span>

                {/* Animated EQ Bars */}
                <div className="flex items-end gap-1 h-3.5 mt-1">
                  <span className={`w-1 bg-[#E09F3E] rounded-full transition-all ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
                  <span className={`w-1 bg-[#540B0E] rounded-full transition-all ${isPlaying ? 'h-2 animate-bounce' : 'h-1'}`} />
                  <span className={`w-1 bg-[#E09F3E] rounded-full transition-all ${isPlaying ? 'h-3.5 animate-pulse' : 'h-1'}`} />
                  <span className={`w-1 bg-[#540B0E] rounded-full transition-all ${isPlaying ? 'h-2 animate-bounce' : 'h-1'}`} />
                  <span className={`w-1 bg-[#E09F3E] rounded-full transition-all ${isPlaying ? 'h-2.5 animate-pulse' : 'h-1'}`} />
                </div>
              </div>

              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-[#FAF7EE] border border-[#540B0E]/12 flex items-center justify-center text-[#540B0E] hover:bg-[#E09F3E] hover:text-[#230E01] transition-all cursor-pointer flex-shrink-0 text-xs font-black"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
          </div>

          {/* ── TILE 3: DYNAMIC VECTOR QR BADGE (Spans 5 columns) ── */}
          <div className="sm:col-span-5 p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-[#540B0E]/10 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#766050]">
              <span>VECTOR QR</span>
              <span className="text-emerald-700">SVG + PNG</span>
            </div>

            <div className="flex items-center justify-center py-1">
              <div className="w-14 h-14 p-1.5 rounded-xl border border-[#540B0E]/15 bg-[#FAF7EE] flex items-center justify-center shadow-2xs">
                <HugeiconsIcon icon={QrCodeIcon} size={38} className="text-[#540B0E]" />
              </div>
            </div>

            <div className="text-[10px] font-mono text-center text-[#766050] font-semibold">
              SCAN TO OPEN BIO
            </div>
          </div>

          {/* ── TILE 4: FEATURED HERO WORK (Spans 12 columns) ── */}
          <div className="sm:col-span-12 p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-[#540B0E]/10 flex items-center justify-between hover:border-[#E09F3E] transition-all group cursor-pointer shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7EE] border border-[#540B0E]/10 flex items-center justify-center text-lg flex-shrink-0">
                ✨
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-black uppercase tracking-wider text-[#E09F3E]">
                    PINNED HERO
                  </span>
                  <span className="text-[9px] font-mono text-[#766050]">24.8K CLICKS</span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-[#540B0E] truncate">
                  Autumn Lookbook & Film Campaign
                </h4>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#FAF7EE] flex items-center justify-center text-[#540B0E] group-hover:bg-[#E09F3E] group-hover:text-[#230E01] transition-all flex-shrink-0">
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} />
            </div>
          </div>

          {/* ── TILE 5: FAN NEWSLETTER DIRECT CAPTURE (Spans 12 columns) ── */}
          <div className="sm:col-span-12 p-4 sm:p-5 rounded-3xl bg-[#540B0E] text-[#FFF3B0] border border-[#E09F3E]/25 shadow-md space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1.5 text-[#FFF3B0]">
                <HugeiconsIcon icon={Mail01Icon} size={15} className="text-[#E09F3E]" />
                Direct Email Newsletter
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E09F3E] text-[#230E01]">
                0% FEES
              </span>
            </div>

            {newsletterSuccess ? (
              <div className="py-2.5 text-center text-xs font-bold text-[#E09F3E] animate-pulse flex items-center justify-center gap-1.5">
                <HugeiconsIcon icon={Tick01Icon} size={15} />
                <span>Subscribed! Clean CSV export unlocked.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter fan email..."
                  required
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#220609] border border-[#E09F3E]/30 text-[#FFF3B0] placeholder:text-[#FFF3B0]/40 focus:outline-none focus:border-[#E09F3E] font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#E09F3E] text-[#230E01] font-bold text-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer flex-shrink-0 shadow-xs"
                >
                  Join
                </button>
              </form>
            )}

            <div className="flex items-center justify-between text-[10px] font-mono text-[#FFF3B0]/60 pt-0.5">
              <span>Honeypot Spam Guard</span>
              <span>Direct Audience Ownership</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

