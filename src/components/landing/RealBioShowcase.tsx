'use client';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowUpRight01Icon,
  SparklesIcon,
  Tick01Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';

interface CreatorBio {
  id: string;
  name: string;
  handle: string;
  title: string;
  location: string;
  avatar: string;
  themeName: string;
  paletteBg: string;
  paletteSurface: string;
  paletteInk: string;
  paletteAccent: string;
  layoutTag: string;
  bio: string;
  pinned: {
    tag: string;
    title: string;
    meta: string;
    image?: string;
  };
  links: Array<{
    type: string;
    num?: string;
    title: string;
    meta?: string;
    icon?: string;
  }>;
}

const REAL_CREATORS: CreatorBio[] = [
  {
    id: 'elena',
    name: 'Elena Rost',
    handle: 'elenarost',
    title: 'Architectural Photographer',
    location: 'ZURICH // KYOTO',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=240&fit=crop&crop=face',
    themeName: 'Bordeaux & Honey',
    paletteBg: '#140305',
    paletteSurface: '#220609',
    paletteInk: '#FFF3B0',
    paletteAccent: '#E09F3E',
    layoutTag: 'Haute Editorial Index',
    bio: 'Documenting high-relief brutalism and monolithic spaces across Japan and Europe. Monograph II available now.',
    pinned: {
      tag: '01 // ARCHIVE FEATURE',
      title: 'Kyoto Monasteries: 35mm High-Relief Study',
      meta: '4K Gallery • 18.4K Views',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
    },
    links: [
      { type: 'editorial', num: '02 //', title: 'Monograph II: Brutalism in Relief (Hardcover 240pp)', meta: 'Hardcover Book' },
      { type: 'editorial', num: '03 //', title: 'Commission Study: 2026 Architectural Surveys', meta: 'Booking Open' },
      { type: 'editorial', num: '04 //', title: 'The Weekly Negative: Darkroom essays & lens breakdowns', meta: 'Substack Newsletter' },
    ],
  },
  {
    id: 'julian',
    name: 'Julian Sol',
    handle: 'juliansol',
    title: 'Electronic Producer & Modular Artist',
    location: 'BERLIN // LONDON',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=face',
    themeName: 'Dark Slate Grey',
    paletteBg: '#132227',
    paletteSurface: '#1B3037',
    paletteInk: '#FFF3B0',
    paletteAccent: '#E09F3E',
    layoutTag: 'Spatial Bento Grid',
    bio: 'Analog synthesizer recordings, soundscapes & spatial audio engineering. New tape out on Warp Records.',
    pinned: {
      tag: 'NOW STREAMING',
      title: 'Resonance Over Neukölln (Live Tape)',
      meta: 'Spotify // Mastered 320kbps',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    },
    links: [
      { type: 'bento', title: 'Eurorack Sample Pack Vol. 4 (WAV + MIDI)', meta: '1.2 GB Archive', icon: '🎛️' },
      { type: 'bento', title: 'Live Dates: Club Transmediale Berlin', meta: 'Tickets Available', icon: '🎟️' },
      { type: 'bento', title: 'Analog Synthesizer Patch Notes & Stems', meta: 'Direct Fan Club', icon: '🎧' },
    ],
  },
  {
    id: 'kira',
    name: 'Kira Vance',
    handle: 'kiravance',
    title: 'Industrial Designer & Creative Lead',
    location: 'PARIS // COPENHAGEN',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=240&h=240&fit=crop&crop=face',
    themeName: 'Vanilla Custard',
    paletteBg: '#FAF8F3',
    paletteSurface: '#FFFFFF',
    paletteInk: '#1C1A17',
    paletteAccent: '#E09F3E',
    layoutTag: 'Linen Classic Stack with Ambient Halo',
    bio: 'Designing tactile physical computing devices and minimalist studio hardware. Former Studio Lead at Teenage Engineering.',
    pinned: {
      tag: 'PUBLISHED ESSAY',
      title: 'Designing with Restraint: Physicality in a Screen-Bound World',
      meta: 'Offscreen Magazine • 12 Min Read',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    },
    links: [
      { type: 'stack', title: 'Studio Hardware Kit & Optics Breakdown', meta: 'Full Inventory', icon: '📐' },
      { type: 'stack', title: '1:1 Design Mentorship (2 Slots Open)', meta: 'Consulting', icon: '💼' },
      { type: 'stack', title: 'Weekly Creative Brief: Industrial design notes', meta: 'Newsletter', icon: '📬' },
    ],
  },
];

