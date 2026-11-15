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
    kicker: 'Spatial architecture',
    title: '3 distinct spatial formats',
    desc: 'Break free from single-column vertical lists. Choose between 2-column spatial Bento mosaics, numbered editorial publication indices, and classic focus streams in one click.',
    icon: Layers01Icon,
    badge: 'Bento • Editorial • Stack',
    tagColor: 'text-[#8A8379]',
  },
  {
    kicker: 'Audience ownership',
    title: '0% cut fan email capture',
    desc: 'Capture fan emails directly on your strip with automated honeypot spam protection. Download clean CSV lists anytime with zero platform commissions or middleman taxes.',
    icon: Mail01Icon,
    badge: '100% creator owned',
    tagColor: 'text-emerald-700',
  },
  {
    kicker: 'Vector print ready',
    title: 'Dynamic vector QR studio',
    desc: 'Generate infinite-resolution vector SVG and high-resolution print PNG QR codes on the fly. Perfectly scaled for album packaging, exhibition merchandise, and concert flyers.',
    icon: QrCodeIcon,
    badge: 'Vector SVG + PNG',
    tagColor: 'text-[#8A8379]',
  },
  {
    kicker: 'Edge performance',
    title: 'Sub-second 0.78s TTFB',
    desc: 'Built on Next.js 16 edge runtime with minimal DOM overhead. Pages load instantly on cellular networks worldwide without heavy third-party tracking bloat or cookie banners.',
    icon: FlashIcon,
    badge: 'Global edge network',
    tagColor: 'text-[#8A8379]',
  },
  {
    kicker: 'Procedural identity',
    title: '16 procedural 3D avatars',
    desc: 'Pick from curated 3D robotic, stylized, and human busts, or roll procedural seeds with our interactive generator. Alternatively, link high-res photos or Unsplash portraits.',
    icon: SparklesIcon,
    badge: 'Procedural 3D art',
    tagColor: 'text-[#8A8379]',
  },
  {
    kicker: 'Custom palettes',
    title: 'Tailored 5-color palettes',
    desc: 'Bordeaux wine noir, honey bronze, petroleum slate, and warm linen paper — pick a palette that fits your page and switch anytime.',
    icon: ChartHistogramIcon,
    badge: 'Custom themes',
    tagColor: 'text-[#8A8379]',
  },
];

export function EditorialFeatures() {
  return (
    <section id="features" className="py-14 sm:py-28 bg-[#FAF8F3] border-b border-[#1C1A17]/10">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 space-y-8 sm:space-y-12 text-left">
        
        {/* Section Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-xs font-medium text-[#8A8379] flex items-center gap-1.5">
            <HugeiconsIcon icon={SparklesIcon} size={14} className="text-[#E09F3E]" />
            Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1C1A17] tracking-[-0.02em]">
            Designed for uncompromised autonomy.
          </h2>
          <p className="text-xs sm:text-base text-[#55504A] max-w-2xl leading-[1.6]">
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
                className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#1C1A17]/12 shadow-sm space-y-4 hover:border-[#E09F3E]/60 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FAF8F3] border border-[#1C1A17]/12 flex items-center justify-center text-[#1C1A17] group-hover:scale-105 transition-transform shadow-2xs">
                      <HugeiconsIcon icon={Icon} size={18} className="text-[#1C1A17]" />
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#FAF8F3] text-[#55504A] border border-[#1C1A17]/10">
                      {feat.badge}
                    </span>
                  </div>

                  <div>
                    <span className={`text-xs font-medium ${feat.tagColor}`}>
                      {feat.kicker}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#1C1A17] mt-0.5 tracking-[-0.01em]">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#55504A] leading-[1.6]">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1C1A17]/8 flex items-center gap-1.5 text-xs text-[#1C1A17] font-medium">
                  <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-700 flex-shrink-0" />
                  <span>Included free</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#1C1A17]/10 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-[#55504A] text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span className="font-semibold text-[#1C1A17]">100% free creator toolkit</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px]">
            <span>No credit card required</span>
            <span className="hidden sm:inline">·</span>
            <span>0% fees taken</span>
            <span className="hidden sm:inline">·</span>
            <span>Instant deployment</span>
          </div>
        </div>

      </div>
    </section>
  );
}
