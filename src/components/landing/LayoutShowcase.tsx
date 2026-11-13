'use client';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Layers01Icon,
  DashboardSquare01Icon,
  SparklesIcon,
  ArrowUpRight01Icon,
  Tick01Icon,
} from '@hugeicons/core-free-icons';

type LayoutType = 'stack' | 'bento' | 'editorial';

const DEMO_LINKS = [
  { id: '1', title: 'New Lookbook: Autumn in Milan', icon: '📸', clicks: '24.8k', tag: 'Pinned Feature' },
  { id: '2', title: 'Weekly Creative Letter', icon: '📬', clicks: '6.2k', tag: 'Newsletter' },
  { id: '3', title: '1:1 Brand Strategy Session', icon: '💼', clicks: '1.4k', tag: 'Consulting' },
  { id: '4', title: 'Preset Pack & LUT Collection', icon: '🎨', clicks: '8.9k', tag: 'Digital Asset' },
];

export function LayoutShowcase() {
  const [layout, setLayout] = useState<LayoutType>('bento');

  return (
    <section id="layouts" className="py-20 sm:py-28 bg-[#FAF7EE] border-b border-[#540B0E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#540B0E]/12 text-xs font-bold text-[#540B0E] shadow-xs">
            <HugeiconsIcon icon={SparklesIcon} size={13} className="text-[#E09F3E]" />
            <span className="tracking-wider uppercase text-[10px] sm:text-xs">Spatial Design Freedom</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#540B0E] tracking-tight leading-tight">
            One bio link.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#540B0E] via-[#9E2A2B] to-[#E09F3E]">
              Three iconic architectures.
            </span>
          </h2>

          <p className="text-[#766050] text-sm sm:text-base leading-relaxed font-medium">
            Every creator tells a different story. Switch between classic streams, modern 2-column bento mosaics, and haute editorial catalogs in one click.
          </p>

          {/* Layout Controller Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {(
              [
                { id: 'stack',     label: 'Classic Stack',     icon: Layers01Icon,          badge: 'Single Stream' },
                { id: 'bento',     label: 'Bento Grid',        icon: DashboardSquare01Icon, badge: 'Spatial Mosaic' },
                { id: 'editorial', label: 'Haute Editorial',   icon: SparklesIcon,          badge: 'Numbered Index' },
              ] as const
            ).map(tab => {
              const active = layout === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setLayout(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#E09F3E] text-[#230E01] shadow-[0_4px_14px_rgba(224,159,62,0.35)] scale-102'
                      : 'bg-white border border-[#540B0E]/12 text-[#766050] hover:text-[#540B0E] hover:border-[#E09F3E]/40'
                  }`}
                >
                  <HugeiconsIcon icon={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Showcase Canvas */}
        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Explainer Card */}
          <div className="lg:col-span-4 space-y-4 text-center lg:text-left order-2 lg:order-1">
            <div className="p-5 rounded-3xl bg-white border border-[#540B0E]/12 shadow-sm space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF7EE] text-[#540B0E] border border-[#540B0E]/10 inline-block">
                {layout === 'stack' && 'Classic Flow'}
                {layout === 'bento' && 'Spatial Hierarchy'}
                {layout === 'editorial' && 'Publication Haute'}
              </span>

              <h3 className="text-lg font-black text-[#540B0E]">
                {layout === 'stack' && 'Clean, Uninterrupted Focus'}
                {layout === 'bento' && '2-Column Spatial Grid'}
                {layout === 'editorial' && 'Numbered Magazine Index'}
              </h3>

              <p className="text-xs text-[#766050] leading-relaxed">
                {layout === 'stack' &&
                  'The timeless vertical stream. High-impact full-width cards with clear call-to-actions, perfect for single product launches and music drops.'}
                {layout === 'bento' &&
                  'Showcase high-priority features as a prominent hero tile alongside compact twin tiles. Ideal for creators with multiple simultaneous ventures.'}
                {layout === 'editorial' &&
                  'Curated index style featuring numbered row indicators (01 //, 02 //) and delicate gold hairpins. Designed for fashion, luxury, and architecture portfolios.'}
              </p>

              <div className="pt-2 border-t border-[#540B0E]/8 flex items-center justify-between text-xs text-[#540B0E] font-bold">
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-700" /> Fully Free & Unlocked
                </span>
                <span className="text-[11px] text-[#766050]">0% cuts</span>
              </div>
            </div>
          </div>

          {/* Center Stage: Live Morphing Phone Shell */}
          <div className="lg:col-span-8 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
              
              {/* Outer Phone Shell */}
              <div className="rounded-[44px] p-3.5 bg-[#140305] border-4 border-[#540B0E] shadow-[0_25px_60px_-15px_rgba(84,11,14,0.4)] overflow-hidden transition-all duration-300">
                
                {/* Phone Speaker Notch */}
                <div className="w-24 h-4 bg-[#540B0E]/80 rounded-full mx-auto mb-3" />

                {/* Inner Canvas */}
                <div className="min-h-[480px] bg-[#140305] text-[#FFF3B0] rounded-[34px] p-4 flex flex-col justify-between space-y-4">
                  
                  {/* Bio Header */}
                  <div className="flex flex-col items-center text-center space-y-2 pt-2">
                    <div className="w-18 h-18 rounded-full border-2 border-[#E09F3E] p-0.5 shadow-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face"
                        alt="Kira Vance"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="font-extrabold text-sm text-[#FFF3B0]">Kira Vance</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#E09F3E] text-[#230E01] flex items-center justify-center text-[9px] font-black">
                          ✓
                        </span>
                      </div>
                      <span className="text-[11px] text-[#FFF3B0]/60 font-medium">@kiravance • visual director</span>
                    </div>
                  </div>

                  {/* Dynamic Layout Engine Rendering */}
                  <div className="flex-1 w-full space-y-2.5">
                    
                    {/* 1. CLASSIC STACK */}
                    {layout === 'stack' && (
                      <div className="space-y-2 transition-all duration-300">
                        {DEMO_LINKS.map((link, idx) => (
                          <div
                            key={link.id}
                            className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                              idx === 0
                                ? 'bg-[#E09F3E] text-[#230E01] font-bold shadow-md'
                                : 'bg-[#220609] border border-[#E09F3E]/20 text-[#FFF3B0] hover:border-[#E09F3E]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-sm">{link.icon}</span>
                              <span className="text-xs font-bold truncate">{link.title}</span>
                            </div>
                            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="opacity-70 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 2. BENTO SPATIAL GRID */}
                    {layout === 'bento' && (
                      <div className="grid grid-cols-2 gap-2 transition-all duration-300">
                        {/* Featured Hero Pinned Tile (Spans 2 columns) */}
                        <div className="col-span-2 p-3.5 rounded-2xl bg-[#E09F3E] text-[#230E01] font-bold shadow-md flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{DEMO_LINKS[0].icon}</span>
                            <div>
                              <div className="text-[9px] uppercase tracking-wider font-black opacity-80">Featured Hero</div>
                              <div className="text-xs font-bold">{DEMO_LINKS[0].title}</div>
                            </div>
                          </div>
                          <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} />
                        </div>

                        {/* Compact 1-Col Sub Tiles */}
                        {DEMO_LINKS.slice(1, 3).map(link => (
                          <div
                            key={link.id}
                            className="p-3 rounded-2xl bg-[#220609] border border-[#E09F3E]/20 text-[#FFF3B0] flex flex-col justify-between h-24"
                          >
                            <span className="text-base">{link.icon}</span>
                            <div>
                              <span className="text-[11px] font-bold block leading-snug line-clamp-2">{link.title}</span>
                              <span className="text-[9px] text-[#E09F3E] font-semibold">{link.clicks} clicks</span>
                            </div>
                          </div>
                        ))}

                        {/* Full Width Bottom Tile */}
                        <div className="col-span-2 p-3 rounded-2xl bg-[#220609] border border-[#E09F3E]/20 text-[#FFF3B0] flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-sm">{DEMO_LINKS[3].icon}</span>
                            <span className="text-xs font-bold truncate">{DEMO_LINKS[3].title}</span>
                          </div>
                          <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="text-[#E09F3E]" />
                        </div>
                      </div>
                    )}

                    {/* 3. HAUTE EDITORIAL INDEX */}
                    {layout === 'editorial' && (
                      <div className="space-y-1.5 transition-all duration-300">
                        {DEMO_LINKS.map((link, idx) => (
                          <div
                            key={link.id}
                            className="w-full px-3 py-2.5 rounded-xl border-b border-[#E09F3E]/25 hover:border-[#E09F3E] bg-[#220609]/60 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-[10px] font-mono font-bold text-[#E09F3E]">
                                0{idx + 1} //
                              </span>
                              <span className="text-xs font-bold text-[#FFF3B0] truncate">{link.title}</span>
                            </div>
                            <span className="text-[10px] font-semibold text-[#FFF3B0]/60">Explore</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Micro Footer Badge */}
                  <div className="pt-2 text-center text-[10px] text-[#FFF3B0]/50 font-medium">
                    lookup.bio/kiravance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

