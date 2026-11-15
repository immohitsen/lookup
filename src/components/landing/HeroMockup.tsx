'use client';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, FlashIcon } from '@hugeicons/core-free-icons';

const LINKS = [
  { emoji: '🎬', title: 'Autumn Campaign Film', meta: 'Watch' },
  { emoji: '🎧', title: 'New EP — Out Now', meta: 'Listen' },
  { emoji: '📬', title: 'Join the newsletter', meta: 'Subscribe' },
];

export function HeroMockup() {
  return (
    <div className="relative select-none">
      {/* Flat browser-chrome frame — reads as an actual product screenshot, not decoration */}
      <div className="w-[270px] sm:w-[320px] rounded-[22px] border border-[#1C1A17]/10 bg-white shadow-[0_24px_60px_-20px_rgba(28,26,23,0.16)] overflow-hidden">
        {/* Address bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1C1A17]/8 bg-[#FAF8F3]">
          <span className="w-2 h-2 rounded-full bg-[#1C1A17]/15" />
          <span className="w-2 h-2 rounded-full bg-[#1C1A17]/15" />
          <span className="w-2 h-2 rounded-full bg-[#1C1A17]/15" />
          <span className="ml-2 text-[11px] font-medium text-[#8A8379] truncate">
            lookup.bio/mayaclark
          </span>
        </div>

        {/* Bio page content */}
        <div className="p-5 sm:p-6 bg-[#140305] text-[#FFF3B0] flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#E09F3E] text-[#230E01] flex items-center justify-center font-black text-lg shadow-md">
            M
          </div>
          <div className="text-center">
            <div className="font-extrabold text-sm tracking-tight">Maya Clark</div>
            <div className="text-[11px] opacity-70 font-mono">Filmmaker &amp; sound artist</div>
          </div>

          <div className="w-full flex flex-col gap-2 pt-1">
            {LINKS.map((link) => (
              <div
                key={link.title}
                className="w-full px-3 py-2.5 rounded-xl bg-[#220609] border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm flex-shrink-0">{link.emoji}</span>
                  <span className="font-bold text-[11px] truncate">{link.title}</span>
                </div>
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} className="opacity-50 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating UI chip — a real product behavior claim, not a fabricated metric */}
      <div className="hidden sm:flex absolute -right-6 top-8 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#1C1A17]/10 shadow-lg text-xs font-medium text-[#1C1A17]">
        <HugeiconsIcon icon={FlashIcon} size={12} className="text-[#E09F3E]" />
        Changes go live instantly
      </div>
    </div>
  );
}
