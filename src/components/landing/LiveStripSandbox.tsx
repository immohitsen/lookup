'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowUpRight01Icon,
  SparklesIcon,
  Mail01Icon,
  QrCodeIcon,
  Tick01Icon,
  Layers01Icon,
  DashboardSquare01Icon,
  PaintBoardIcon,
} from '@hugeicons/core-free-icons';

type ViewMode = 'stack' | 'bento' | 'editorial';

interface SandboxTheme {
  id: string;
  name: string;
  dotColor: string;
  heroCardBg: string;
  heroCardText: string;
  heroAccent: string;
  heroAccentText: string;
  newsletterBg: string;
}

const SANDBOX_THEMES: SandboxTheme[] = [
  {
    id: 'bordeaux',
    name: 'Bordeaux & Linen (Original Haute)',
    dotColor: '#540B0E',
    heroCardBg: '#140305',
    heroCardText: '#FFF3B0',
    heroAccent: '#E09F3E',
    heroAccentText: '#230E01',
    newsletterBg: '#540B0E',
  },
  {
    id: 'noir',
    name: 'Noir Velvet & Gold',
    dotColor: '#121212',
    heroCardBg: '#09090b',
    heroCardText: '#FAFAFA',
    heroAccent: '#E09F3E',
    heroAccentText: '#09090b',
    newsletterBg: '#18181b',
  },
  {
    id: 'emerald',
    name: 'Forest Emerald Atelier',
    dotColor: '#1B4332',
    heroCardBg: '#081C15',
    heroCardText: '#D8F3DC',
    heroAccent: '#52B788',
    heroAccentText: '#081C15',
    newsletterBg: '#1B4332',
  },
  {
    id: 'terracotta',
    name: 'Crimson Terracotta',
    dotColor: '#9E2A2B',
    heroCardBg: '#2E0809',
    heroCardText: '#FFF3B0',
    heroAccent: '#E09F3E',
    heroAccentText: '#230E01',
    newsletterBg: '#9E2A2B',
  },
];

