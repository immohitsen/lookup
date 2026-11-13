'use client';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Copy01Icon,
  Tick01Icon,
  ArrowUpRight01Icon,
  SparklesIcon,
} from '@hugeicons/core-free-icons';
import { SocialIconsRow } from '@/components/public/SocialIconsRow';
import { CustomColorsConfig } from '@/components/public/LinkBlock';
import { IconRenderer } from '@/components/ui/IconRenderer';

interface LinkItem {
  _id: string;
  type: string;
  title: string;
  url: string;
  isPinned: boolean;
  isActive: boolean;
  icon: string;
  thumbnail?: string;
  scheduledStart?: string | Date;
  scheduledEnd?: string | Date;
}

interface Props {
  username: string;
  themeId: string;
  name: string;
  bio: string;
  avatarUrl: string;
  bgType?: string;
  customColors?: CustomColorsConfig;
  socialPosition?: 'top' | 'bottom';
  socialLinks?: Record<string, string>;
  links: LinkItem[];
}

export function PhonePreview({
  username,
  themeId,
  name,
  bio,
  avatarUrl,
  bgType = 'solid',
  customColors,
  socialPosition = 'top',
  socialLinks = {},
  links,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const now = new Date();
  const activeLinks = links.filter(l => {
    if (!l.isActive) return false;
    if (l.scheduledStart && new Date(l.scheduledStart) > now) return false;
    if (l.scheduledEnd && new Date(l.scheduledEnd) < now) return false;
    return true;
  });
  const pinned = activeLinks.find(l => l.isPinned || l.type === 'pinned');
  const others = activeLinks.filter(l => l._id !== pinned?._id && l.type !== 'social_icons');

  const hasSocials = Object.values(socialLinks).some(v => v && v.trim().length > 0);
  const layoutStyle = customColors?.layoutStyle || 'stack';
  const showProBadge = Boolean(customColors?.proBadge);
  const hasGlow = customColors?.cardGlow ?? false;
  const buttonStyle = customColors?.buttonStyle || 'solid';
  const customBg = customColors?.bg;
  const customBtnColor = customColors?.button;
  const customTextColor = customColors?.text;

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${username}`
    : `https://lookup.bio/${username}`;

  let pageBackground = customBg || 'var(--paper)';
  if (bgType === 'gradient') {
    pageBackground = customBg
      ? `linear-gradient(180deg, ${customBg} 0%, rgba(0,0,0,0.3) 100%)`
      : 'linear-gradient(180deg, var(--paper) 0%, var(--surface) 100%)';
  } else if (bgType === 'ambient') {
    pageBackground = customBg
      ? `radial-gradient(ellipse 90% 60% at 50% -10%, ${customBg} 0%, rgba(20,3,5,0.95) 100%)`
      : 'radial-gradient(ellipse 90% 60% at 50% -10%, var(--accent) 0%, var(--paper) 100%)';
  }

  function handleCopy() {
    navigator.clipboard.writeText(publicUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Helper to compute card styles
  function getCardStyle(isPin: boolean): { style: React.CSSProperties; className: string } {
    let style: React.CSSProperties = {};
    let className = 'transition-all duration-200 select-none ';

    const glowShadow = hasGlow
      ? customBtnColor
        ? `0 6px 20px -3px ${customBtnColor}45`
        : '0 6px 20px -3px rgba(224, 159, 62, 0.4)'
      : undefined;

    if (isPin) {
      if (customBtnColor) {
        style = {
          backgroundColor: customBtnColor,
          color: customTextColor || '#FFFFFF',
          borderColor: customBtnColor,
          boxShadow: glowShadow || '0 4px 14px rgba(0,0,0,0.15)',
        };
        className += ' border font-bold';
      } else {
        style = {
          backgroundColor: 'var(--accent)',
          color: 'var(--accent-ink)',
          boxShadow: glowShadow || '0 4px 14px rgba(224,159,62,0.3)',
        };
        className += ' font-bold';
      }
    } else {
      if (buttonStyle === 'outline') {
        style = {
          backgroundColor: 'transparent',
          borderColor: customBtnColor || 'currentColor',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: customTextColor || customBtnColor || 'inherit',
          boxShadow: glowShadow,
        };
      } else if (buttonStyle === 'glass') {
        style = {
          backgroundColor: customBtnColor ? `${customBtnColor}22` : 'rgba(255, 255, 255, 0.15)',
          borderColor: customBtnColor ? `${customBtnColor}55` : 'rgba(255, 255, 255, 0.25)',
          borderWidth: '1px',
          borderStyle: 'solid',
          backdropFilter: 'blur(8px)',
          color: customTextColor || 'inherit',
          boxShadow: glowShadow,
        };
      } else {
        // Solid
        style = {
          backgroundColor: customBtnColor || 'var(--surface)',
          borderColor: customBtnColor ? 'transparent' : 'rgba(84, 11, 14, 0.12)',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: customTextColor || 'var(--ink)',
          boxShadow: glowShadow || '0 1px 4px rgba(0,0,0,0.05)',
        };
      }
    }

    return { style, className };
  }

  return (
    <div className="flex items-center gap-3 font-sans select-none max-w-full justify-center">
      {/* ── Sleek Minimalist Device Frame ── */}
      <div
        data-theme={themeId || 'bordeaux-honey'}
        style={{
          background: pageBackground,
          color: customTextColor || 'var(--ink)',
        }}
        className="relative w-[280px] h-[565px] rounded-[38px] border-[5px] border-[#220609] shadow-2xl overflow-hidden flex flex-col transition-colors duration-200 ring-1 ring-black/10 flex-shrink-0"
      >
        {/* Subtle Universal Punchhole Camera */}
        <div className="w-full pt-2.5 pb-1 flex justify-center flex-shrink-0 z-20">
          <div className="w-2.5 h-2.5 rounded-full bg-black/60 ring-1 ring-white/10" />
        </div>

        {/* Scrollable screen viewport */}
        <div className="overflow-y-auto h-full pt-2 pb-5 px-3.5 flex flex-col items-center gap-3 scrollbar-none">
          {/* Avatar */}
          {avatarUrl && !avatarError ? (
            <div className="w-16 h-16 rounded-full border-2 border-current/20 shadow-md overflow-hidden ring-2 ring-current/10 flex-shrink-0">
              <img
                src={avatarUrl}
                alt=""
                onError={() => setAvatarError(true)}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full border-2 border-current/20 shadow-md bg-[#E09F3E] text-[#230E01] flex items-center justify-center ring-2 ring-current/10 flex-shrink-0">
              <span className="text-xl font-black">{(name || username || 'U')[0].toUpperCase()}</span>
            </div>
          )}

          {/* Name + Pro Badge + Bio */}
          <div className="text-center space-y-1 w-full px-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className="font-extrabold text-sm tracking-tight truncate max-w-full"
                style={{ color: customTextColor || 'inherit' }}
              >
                {name || username}
              </div>
              {showProBadge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[8px] font-black uppercase tracking-wider bg-[#E09F3E]/20 text-[#E09F3E] border border-[#E09F3E]/40">
                  <HugeiconsIcon icon={SparklesIcon} size={9} />
                  Pro Creator
                </span>
              )}
            </div>
            {bio && (
              <p
                className="text-[10px] opacity-80 line-clamp-2 leading-relaxed"
                style={{ color: customTextColor || 'inherit' }}
              >
                {bio}
              </p>
            )}
          </div>

          {/* Socials at TOP */}
          {hasSocials && socialPosition === 'top' && (
            <div className="w-full flex justify-center scale-85 origin-top -my-1">
              <SocialIconsRow
                socialLinks={socialLinks}
                customButtonColor={customBtnColor}
              />
            </div>
          )}

          {/* Pinned link (Hero Banner) */}
          {pinned && (() => {
            const { style, className } = getCardStyle(true);
            return (
              <div
                style={style}
                className={`${className} relative w-full px-3 py-2.5 rounded-xl text-xs flex items-center justify-between shadow-xs`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded-md bg-black/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <IconRenderer icon={pinned.icon} size={13} />
                  </div>
                  <span className="font-bold text-[11px] truncate">{pinned.title}</span>
                </div>
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} className="opacity-60 flex-shrink-0" />
              </div>
            );
          })()}

          {/* ── Dynamic Layout Engine in Phone Preview ── */}
          {layoutStyle === 'bento' ? (
            /* Bento 2-Column Grid */
            <div className="w-full grid grid-cols-2 gap-2">
              {others.map((l, idx) => {
                const { style, className } = getCardStyle(false);
                const isLastOdd = idx === others.length - 1 && others.length % 2 === 1;
                return (
                  <div
                    key={l._id}
                    style={style}
                    className={`${className} ${
                      isLastOdd ? 'col-span-2 flex items-center justify-between px-3 py-2' : 'col-span-1 flex flex-col justify-between p-2.5 min-h-[74px]'
                    } rounded-xl text-[10px]`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="w-5 h-5 rounded-md bg-black/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                        <IconRenderer icon={l.icon} size={12} />
                      </div>
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={11} className="opacity-50" />
                    </div>
                    <div className="font-bold text-[10px] line-clamp-2 mt-1.5 leading-tight">
                      {l.title}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : layoutStyle === 'editorial' ? (
            /* Haute Editorial Numbered Rows */
            <div className="w-full flex flex-col gap-2">
              {others.map((l, idx) => {
                const { style, className } = getCardStyle(false);
                const formattedIndex = String(idx + 1).padStart(2, '0');
                return (
                  <div
                    key={l._id}
                    style={style}
                    className={`${className} w-full px-3 py-2 rounded-xl text-[11px] flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[9px] font-bold text-[#E09F3E] opacity-80">
                        {formattedIndex} //
                      </span>
                      {l.icon && (
                        <div className="w-4 h-4 rounded bg-black/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                          <IconRenderer icon={l.icon} size={11} />
                        </div>
                      )}
                      <span className="font-bold truncate text-[10px]">{l.title}</span>
                    </div>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={12} className="opacity-50 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          ) : (
            /* Classic Stack */
            <div className="w-full flex flex-col gap-2">
              {others.map(l => {
                const { style, className } = getCardStyle(false);
                return (
                  <div
                    key={l._id}
                    style={style}
                    className={`${className} w-full px-3 py-2.5 rounded-xl text-xs flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded-md bg-black/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                        <IconRenderer icon={l.icon} size={13} />
                      </div>
                      <span className="font-bold text-[11px] truncate">{l.title}</span>
                    </div>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} className="opacity-50 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          )}

          {/* Socials at BOTTOM */}
          {hasSocials && socialPosition === 'bottom' && (
            <div className="w-full flex justify-center scale-85 origin-bottom mt-1">
              <SocialIconsRow
                socialLinks={socialLinks}
                customButtonColor={customBtnColor}
              />
            </div>
          )}

          {/* Minimal clean footer */}
          <div className="w-full pt-3 flex flex-col items-center gap-0.5 mt-auto select-none opacity-50">
            <span
              className="text-center text-[9px] font-bold"
              style={{ color: customTextColor || 'inherit' }}
            >
              lookup.bio/{username}
            </span>
          </div>
        </div>
      </div>

      {/* ── Floating Side Action Capsule (Docked naturally beside phone) ── */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <div className="bg-white/95 backdrop-blur-md border border-[#540B0E]/15 rounded-full p-1.5 shadow-lg flex flex-col gap-1.5 items-center">
          {/* Copy link button */}
          <button
            onClick={handleCopy}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#540B0E] hover:bg-[#FAF7EE] hover:text-[#E09F3E] transition-all cursor-pointer relative group"
            title="Copy bio link"
            aria-label="Copy bio link"
          >
            {copied ? (
              <HugeiconsIcon icon={Tick01Icon} size={16} className="text-emerald-600" />
            ) : (
              <HugeiconsIcon icon={Copy01Icon} size={16} />
            )}
            <span className="absolute left-full ml-2 px-2 py-1 bg-[#540B0E] text-[#FFF3B0] text-[10px] font-bold rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md z-30">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>

          {/* Open live page */}
          <a
            href={`/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#540B0E] hover:bg-[#FAF7EE] hover:text-[#E09F3E] transition-all cursor-pointer relative group"
            title="Open live bio page"
            aria-label="Open live bio page"
          >
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
            <span className="absolute left-full ml-2 px-2 py-1 bg-[#540B0E] text-[#FFF3B0] text-[10px] font-bold rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md z-30">
              Open Page
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
