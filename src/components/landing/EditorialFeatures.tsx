'use client';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SparklesIcon,
  Mail01Icon,
  QrCodeIcon,
  ChartHistogramIcon,
  Layers01Icon,
  FlashIcon,
  Tick01Icon,
} from '@hugeicons/core-free-icons';

interface FeatureCard {
  kicker: string;
  title: string;
  desc: string;
  icon: typeof SparklesIcon;
  badge: string;
  tagColor: string;
}

const FEATURES: FeatureCard[] = [
  {
    kicker: '// 01 SPATIAL ARCHITECTURE',
    title: '3 Distinct Spatial Formats',
    desc: 'Break free from single-column vertical lists. Choose between 2-column spatial Bento mosaics, numbered Haute Editorial publication indices, and classic focus streams in one click.',
    icon: Layers01Icon,
    badge: 'Bento • Editorial • Stack',
    tagColor: 'text-[#E09F3E]',
  },
  {
    kicker: '// 02 AUDIENCE SOVEREIGNTY',
    title: '0% Cut Fan Email Capture',
    desc: 'Capture fan emails directly on your strip with automated honeypot spam protection. Download clean CSV lists anytime with zero platform commissions or middleman taxes.',
    icon: Mail01Icon,
    badge: '100% Creator Owned',
    tagColor: 'text-emerald-700',
  },
  {
    kicker: '// 03 VECTOR PRINT READY',
    title: 'Dynamic Vector QR Studio',
    desc: 'Generate infinite-resolution vector SVG and high-resolution print PNG QR codes on the fly. Perfectly scaled for album packaging, exhibition merchandise, and concert flyers.',
    icon: QrCodeIcon,
    badge: 'Vector SVG + PNG',
    tagColor: 'text-[#335C67]',
  },
  {
    kicker: '// 04 EDGE PERFORMANCE',
    title: 'Sub-Second 0.78s TTFB',
    desc: 'Built on Next.js 16 edge runtime with minimal DOM overhead. Pages load instantly on cellular networks worldwide without heavy third-party tracking bloat or cookie banners.',
    icon: FlashIcon,
    badge: 'Global Edge Network',
    tagColor: 'text-[#9E2A2B]',
  },
  {
    kicker: '// 05 PROCEDURAL IDENTITY',
    title: '16 Procedural 3D Avatars',
    desc: 'Pick from curated 3D robotic, stylized, and human busts, or roll procedural seeds with our interactive generator. Alternatively, link high-res photos or Unsplash portraits.',
    icon: SparklesIcon,
    badge: 'Procedural 3D Art',
    tagColor: 'text-[#E09F3E]',
  },
  {
    kicker: '// 06 LUXURY ATMOSPHERE',
    title: 'Tailored 5-Color Palettes',
    desc: 'Bordeaux wine noir, honey bronze, petroleum slate, and warm linen paper. Add ambient halo backlights that cast a luminous soft underglow beneath your link cards.',
    icon: ChartHistogramIcon,
    badge: 'Ambient Halo Glow',
    tagColor: 'text-[#540B0E]',
  },
];

export function EditorialFeatures() {
  return (
    <section id="features" className="py-14 sm:py-28 bg-[#FAF7EE] border-b border-[#540B0E]/10">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 space-y-8 sm:space-y-12 text-left">
        
        {/* Section Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#E09F3E] flex items-center gap-1.5">
            <HugeiconsIcon icon={SparklesIcon} size={14} />
            // 05 CAPABILITIES ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#540B0E] tracking-tight">
            Designed for uncompromised autonomy.
          </h2>
          <p className="text-xs sm:text-base text-[#766050] max-w-2xl font-medium leading-relaxed">
            Every feature on Lookup is engineered to give creators aesthetic distinction and total independence — without paywalls, watermark badges, or middleman fees.
          </p>
        </div>

        {/* 6-Card Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#540B0E]/12 shadow-sm space-y-4 hover:border-[#E09F3E]/60 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FAF7EE] border border-[#540B0E]/12 flex items-center justify-center text-[#540B0E] group-hover:scale-105 transition-transform shadow-2xs">
                      <HugeiconsIcon icon={Icon} size={18} className="text-[#540B0E]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7EE] text-[#540B0E] border border-[#540B0E]/10">
                      {feat.badge}
                    </span>
                  </div>

                  <div>
                    <span className={`text-[10px] font-mono font-black uppercase tracking-wider ${feat.tagColor}`}>
                      {feat.kicker}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#540B0E] mt-0.5 tracking-tight">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#766050] leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#540B0E]/8 flex items-center gap-1.5 text-xs text-[#540B0E] font-bold">
                  <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-700 flex-shrink-0" />
                  <span className="font-mono text-[11px]">INCLUDED FREE</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Trust Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#540B0E]/10 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-[#766050] text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-bold text-[#540B0E]">100% FREE CREATOR TOOLKIT</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px]">
            <span>NO CREDIT CARD REQUIRED</span>
            <span className="hidden sm:inline">•</span>
            <span>0% FEES TAKEN</span>
            <span className="hidden sm:inline">•</span>
            <span>INSTANT DEPLOYMENT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