export function LiveStripSandbox() {
  const [viewMode, setViewMode] = useState<ViewMode>('stack');
  const [themeId, setThemeId] = useState<string>('bordeaux');
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioProgress, setAudioProgress] = useState(42);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const stripRef = useRef<HTMLDivElement>(null);
  const activeTheme = SANDBOX_THEMES.find((t) => t.id === themeId) ?? SANDBOX_THEMES[0];

  const MODES: { id: ViewMode; label: string; icon: typeof DashboardSquare01Icon }[] = [
    { id: 'stack', label: 'Classic Strip', icon: Layers01Icon },
    { id: 'bento', label: 'Bento Grid', icon: DashboardSquare01Icon },
    { id: 'editorial', label: 'Editorial', icon: SparklesIcon },
  ];

  // Simulating music progress ticking when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 0.8));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  function scrollStrip(direction: 'left' | 'right') {
    if (viewMode === 'stack') {
      if (!stripRef.current) return;
      const amount = direction === 'left' ? -360 : 360;
      stripRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    } else {
      const currentIndex = MODES.findIndex((m) => m.id === viewMode);
      if (direction === 'left') {
        const prevIndex = (currentIndex - 1 + MODES.length) % MODES.length;
        setViewMode(MODES[prevIndex].id);
      } else {
        const nextIndex = (currentIndex + 1) % MODES.length;
        setViewMode(MODES[nextIndex].id);
      }
    }
  }

  function handleDemoEmail(e: React.FormEvent) {
    e.preventDefault();
    if (emailInput.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmailInput('');
      }, 4000);
    }
  }

  return (
    <section id="sandbox" className="py-20 sm:py-28 bg-[#FAF7EE] border-b border-[#540B0E]/10 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header + Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-3 border-b border-[#540B0E]/10 text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#E09F3E] flex items-center gap-1.5">
              <HugeiconsIcon icon={SparklesIcon} size={14} />
              // 01 INTERACTIVE SANDBOX • POWERED BY MOTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#540B0E] tracking-tight">
              {viewMode === 'stack' && 'See the horizontal strip in action.'}
              {viewMode === 'bento' && 'See the Bento Grid in action.'}
              {viewMode === 'editorial' && 'See Haute Editorial in action.'}
            </h2>
            <p className="text-sm sm:text-base text-[#766050] font-medium leading-relaxed">
              {viewMode === 'stack' && 'Every block stays full-fidelity on an interactive spatial strip. Scroll or drag along the strip, inspect audio playback, and test fan email capture.'}
              {viewMode === 'bento' && 'Organize your work into an editorial spatial mosaic. Dominant media tiles command focus while secondary widgets stay neatly grouped.'}
              {viewMode === 'editorial' && 'A numbered magazine publication index with gold accents. Tailored for directors, photographers, stylists, and authors.'}
            </p>
          </div>

          {/* Interactive Controls (Architecture Mode + Live Theme Swatches + Arrows) */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            
            {/* Live Theme Color Swatcher */}
            <div className="flex items-center gap-1.5 bg-white border border-[#540B0E]/12 p-1.5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-mono font-bold text-[#766050] pl-1 pr-1 hidden sm:inline flex items-center gap-1">
                <HugeiconsIcon icon={PaintBoardIcon} size={12} />
                <span>Theme:</span>
              </span>
              <div className="flex items-center gap-1">
                {SANDBOX_THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeId(t.id)}
                    className={`relative w-6 h-6 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                      themeId === t.id
                        ? 'ring-2 ring-[#540B0E] scale-105 shadow-2xs'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: t.dotColor }}
                    title={t.name}
                  >
                    {themeId === t.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Architecture Mode Selector with Motion Spring Pill */}
            <LayoutGroup id="sandbox-mode-tabs">
              <div className="flex items-center bg-white border border-[#540B0E]/12 p-1 rounded-2xl shadow-xs relative">
                {MODES.map((m) => {
                  const isActive = viewMode === m.id;
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setViewMode(m.id)}
                      className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        isActive ? 'text-[#230E01]' : 'text-[#766050] hover:text-[#540B0E]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sandbox-tab-indicator"
                          className="absolute inset-0 bg-[#E09F3E] rounded-xl shadow-xs -z-10"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <HugeiconsIcon icon={Icon} size={13} />
                      <span className="whitespace-nowrap">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Left/Right Navigation Arrows */}
            <div className="flex items-center gap-1">
              <motion.button
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => scrollStrip('left')}
                className="w-9 h-9 rounded-xl bg-white border border-[#540B0E]/12 flex items-center justify-center text-[#540B0E] hover:bg-[#FAF7EE] hover:border-[#E09F3E] shadow-xs cursor-pointer font-bold transition-colors"
                aria-label={viewMode === 'stack' ? 'Scroll left' : 'Previous layout'}
                title={viewMode === 'stack' ? 'Scroll left' : 'Previous layout'}
              >
                ←
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => scrollStrip('right')}
                className="w-9 h-9 rounded-xl bg-white border border-[#540B0E]/12 flex items-center justify-center text-[#540B0E] hover:bg-[#FAF7EE] hover:border-[#E09F3E] shadow-xs cursor-pointer font-bold transition-colors"
                aria-label={viewMode === 'stack' ? 'Scroll right' : 'Next layout'}
                title={viewMode === 'stack' ? 'Scroll right' : 'Next layout'}
              >
                →
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── MOTION ANIMATED VIEWPORT WRAPPER ── */}
        <AnimatePresence mode="wait">
          
          {/* ── MODE 1: CLASSIC HORIZONTAL STRIP ── */}
          {viewMode === 'stack' && (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="space-y-4"
            >
              <div
                ref={stripRef}
                className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth select-none scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
              >
                {/* CARD 1: IDENTITY */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-[290px] sm:w-[330px] flex-shrink-0 rounded-[32px] p-5 border-2 shadow-lg flex flex-col justify-between space-y-4 snap-start transition-colors duration-500"
                  style={{
                    backgroundColor: activeTheme.heroCardBg,
                    color: activeTheme.heroCardText,
                    borderColor: 'rgba(84, 11, 14, 0.12)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                      PARIS • 02:45 AM
                    </span>
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                      style={{
                        backgroundColor: activeTheme.heroAccent,
                        color: activeTheme.heroAccentText,
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2 py-3">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg border-2 border-white/20"
                      style={{
                        backgroundColor: activeTheme.heroAccent,
                        color: activeTheme.heroAccentText,
                      }}
                    >
                      K
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight">{activeTheme.name.split(' ')[0]} • Kira</h3>
                      <p className="text-xs opacity-75 font-medium">Visual Director & Stylist</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10 text-center text-xs font-mono font-bold">
                    lookup.bio/kiravance
                  </div>
                </motion.div>

                {/* CARD 2: AUDIO WIDGET WITH INTERACTIVE SOUNDWAVE */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-[300px] sm:w-[340px] flex-shrink-0 rounded-[32px] p-5 bg-white border border-[#540B0E]/12 shadow-lg flex flex-col justify-between space-y-4 snap-start"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#766050]">
                    <span className="flex items-center gap-1.5 text-[#540B0E]">
                      <span className="w-2 h-2 rounded-full bg-[#E09F3E] animate-pulse" />
                      NOW STREAMING
                    </span>
                    <span>SPOTIFY // 320 KBPS</span>
                  </div>
                  <div className="space-y-3 py-1">
                    <div className="w-full h-32 rounded-2xl bg-gradient-to-tr from-[#540B0E] via-[#335C67] to-[#E09F3E] p-4 flex flex-col justify-between text-white shadow-inner relative overflow-hidden">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-85">Studio Cassette 04</span>
                      <div>
                        <h4 className="text-sm font-black truncate">Midnight in Montmartre</h4>
                        <p className="text-[11px] opacity-80">Lo-Fi Edit • 03:24</p>
                      </div>
                    </div>

                    {/* Interactive Equalizer + Play/Pause */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        {/* Motion Dynamic Soundwave Bars */}
                        <div className="flex items-end gap-1.5 h-6">
                          {[14, 22, 12, 24, 18, 10, 20].map((h, i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 rounded-full"
                              style={{
                                backgroundColor: i % 2 === 0 ? activeTheme.heroAccent : '#540B0E',
                              }}
                              animate={
                                isPlaying
                                  ? {
                                      height: [4, h, 6, h * 0.75, 4],
                                      transition: {
                                        duration: 0.8 + (i % 3) * 0.2,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        ease: 'easeInOut',
                                        delay: i * 0.07,
                                      },
                                    }
                                  : { height: 4 }
                              }
                            />
                          ))}
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.94 }}
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="px-3.5 py-1.5 rounded-full bg-[#FAF7EE] border border-[#540B0E]/15 text-xs font-bold text-[#540B0E] hover:bg-[#E09F3E] hover:text-[#230E01] transition-colors cursor-pointer shadow-2xs"
                        >
                          {isPlaying ? 'Pause ⏸' : 'Play ▶'}
                        </motion.button>
                      </div>

                      {/* Interactive Scrubber Bar */}
                      <div
                        className="h-1.5 w-full bg-[#FAF7EE] rounded-full overflow-hidden border border-[#540B0E]/10 cursor-pointer"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          setAudioProgress((clickX / rect.width) * 100);
                        }}
                      >
                        <motion.div
                          className="h-full bg-[#E09F3E] rounded-full"
                          style={{ width: `${audioProgress}%` }}
                          transition={{ ease: 'linear' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-[#766050] flex items-center justify-between border-t border-[#540B0E]/8 pt-2">
                    <span>Dynamic Audio Widget</span>
                    <span className="text-emerald-700 font-bold">Live Stream</span>
                  </div>
                </motion.div>

                {/* CARD 3: LOOKBOOK HERO */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-[300px] sm:w-[340px] flex-shrink-0 rounded-[32px] p-5 bg-white border border-[#540B0E]/12 shadow-lg flex flex-col justify-between space-y-4 snap-start group cursor-pointer hover:border-[#E09F3E] transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#766050]">
                    <span className="text-[#E09F3E] uppercase font-black tracking-wider">// FEATURED LAUNCH</span>
                    <span className="text-[#540B0E]">24.8K VIEWS</span>
                  </div>
                  <div className="space-y-2 py-1">
                    <div className="w-full h-32 rounded-2xl bg-[#540B0E] overflow-hidden relative shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                        alt="Campaign"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                        <span className="text-xs font-black text-[#FFF3B0]">Autumn / Winter Campaign Film</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-[#540B0E]">Watch 4K Cut (12 Mins)</span>
                      <div className="w-7 h-7 rounded-full bg-[#FAF7EE] flex items-center justify-center text-[#540B0E] group-hover:bg-[#E09F3E] group-hover:text-[#230E01] transition-all">
                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-[#766050] flex items-center justify-between border-t border-[#540B0E]/8 pt-2">
                    <span>Full-Fidelity Embed</span>
                    <span className="text-[#540B0E] font-bold">4K Cinema</span>
                  </div>
                </motion.div>

                {/* CARD 4: FAN CAPTURE */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-[300px] sm:w-[340px] flex-shrink-0 rounded-[32px] p-5 text-[#FFF3B0] border border-[#E09F3E]/30 shadow-lg flex flex-col justify-between space-y-4 snap-start transition-colors duration-500"
                  style={{ backgroundColor: activeTheme.newsletterBg }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold flex items-center gap-1.5 text-[#FFF3B0]">
                      <HugeiconsIcon icon={Mail01Icon} size={15} className="text-[#E09F3E]" />
                      Direct Email Newsletter
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: activeTheme.heroAccent,
                        color: activeTheme.heroAccentText,
                      }}
                    >
                      0% FEES
                    </span>
                  </div>
                  <div className="space-y-2 py-1">
                    <p className="text-xs text-[#FFF3B0]/80 leading-relaxed">
                      Fans sign up on your strip with honeypot spam guard. Export clean CSV lists anytime.
                    </p>
                    <AnimatePresence mode="wait">
                      {subscribed ? (
                        <motion.div
                          key="subscribed"
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.85, opacity: 0 }}
                          className="py-2 text-center text-xs font-bold text-[#E09F3E] flex items-center justify-center gap-1.5"
                        >
                          <HugeiconsIcon icon={Tick01Icon} size={15} />
                          <span>Subscribed! Clean CSV unlocked.</span>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleDemoEmail}
                          className="flex gap-2 pt-1"
                        >
                          <input
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="Enter fan email..."
                            required
                            className="flex-1 px-3 py-2 text-xs rounded-xl bg-black/25 border border-[#E09F3E]/30 text-[#FFF3B0] placeholder:text-[#FFF3B0]/40 focus:outline-none focus:border-[#E09F3E] font-medium"
                          />
                          <motion.button
                            whileTap={{ scale: 0.94 }}
                            type="submit"
                            className="px-3.5 py-2 rounded-xl font-bold text-xs transition-transform cursor-pointer flex-shrink-0 shadow-xs"
                            style={{
                              backgroundColor: activeTheme.heroAccent,
                              color: activeTheme.heroAccentText,
                            }}
                          >
                            Join
                          </motion.button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="text-[10px] font-mono text-[#FFF3B0]/60 flex items-center justify-between border-t border-white/10 pt-2">
                    <span>Direct Fan List</span>
                    <span className="text-[#E09F3E] font-bold">100% Yours</span>
                  </div>
                </motion.div>

                {/* CARD 5: DYNAMIC QR */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-[280px] sm:w-[310px] flex-shrink-0 rounded-[32px] p-5 bg-white border border-[#540B0E]/12 shadow-lg flex flex-col justify-between space-y-4 snap-start"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#766050]">
                    <span>VECTOR QR CODE</span>
                    <span className="text-emerald-700 font-bold">SVG + PNG</span>
                  </div>
                  <div className="flex flex-col items-center justify-center py-2 space-y-2">
                    <div className="w-20 h-20 p-2 rounded-2xl border-2 border-[#540B0E]/15 bg-[#FAF7EE] flex items-center justify-center shadow-xs">
                      <HugeiconsIcon icon={QrCodeIcon} size={54} className="text-[#540B0E]" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#540B0E]">Scan to open bio</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#766050] flex items-center justify-between border-t border-[#540B0E]/8 pt-2">
                    <span>Merchandise & Posters</span>
                    <span className="text-emerald-700 font-bold">Vector Export</span>
                  </div>
                </motion.div>
              </div>

              {/* Pro Tip */}
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#766050] pt-1">
                <kbd className="px-2 py-0.5 rounded-md bg-white border border-[#540B0E]/15 text-[#540B0E] font-bold shadow-2xs">
                  Scroll or swipe
                </kbd>
                <span>to move along the horizontal spatial strip</span>
              </div>
            </motion.div>
          )}

          {/* ── MODE 2: BENTO GRID ARCHITECTURE ── */}
          {viewMode === 'bento' && (
            <motion.div
              key="bento"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2 text-left"
            >
              {/* Bento Hero Tile: Lookbook Film (Dominant Left/Top 7 Cols) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="md:col-span-7 rounded-[32px] p-6 sm:p-7 bg-white border-2 border-[#540B0E]/12 shadow-md flex flex-col justify-between space-y-4 group hover:border-[#E09F3E] transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#766050]">
                  <span className="text-[#E09F3E] uppercase font-black tracking-wider flex items-center gap-1.5">
                    <HugeiconsIcon icon={SparklesIcon} size={14} />
                    // 01 HERO SHOWCASE
                  </span>
                  <span className="text-[#540B0E]">4K CINEMA • 24.8K VIEWS</span>
                </div>
                <div className="w-full h-56 sm:h-64 rounded-2xl bg-[#140305] overflow-hidden relative shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                    alt="Campaign Film"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-xs font-mono text-[#E09F3E] font-bold uppercase tracking-wider">Featured Campaign</span>
                    <h4 className="text-xl sm:text-2xl font-black text-[#FFF3B0] tracking-tight">Autumn / Winter Campaign Film</h4>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold text-[#540B0E]">Watch Complete Cut (12 Mins)</span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF7EE] flex items-center justify-center text-[#540B0E] group-hover:bg-[#E09F3E] group-hover:text-[#230E01] transition-all">
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
                  </div>
                </div>
              </motion.div>

              {/* Bento Side Column: Identity & Audio (5 Cols) */}
              <div className="md:col-span-5 flex flex-col gap-5">
                {/* Identity Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="rounded-[32px] p-6 text-[#FFF3B0] border shadow-md flex items-center justify-between gap-4 transition-colors duration-500"
                  style={{
                    backgroundColor: activeTheme.heroCardBg,
                    borderColor: 'rgba(84,11,14,0.12)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl text-2xl font-black flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{
                      backgroundColor: activeTheme.heroAccent,
                      color: activeTheme.heroAccentText,
                    }}
                  >
                    K
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color: activeTheme.heroAccent }}>
                      <span>PARIS • 02:45 AM</span>
                      <span>✓</span>
                    </div>
                    <h3 className="text-lg font-black truncate">{activeTheme.name.split(' ')[0]} • Kira</h3>
                    <p className="text-xs opacity-75 truncate">Visual Director & Stylist</p>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                    lookup.bio
                  </span>
                </motion.div>

                {/* Audio Player Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="rounded-[32px] p-6 bg-white border border-[#540B0E]/12 shadow-md flex-1 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#766050]">
                    <span className="text-[#540B0E] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E09F3E] animate-pulse" />
                      NOW STREAMING
                    </span>
                    <span>SPOTIFY // 320 KBPS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#540B0E] via-[#335C67] to-[#E09F3E] flex items-center justify-center text-white text-xs font-mono font-black shadow-inner flex-shrink-0">
                      TAPES
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-sm font-black text-[#540B0E] truncate">Midnight in Montmartre</h5>
                      <p className="text-xs text-[#766050]">Lo-Fi Edit • 03:24</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3 py-1.5 rounded-full bg-[#FAF7EE] border border-[#540B0E]/15 text-xs font-bold text-[#540B0E] hover:bg-[#E09F3E] hover:text-[#230E01] transition-all cursor-pointer shadow-2xs flex-shrink-0"
                    >
                      {isPlaying ? 'Pause ⏸' : 'Play ▶'}
                    </motion.button>
                  </div>
                  <div className="flex items-end gap-1.5 h-4 pt-1">
                    {[14, 22, 12, 24, 18].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 rounded-full"
                        style={{
                          backgroundColor: i % 2 === 0 ? activeTheme.heroAccent : '#540B0E',
                        }}
                        animate={
                          isPlaying
                            ? {
                                height: [4, h * 0.7, 5, h * 0.5, 4],
                                transition: {
                                  duration: 0.8 + (i % 3) * 0.2,
                                  repeat: Infinity,
                                  repeatType: 'reverse',
                                  ease: 'easeInOut',
                                  delay: i * 0.08,
                                },
                              }
                            : { height: 4 }
                        }
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Bento Bottom Row: Fan Capture (7 Cols) & Dynamic QR (5 Cols) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="md:col-span-7 rounded-[32px] p-6 sm:p-7 text-[#FFF3B0] border shadow-md flex flex-col justify-between space-y-3 transition-colors duration-500"
                style={{ backgroundColor: activeTheme.newsletterBg, borderColor: 'rgba(224,159,62,0.3)' }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-1.5 text-[#FFF3B0]">
                    <HugeiconsIcon icon={Mail01Icon} size={15} className="text-[#E09F3E]" />
                    Direct Fan Newsletter Capture
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: activeTheme.heroAccent,
                      color: activeTheme.heroAccentText,
                    }}
                  >
                    0% COMMISSIONS
                  </span>
                </div>
                <p className="text-xs text-[#FFF3B0]/80">
                  Collect subscribers straight into your database with zero platform cuts. Export clean CSV lists anytime.
                </p>
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="bento-sub"
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="py-2 text-center text-xs font-bold text-[#E09F3E] flex items-center justify-center gap-1.5"
                    >
                      <HugeiconsIcon icon={Tick01Icon} size={15} />
                      <span>Subscribed! Clean CSV unlocked.</span>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleDemoEmail} className="flex gap-2">
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter fan email..."
                        required
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-black/25 border border-[#E09F3E]/30 text-[#FFF3B0] placeholder:text-[#FFF3B0]/40 focus:outline-none focus:border-[#E09F3E] font-medium"
                      />
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        type="submit"
                        className="px-4 py-2 rounded-xl font-bold text-xs transition-transform cursor-pointer shadow-xs"
                        style={{
                          backgroundColor: activeTheme.heroAccent,
                          color: activeTheme.heroAccentText,
                        }}
                      >
                        Subscribe Free
                      </motion.button>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="md:col-span-5 rounded-[32px] p-6 bg-white border border-[#540B0E]/12 shadow-md flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#766050] font-bold uppercase tracking-wider block">DYNAMIC QR STUDIO</span>
                  <h4 className="text-base font-black text-[#540B0E]">Vector Print Ready</h4>
                  <p className="text-xs text-[#766050]">SVG & high-res PNG downloads for posters</p>
                </div>
                <div className="w-16 h-16 p-2 rounded-2xl border-2 border-[#540B0E]/15 bg-[#FAF7EE] flex items-center justify-center shadow-xs flex-shrink-0">
                  <HugeiconsIcon icon={QrCodeIcon} size={42} className="text-[#540B0E]" />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── MODE 3: HAUTE EDITORIAL PUBLICATION INDEX ── */}
          {viewMode === 'editorial' && (
            <motion.div
              key="editorial"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="rounded-[32px] bg-white border-2 border-[#540B0E]/12 p-6 sm:p-8 shadow-lg space-y-4 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#540B0E]/10 text-xs font-mono font-bold text-[#766050]">
                <span>MAGAZINE PUBLICATION INDEX</span>
                <span className="text-[#E09F3E]">HAUTE EDITORIAL // 5 ENTRIES</span>
              </div>

              {/* Editorial Rows with Motion Hover */}
              <div className="divide-y divide-[#540B0E]/10">
                {/* Row 01 */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-black text-[#E09F3E]">01 //</span>
                    <div>
                      <h4 className="text-base font-black text-[#540B0E] group-hover:text-[#E09F3E] transition-colors">
                        Kira Vance — Visual Director & Stylist
                      </h4>
                      <p className="text-xs text-[#766050]">Paris • Available for 2026 Creative Commissions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7EE] border border-[#540B0E]/10 text-[10px] font-mono font-bold text-[#540B0E]">
                      lookup.bio/kiravance
                    </span>
                  </div>
                </motion.div>

                {/* Row 02 */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-black text-[#E09F3E]">02 //</span>
                    <div>
                      <h4 className="text-base font-black text-[#540B0E] group-hover:text-[#E09F3E] transition-colors">
                        Autumn / Winter Campaign Film (Watch 4K Cut)
                      </h4>
                      <p className="text-xs text-[#766050]">Cinema Release • 24.8K Views • Directed by Kira Vance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                      4K STREAM
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#FAF7EE] flex items-center justify-center text-[#540B0E] group-hover:bg-[#E09F3E] group-hover:text-[#230E01] transition-all">
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                    </div>
                  </div>
                </motion.div>

                {/* Row 03 */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-black text-[#E09F3E]">03 //</span>
                    <div>
                      <h4 className="text-base font-black text-[#540B0E] group-hover:text-[#E09F3E] transition-colors">
                        Studio Cassette 04: Midnight in Montmartre
                      </h4>
                      <p className="text-xs text-[#766050]">Spotify Embed // 320 KBPS • Lo-Fi Edit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <div className="flex items-end gap-1 h-4">
                      {[12, 18, 14].map((h, i) => (
                        <motion.span
                          key={i}
                          className="w-1 rounded-full"
                          style={{ backgroundColor: i % 2 === 0 ? activeTheme.heroAccent : '#540B0E' }}
                          animate={
                            isPlaying
                              ? {
                                  height: [3, h * 0.7, 4, h * 0.5, 3],
                                  transition: {
                                    duration: 0.7 + i * 0.15,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                  },
                                }
                              : { height: 3 }
                          }
                        />
                      ))}
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3 py-1 rounded-full bg-[#FAF7EE] border border-[#540B0E]/15 text-xs font-bold text-[#540B0E] hover:bg-[#E09F3E] hover:text-[#230E01] transition-all cursor-pointer shadow-2xs"
                    >
                      {isPlaying ? 'Pause ⏸' : 'Play ▶'}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Row 04 */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-black text-[#E09F3E]">04 //</span>
                    <div>
                      <h4 className="text-base font-black text-[#540B0E] group-hover:text-[#E09F3E] transition-colors">
                        The Weekly Studio Brief (Email Newsletter)
                      </h4>
                      <p className="text-xs text-[#766050]">Direct fan capture • 0% Middleman cuts • Clean CSV export</p>
                    </div>
                  </div>
                  <div className="self-start sm:self-auto">
                    {subscribed ? (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <HugeiconsIcon icon={Tick01Icon} size={14} /> Subscribed!
                      </span>
                    ) : (
                      <form onSubmit={handleDemoEmail} className="flex gap-1.5">
                        <input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="px-2.5 py-1 text-xs rounded-lg bg-[#FAF7EE] border border-[#540B0E]/15 text-[#540B0E] focus:outline-none focus:border-[#E09F3E] w-36"
                        />
                        <motion.button
                          whileTap={{ scale: 0.94 }}
                          type="submit"
                          className="px-2.5 py-1 rounded-lg bg-[#540B0E] text-[#FFF3B0] font-bold text-xs hover:bg-[#E09F3E] hover:text-[#230E01] transition-all cursor-pointer"
                        >
                          Join
                        </motion.button>
                      </form>
                    )}
                  </div>
                </motion.div>

                {/* Row 05 */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-black text-[#E09F3E]">05 //</span>
                    <div>
                      <h4 className="text-base font-black text-[#540B0E] group-hover:text-[#E09F3E] transition-colors">
                        Vector QR Studio — Merch & Exhibition Flyers
                      </h4>
                      <p className="text-xs text-[#766050]">Infinite-resolution vector SVG and high-res print PNG</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7EE] border border-[#540B0E]/10 text-[10px] font-mono font-bold text-[#540B0E]">
                      SVG + PNG
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-[#FAF7EE] border border-[#540B0E]/12 flex items-center justify-center text-[#540B0E]">
                      <HugeiconsIcon icon={QrCodeIcon} size={16} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}