export function RealBioShowcase() {
  const [selectedCreator, setSelectedCreator] = useState<CreatorBio>(REAL_CREATORS[0]);

  return (
    <section id="showcase" className="py-14 sm:py-24 bg-[#FAF8F3] border-b border-[#1C1A17]/10">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 space-y-6 sm:space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-2 border-b border-[#1C1A17]/10 text-left">
          <div className="space-y-2">
            <span className="text-xs font-medium text-[#8A8379] flex items-center gap-1.5">
              <HugeiconsIcon icon={SparklesIcon} size={14} className="text-[#E09F3E]" />
              Real bio pages
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1C1A17] tracking-[-0.02em]">
              Crafted by real creators.
            </h2>
            <p className="text-xs sm:text-base text-[#55504A] max-w-xl leading-[1.6]">
              Explore authentic bio pages built on Lookup. Notice the distinct spatial hierarchy, custom palettes, and tactile typography.
            </p>
          </div>

          {/* Creator Selector Pills */}
          <div className="flex items-center bg-white border border-[#1C1A17]/12 p-1 rounded-2xl shadow-xs self-start md:self-auto overflow-x-auto max-w-full scrollbar-none">
            {REAL_CREATORS.map(creator => {
              const isActive = selectedCreator.id === creator.id;
              return (
                <button
                  key={creator.id}
                  type="button"
                  onClick={() => setSelectedCreator(creator)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1C1A17] text-[#FAF8F3] shadow-xs'
                      : 'text-[#55504A] hover:text-[#1C1A17]'
                  }`}
                >
                  {creator.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── REAL BIO PAGE FRAME ── */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Creator Dossier & Specs */}
          <div className="lg:col-span-7 space-y-4 text-left order-2 lg:order-1">
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#1C1A17]/12 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FAF8F3] text-[#1C1A17] border border-[#1C1A17]/10">
                  {selectedCreator.location}
                </span>
                <span className="text-xs font-mono font-bold text-[#E09F3E]">
                  lookup.bio/{selectedCreator.handle}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1C1A17] tracking-tight">{selectedCreator.name}</h3>
                <p className="text-xs font-medium text-[#55504A] mt-0.5">{selectedCreator.title}</p>
              </div>

              <p className="text-xs text-[#55504A] leading-relaxed">
                {selectedCreator.bio}
              </p>

              {/* Specs Breakdown */}
              <div className="pt-2 border-t border-[#1C1A17]/8 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#55504A]">Spatial Layout:</span>
                  <span className="font-bold text-[#1C1A17] text-right truncate pl-2">{selectedCreator.layoutTag}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#55504A]">Palette:</span>
                  <span className="font-bold text-[#1C1A17]">{selectedCreator.themeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#55504A]">Commission Fee:</span>
                  <span className="font-bold text-emerald-700">0% (Keep 100%)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs text-[#8A8379]">
              <span className="w-2 h-2 rounded-full bg-[#E09F3E] flex-shrink-0" />
              <span>Live demo running on the edge — 0.78s</span>
            </div>
          </div>

          {/* Right Column: Authentic Browser/Phone Canvas Mockup (Refined & Compact) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="w-full max-w-[280px] sm:max-w-[310px] relative">
              
              {/* Outer Phone/Display Hardware Shell */}
              <div
                className="rounded-[34px] p-3.5 sm:p-4 border-[3px] border-[#1C1A17] shadow-[0_20px_50px_-12px_rgba(84,11,14,0.28)] transition-all duration-500 overflow-hidden"
                style={{ backgroundColor: selectedCreator.paletteBg, color: selectedCreator.paletteInk }}
              >
                {/* Speaker Notch */}
                <div className="w-20 h-3 rounded-full mx-auto mb-3 opacity-40 bg-current" />

                {/* Inner Canvas */}
                <div className="space-y-3">
                  
                  {/* Bio Header */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div
                      className="w-14 h-14 rounded-full p-0.5 border-2 shadow-md overflow-hidden"
                      style={{ borderColor: selectedCreator.paletteAccent }}
                    >
                      <img
                        src={selectedCreator.avatar}
                        alt={selectedCreator.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-extrabold text-sm tracking-tight">{selectedCreator.name}</span>
                        <span
                          className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black"
                          style={{ backgroundColor: selectedCreator.paletteAccent, color: '#230E01' }}
                        >
                          ✓
                        </span>
                      </div>
                      <span className="text-[10px] opacity-70 font-mono">
                        lookup.bio/{selectedCreator.handle}
                      </span>
                    </div>

                    <p className="text-[11px] opacity-85 leading-relaxed max-w-[230px] font-medium">
                      {selectedCreator.bio}
                    </p>
                  </div>

                  {/* Pinned Hero Card (With Real Visual) */}
                  <div
                    className="w-full rounded-xl overflow-hidden border transition-all shadow-xs group cursor-pointer"
                    style={{
                      backgroundColor: selectedCreator.paletteSurface,
                      borderColor: `${selectedCreator.paletteAccent}40`,
                    }}
                  >
                    {selectedCreator.pinned.image && (
                      <div className="w-full h-24 overflow-hidden relative">
                        <img
                          src={selectedCreator.pinned.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-black/60 backdrop-blur-md text-[#FFF3B0]">
                          {selectedCreator.pinned.tag}
                        </div>
                      </div>
                    )}
                    <div className="p-2.5 flex items-center justify-between">
                      <div className="min-w-0 pr-1.5">
                        <h4 className="text-[11px] font-black truncate">{selectedCreator.pinned.title}</h4>
                        <span className="text-[9px] opacity-70 font-mono">{selectedCreator.pinned.meta}</span>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[#230E01] flex-shrink-0"
                        style={{ backgroundColor: selectedCreator.paletteAccent }}
                      >
                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={11} />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Blocks */}
                  <div className="space-y-1.5">
                    {selectedCreator.links.map((link, idx) => (
                      <div
                        key={idx}
                        className="w-full px-2.5 py-2 rounded-xl border text-[11px] flex items-center justify-between transition-all hover:scale-[1.01]"
                        style={{
                          backgroundColor: selectedCreator.paletteSurface,
                          borderColor: `${selectedCreator.paletteAccent}25`,
                        }}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {link.num && (
                            <span className="text-[9px] font-mono font-bold text-[#E09F3E]">
                              {link.num}
                            </span>
                          )}
                          {link.icon && <span className="text-xs">{link.icon}</span>}
                          <span className="font-bold truncate text-[10px] sm:text-[11px]">{link.title}</span>
                        </div>
                        <span className="text-[8px] font-mono opacity-60 flex-shrink-0 ml-1.5">
                          {link.meta}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Micro Footer */}
                  <div className="pt-1 text-center text-[9px] opacity-40 font-mono">
                    lookup.bio/{selectedCreator.handle}
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

