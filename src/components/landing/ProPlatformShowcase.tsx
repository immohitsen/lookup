'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SparklesIcon,
  Calendar01Icon,
  QrCodeIcon,
  ChartHistogramIcon,
  Mail01Icon,
  Download01Icon,
  Tick01Icon,
  Search01Icon,
  EyeIcon,
  CursorPointer01Icon,
} from '@hugeicons/core-free-icons';

interface ThemePreset {
  id: string;
  name: string;
  dotColor: string;
  bg: string;
  surface: string;
  ink: string;
  accent: string;
  accentText: string;
}

const PRESETS: ThemePreset[] = [
  {
    id: 'bordeaux',
    name: 'Bordeaux & Honey',
    dotColor: '#540B0E',
    bg: '#140305',
    surface: '#240609',
    ink: '#FFF3B0',
    accent: '#E09F3E',
    accentText: '#230E01',
  },
  {
    id: 'noir',
    name: 'Noir Velvet',
    dotColor: '#121212',
    bg: '#0F0F12',
    surface: '#1A1A22',
    ink: '#F5F5F7',
    accent: '#E09F3E',
    accentText: '#121212',
  },
  {
    id: 'slate',
    name: 'Dark Slate',
    dotColor: '#335C67',
    bg: '#172B30',
    surface: '#233F47',
    ink: '#FFF3B0',
    accent: '#E09F3E',
    accentText: '#172B30',
  },
  {
    id: 'linen',
    name: 'Champagne Linen',
    dotColor: '#FAF7EE',
    bg: '#FAF7EE',
    surface: '#FFFFFF',
    ink: '#540B0E',
    accent: '#540B0E',
    accentText: '#FFF3B0',
  },
];

const QR_SWATCHES = [
  { id: 'bordeaux', label: 'Bordeaux', hex: '#540B0E' },
  { id: 'honey', label: 'Honey', hex: '#E09F3E' },
  { id: 'slate', label: 'Slate', hex: '#335C67' },
  { id: 'noir', label: 'Noir', hex: '#1B1B2F' },
];

