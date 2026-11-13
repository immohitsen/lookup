'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SparklesIcon,
  FlashIcon,
  Shield01Icon,
  QrCodeIcon,
  Globe02Icon,
  Tick01Icon,
  ArrowUpRight01Icon,
  Layers01Icon,
} from '@hugeicons/core-free-icons';

interface EdgeNode {
  city: string;
  country: string;
  flag: string;
  ping: number;
  status: string;
}

const EDGE_NODES: EdgeNode[] = [
  { city: 'Zurich', country: 'Switzerland', flag: '🇨🇭', ping: 9, status: 'Optimal' },
  { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', ping: 18, status: 'Active' },
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧', ping: 12, status: 'Optimal' },
  { city: 'New York', country: 'United States', flag: '🇺🇸', ping: 14, status: 'Active' },
];

export function AppleGlassShowcase() {
  const [selectedNode, setSelectedNode] = useState<EdgeNode>(EDGE_NODES[0]);
  const [activeCapsule, setActiveCapsule] = useState<'stream' | 'metrics' | 'vault'>('stream');
  const [isCopied, setIsCopied] = useState(false);

  function handleSimulateCopy() {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  }

  return (
    <section id="architecture" className="py-24 sm:py-32 bg-[#FAF7EE] border-b border-[#540B0E]/10 relative overflow-hidden select-none">
      
      {/* Background Soft Refractive Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#E09F3E]/12 via-[#540B0E]/8 to-[#335C67]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-[#E09F3E]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header: Apple Precision Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#540B0E]/10 text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#E09F3E] flex items-center gap-1.5">
              <HugeiconsIcon icon={SparklesIcon} size={14} />
              // 03 HAUTE ARCHITECTURE • PRECISION SYSTEM
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#540B0E] tracking-tight leading-[1.1]">
              Engineered like an operating system. <br className="hidden sm:block" />
              Zero clutter, zero latency.
            </h2>
            <p className="text-sm sm:text-base text-[#766050] font-medium leading-relaxed">
              Every detail is meticulously crafted with optical frosted glass, hardware-accelerated edge routing, and cryptographic data sovereignty.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs text-xs font-mono font-bold text-[#540B0E]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>310 GLOBAL EDGE NODES ONLINE</span>
          </div>
        </div>

        {/* ── APPLE-GRADE GLASS BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">

          {/* ── CARD 1: GLOBAL EDGE SPEED ENGINE (Col 7) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-7 rounded-[36px] p-7 sm:p-9 bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(84,11,14,0.05),0_1px_1px_rgba(255,255,255,0.9)_inset] relative overflow-hidden flex flex-col justify-between space-y-6 group"
          >
            {/* Specular Rim Light */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#540B0E] text-[#FFF3B0] flex items-center justify-center shadow-xs">
                  <HugeiconsIcon icon={FlashIcon} size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#766050] uppercase tracking-wider block">
                    GLOBAL SUB-SECOND LATENCY
                  </span>
                  <h3 className="text-lg font-black text-[#540B0E]">Distributed Edge Pipeline</h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#E09F3E]/15 text-[#540B0E] font-mono text-xs font-black border border-[#E09F3E]/30 shadow-2xs">
                0.78s FCP
              </span>
            </div>

            {/* Live Interactive Node Latency Meter */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-[#540B0E]/8 shadow-inner space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#766050] border-b border-[#540B0E]/8 pb-2">
                <span>INTERACTIVE REGIONAL POPPING</span>
                <span className="text-emerald-700 font-bold">{selectedNode.ping}ms ROUND TRIP</span>
              </div>

              {/* Edge Node Selection Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {EDGE_NODES.map((node) => {
                  const isSelected = selectedNode.city === node.city;
                  return (
                    <button
                      key={node.city}
                      type="button"
                      onClick={() => setSelectedNode(node)}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#540B0E] text-[#FFF3B0] border-[#540B0E] shadow-sm scale-[1.02]'
                          : 'bg-white/80 hover:bg-white text-[#540B0E] border-[#540B0E]/10'
                      }`}
                    >
                      <div className="flex items-center justify-between text-base mb-1">
                        <span>{node.flag}</span>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                            isSelected ? 'bg-[#E09F3E] text-[#230E01]' : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {node.ping}ms
                        </span>
                      </div>
                      <div className="text-xs font-black truncate">{node.city}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-[#FFF3B0]/70' : 'text-[#766050]'}`}>
                        {node.country}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-[#766050] leading-relaxed font-medium">
              Zero client hydration pauses. Every visitor is routed to the geographically closest edge cache across 310 data centers, ensuring your bio portfolio unrolls instantly.
            </p>
          </motion.div>

          {/* ── CARD 2: VISIONOS GLASS WINDOW STRIP (Col 5) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-5 rounded-[36px] p-7 sm:p-9 bg-[#150406]/90 backdrop-blur-2xl border border-white/15 text-[#FFF3B0] shadow-[0_20px_50px_rgba(84,11,14,0.15),0_1px_1px_rgba(255,255,255,0.15)_inset] relative overflow-hidden flex flex-col justify-between space-y-6"
          >
            {/* Specular Top Rim */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white/15 text-[#FFF3B0] flex items-center justify-center border border-white/20">
                  <HugeiconsIcon icon={Layers01Icon} size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#E09F3E] uppercase tracking-wider block">
                    OPTICAL DEPTH
                  </span>
                  <h3 className="text-lg font-black text-white">Spatial Refraction Glass</h3>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E09F3E] animate-ping" />
            </div>

            {/* VisionOS Translucent Layer Stack Mockup */}
            <div className="relative py-4 flex items-center justify-center">
              {/* Layer 1: Backing Sheet */}
              <div className="absolute w-[86%] h-24 rounded-2xl bg-white/5 border border-white/10 -top-1 blur-[0.5px] -rotate-3" />
              {/* Layer 2: Middle Acrylic Glass Card */}
              <div className="relative w-full rounded-2xl p-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#FFF3B0]/70">
                  <span>VISIONOS // GLASS 3.0</span>
                  <span className="text-[#E09F3E] font-bold">120 FPS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E09F3E] text-[#230E01] font-black flex items-center justify-center text-sm shadow-md">
                    K
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-black text-white truncate">Kira Vance • Studio</h5>
                    <p className="text-[10px] text-[#FFF3B0]/75">Refractive Acrylic Bevel</p>
                  </div>
                  <div className="px-2 py-1 rounded-lg bg-white/15 text-[10px] font-mono text-[#FFF3B0] border border-white/20">
                    Active
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#FFF3B0]/70 leading-relaxed font-medium">
              Multi-layer visual refraction with dynamic specular highlights and adaptive background blurring tuned for high-DPI displays.
            </p>
          </motion.div>

          {/* ── CARD 3: AUDIENCE VAULT & ZERO TAX (Col 4) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-4 rounded-[36px] p-7 bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(84,11,14,0.05),0_1px_1px_rgba(255,255,255,0.9)_inset] relative overflow-hidden flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E09F3E]/20 text-[#540B0E] border border-[#E09F3E]/40 flex items-center justify-center shadow-xs">
                <HugeiconsIcon icon={Shield01Icon} size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#766050] uppercase tracking-wider block">
                  DATA SOVEREIGNTY
                </span>
                <h3 className="text-lg font-black text-[#540B0E]">First-Party Vault</h3>
              </div>
              <div className="pt-2">
                <div className="text-4xl sm:text-5xl font-black text-[#540B0E] tracking-tight font-serif">
                  0%
                </div>
                <span className="text-xs font-bold text-[#E09F3E] uppercase tracking-wider">
                  Platform Commission
                </span>
              </div>
            </div>

            <ul className="space-y-2 text-xs font-medium text-[#766050] border-t border-[#540B0E]/8 pt-4">
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-700 flex-shrink-0" />
                <span>Zero telemetry tracker scripts</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-700 flex-shrink-0" />
                <span>No cookie consent banners needed</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-700 flex-shrink-0" />
                <span>One-click instant CSV audience export</span>
              </li>
            </ul>
          </motion.div>

          {/* ── CARD 4: PHYSICAL VECTOR QR FOUNDRY (Col 4) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-4 rounded-[36px] p-7 bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(84,11,14,0.05),0_1px_1px_rgba(255,255,255,0.9)_inset] relative overflow-hidden flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#335C67]/15 text-[#335C67] border border-[#335C67]/30 flex items-center justify-center shadow-xs">
                <HugeiconsIcon icon={QrCodeIcon} size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#766050] uppercase tracking-wider block">
                  PHYSICAL FOUNDRY
                </span>
                <h3 className="text-lg font-black text-[#540B0E]">Vector Print Studio</h3>
              </div>
            </div>

            {/* Tactile Frosted Card Pass with Gold Etched QR */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF7EE] to-white border border-[#540B0E]/12 shadow-sm flex items-center justify-between gap-3">
              <div className="w-16 h-16 p-2 rounded-xl bg-white border border-[#540B0E]/10 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <HugeiconsIcon icon={QrCodeIcon} size={42} className="text-[#540B0E]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono font-bold text-[#E09F3E]">1024PX // SVG</div>
                <div className="text-xs font-bold text-[#540B0E] truncate">Posters & Runways</div>
                <div className="text-[10px] text-[#766050]">Lossless Scalability</div>
              </div>
            </div>

            <p className="text-xs text-[#766050] leading-relaxed font-medium border-t border-[#540B0E]/8 pt-3">
              Precision PostScript vector curves calibrated for CMYK print shops, exhibition catalogs, and aluminum business cards.
            </p>
          </motion.div>

          {/* ── CARD 5: DYNAMIC ISLAND LIVE ACTIVITY CAPSULE (Col 4) ── */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="md:col-span-4 rounded-[36px] p-7 bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(84,11,14,0.05),0_1px_1px_rgba(255,255,255,0.9)_inset] relative overflow-hidden flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#9E2A2B]/15 text-[#9E2A2B] border border-[#9E2A2B]/30 flex items-center justify-center shadow-xs">
                <HugeiconsIcon icon={Globe02Icon} size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#766050] uppercase tracking-wider block">
                  REAL-TIME SYNC
                </span>
                <h3 className="text-lg font-black text-[#540B0E]">Live Dynamic Activity</h3>
              </div>
            </div>

            {/* Interactive Capsule Pill */}
            <div className="space-y-2">
              <div className="p-3.5 rounded-2xl bg-[#140305] text-[#FFF3B0] shadow-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#E09F3E] animate-pulse flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#FFF3B0]/60 block uppercase">Streaming Now</span>
                    <span className="text-xs font-black truncate block text-white">Midnight in Montmartre</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#E09F3E] text-[#230E01] text-[9px] font-black font-mono">
                  LIVE
                </span>
              </div>

              <button
                type="button"
                onClick={handleSimulateCopy}
                className="w-full py-2.5 px-3 rounded-xl bg-white/90 border border-[#540B0E]/12 text-xs font-bold text-[#540B0E] hover:border-[#E09F3E] hover:bg-[#FAF7EE] transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
              >
                {isCopied ? (
                  <>
                    <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-600" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                    <span>Test Instant Share Pill</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-[#766050] leading-relaxed font-medium border-t border-[#540B0E]/8 pt-3">
              Automated social graph unfurling with bespoke rich previews on iMessage, Twitter/X, and LinkedIn.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