export function ProPlatformShowcase() {
  const [selectedTheme, setSelectedTheme] = useState<ThemePreset>(PRESETS[0]);
  const [selectedQrColor, setSelectedQrColor] = useState(QR_SWATCHES[0].hex);
  const [scheduleActive, setScheduleActive] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  function handleSimulateCopy() {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7EE] border-b border-[#540B0E]/10 select-none relative overflow-hidden">
      
      {/* Background Subtle Ambient Radiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-r from-[#E09F3E]/12 via-[#540B0E]/6 to-[#335C67]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#540B0E]/10 text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#E09F3E] flex items-center gap-1.5">
              <HugeiconsIcon icon={SparklesIcon} size={14} />
              // 01 EVERY PRO FEATURE • INCLUDED FREE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#540B0E] tracking-tight leading-[1.1]">
              Everything you pay $15/month for elsewhere. Built in.
            </h2>
            <p className="text-sm sm:text-base text-[#766050] font-medium leading-relaxed">
              Link scheduling, print-ready vector QR codes, direct fan newsletters, and daily performance telemetry — with zero paywalls and zero platform cuts.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs text-xs font-mono font-bold text-[#540B0E]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% FIRST-PARTY ENGINE</span>
          </div>
        </div>

        {/* ── BENTO GRID OF ACTUAL BUILT FEATURES ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">

          {/* ── CARD 1: LIVE BIO PAGE CANVAS & THEME LABORATORY (Col 7) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-7 rounded-[36px] p-7 sm:p-9 bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(84,11,14,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] relative overflow-hidden flex flex-col justify-between space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#E09F3E] uppercase tracking-wider block">
                  LUXURY DESIGN ENGINE
                </span>
                <h3 className="text-xl font-black text-[#540B0E]">Tactile Themes & Custom Styling</h3>
              </div>

              {/* Theme Picker Swatches */}
              <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#540B0E]/12 shadow-2xs self-start sm:self-auto">
                {PRESETS.map((p) => {
                  const isSelected = selectedTheme.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedTheme(p)}
                      className={`w-6 h-6 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'border-[#540B0E] ring-2 ring-[#540B0E]/20 scale-105'
                          : 'border-transparent opacity-65 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: p.dotColor }}
                      title={p.name}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Live Bio Page Container */}
            <div
              className="rounded-3xl p-5 border shadow-inner transition-colors duration-500 space-y-3.5"
              style={{
                backgroundColor: selectedTheme.bg,
                borderColor: 'rgba(84, 11, 14, 0.12)',
                color: selectedTheme.ink,
              }}
            >
              {/* Profile Avatar & Header */}
              <div className="flex items-center gap-3.5 pb-1">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-md border border-white/20"
                  style={{
                    backgroundColor: selectedTheme.accent,
                    color: selectedTheme.accentText,
                  }}
                >
                  K
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-black tracking-tight">Kira Vance</h4>
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase"
                      style={{
                        backgroundColor: `${selectedTheme.accent}33`,
                        color: selectedTheme.accent,
                      }}
                    >
                      Pro
                    </span>
                  </div>
                  <p className="text-xs opacity-75 font-medium">Visual Director & Stylist • Paris</p>
                  <p className="text-[10px] font-mono opacity-60">lookup.bio/kiravance</p>
                </div>
              </div>

              {/* Sample Live Links */}
              <div className="space-y-2">
                <div
                  className="p-3 rounded-2xl flex items-center justify-between transition-colors shadow-2xs"
                  style={{
                    backgroundColor: selectedTheme.surface,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🎬</span>
                    <span className="text-xs font-bold">Autumn / Winter Campaign Film</span>
                  </div>
                  <HugeiconsIcon icon={SparklesIcon} size={13} style={{ color: selectedTheme.accent }} />
                </div>

                <div
                  className="p-3 rounded-2xl flex items-center justify-between transition-colors shadow-2xs"
                  style={{
                    backgroundColor: selectedTheme.surface,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">📸</span>
                    <span className="text-xs font-bold">2026 Editorial Monograph Archive</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60">35mm</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#766050] font-medium leading-relaxed">
              Fully customizable luxury presets, custom hex pickers, and glassmorphic button styles. No Linktree branding badge forced onto your page.
            </p>
          </motion.div>

          {/* ── CARD 2: LINK SCHEDULING (Col 5) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-5 rounded-[36px] p-7 sm:p-9 bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(84,11,14,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] relative overflow-hidden flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#E09F3E]/20 text-[#540B0E] border border-[#E09F3E]/40 flex items-center justify-center shadow-xs">
                  <HugeiconsIcon icon={Calendar01Icon} size={20} />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#E09F3E]/15 text-[#540B0E] font-mono text-[10px] font-black uppercase">
                  Flagship Feature
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#E09F3E] uppercase tracking-wider block">
                TIMED RELEASES
              </span>
              <h3 className="text-xl font-black text-[#540B0E]">Link Scheduling & Expiration</h3>
            </div>

            {/* Interactive Schedule Mockup */}
            <div className="p-4 rounded-3xl bg-[#FAF7EE] border border-[#540B0E]/10 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#540B0E]">Limited Drop Campaign</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Live Scheduled
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-[#540B0E]/8">
                  <span className="text-[#766050] block">Publish Start:</span>
                  <span className="font-bold text-[#540B0E]">Nov 10, 09:00 AM</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#540B0E]/8">
                  <span className="text-[#766050] block">Auto Expire:</span>
                  <span className="font-bold text-[#9E2A2B]">Nov 15, 11:59 PM</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#766050] font-medium leading-relaxed">
              Schedule links for album drops, limited merchandise runs, and tour dates. Links appear and vanish automatically without manual editing.
            </p>
          </motion.div>

          {/* ── CARD 3: VECTOR QR CODE STUDIO (Col 4) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-4 rounded-[36px] p-7 bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(84,11,14,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] relative overflow-hidden flex flex-col justify-between space-y-5"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#335C67]/15 text-[#335C67] border border-[#335C67]/30 flex items-center justify-center shadow-xs">
                <HugeiconsIcon icon={QrCodeIcon} size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#766050] uppercase tracking-wider block">
                  ZERO 3RD PARTY APIS
                </span>
                <h3 className="text-lg font-black text-[#540B0E]">Vector QR Studio</h3>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="p-4 rounded-2xl bg-[#FAF7EE] border border-[#540B0E]/10 flex flex-col items-center justify-center space-y-3">
              <div className="w-24 h-24 p-2 bg-white rounded-2xl border border-[#540B0E]/10 shadow-xs flex items-center justify-center">
                <HugeiconsIcon icon={QrCodeIcon} size={70} style={{ color: selectedQrColor }} />
              </div>

              {/* Swatch color selector */}
              <div className="flex items-center gap-2">
                {QR_SWATCHES.map((sw) => (
                  <button
                    key={sw.id}
                    type="button"
                    onClick={() => setSelectedQrColor(sw.hex)}
                    className={`w-5 h-5 rounded-lg border transition-all cursor-pointer ${
                      selectedQrColor === sw.hex
                        ? 'border-[#540B0E] ring-2 ring-[#540B0E]/30 scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: sw.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-[#540B0E] font-bold border-t border-[#540B0E]/8 pt-3">
              <span className="px-2 py-0.5 rounded bg-[#FAF7EE] border border-[#540B0E]/10">SVG Vector</span>
              <span className="px-2 py-0.5 rounded bg-[#FAF7EE] border border-[#540B0E]/10">1024px Print PNG</span>
            </div>
          </motion.div>

          {/* ── CARD 4: 100% FIRST-PARTY ANALYTICS (Col 4) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-4 rounded-[36px] p-7 bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(84,11,14,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] relative overflow-hidden flex flex-col justify-between space-y-5"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#540B0E]/10 text-[#540B0E] border border-[#540B0E]/20 flex items-center justify-center shadow-xs">
                <HugeiconsIcon icon={ChartHistogramIcon} size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#766050] uppercase tracking-wider block">
                  ZERO TRACKER COOKIES
                </span>
                <h3 className="text-lg font-black text-[#540B0E]">Performance Telemetry</h3>
              </div>
            </div>

            {/* Mini Sparkline Chart Mockup */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7EE] border border-[#540B0E]/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                <span className="text-[#E09F3E] flex items-center gap-1">
                  <HugeiconsIcon icon={EyeIcon} size={12} /> 14.8K Views
                </span>
                <span className="text-[#540B0E] flex items-center gap-1">
                  <HugeiconsIcon icon={CursorPointer01Icon} size={12} /> 4.2K Clicks
                </span>
              </div>

              {/* Sparkline Wave */}
              <div className="h-10 w-full flex items-end gap-1.5 pt-1">
                {[30, 45, 60, 40, 75, 90, 85, 95].map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md transition-all duration-300"
                    style={{
                      height: `${val}%`,
                      backgroundColor: i % 2 === 0 ? '#E09F3E' : '#540B0E',
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-[#766050] border-t border-[#540B0E]/8 pt-1.5">
                <span>🇺🇸 42%</span>
                <span>🇬🇧 28%</span>
                <span>🇩🇪 16%</span>
                <span>🇯🇵 14%</span>
              </div>
            </div>

            <p className="text-xs text-[#766050] font-medium leading-relaxed border-t border-[#540B0E]/8 pt-3">
              Daily trendline sparklines, device distribution, and country breakdown. Self-hosted in your database with no cookies.
            </p>
          </motion.div>

          {/* ── CARD 5: 0% AUDIENCE CAPTURE & SEO (Col 4) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-4 rounded-[36px] p-7 bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(84,11,14,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] relative overflow-hidden flex flex-col justify-between space-y-5"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#9E2A2B]/15 text-[#9E2A2B] border border-[#9E2A2B]/30 flex items-center justify-center shadow-xs">
                <HugeiconsIcon icon={Mail01Icon} size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#766050] uppercase tracking-wider block">
                  100% CREATOR OWNED
                </span>
                <h3 className="text-lg font-black text-[#540B0E]">Direct Fan Newsletter</h3>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7EE] border border-[#540B0E]/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-[#540B0E]">SUBSCRIBER VAULT</span>
                <span className="text-emerald-700">0% TAX</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#540B0E]/8 text-[11px] font-mono text-[#540B0E] flex items-center justify-between">
                <span>fan@domain.com</span>
                <span className="text-emerald-600 font-bold">✓ Saved</span>
              </div>
              <div className="text-[10px] text-[#766050] flex items-center justify-between">
                <span>Honeypot Spam Guard</span>
                <span className="font-bold text-[#540B0E]">CSV Export</span>
              </div>
            </div>

            <p className="text-xs text-[#766050] font-medium leading-relaxed border-t border-[#540B0E]/8 pt-3">
              Collect emails directly on your bio page with honeypot bot defense. Export your subscriber list in one click anytime.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

