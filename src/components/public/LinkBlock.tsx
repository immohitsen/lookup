'use client';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, SparklesIcon } from '@hugeicons/core-free-icons';
import { normalizeUrl } from '@/lib/utils';
import { IconRenderer } from '@/components/ui/IconRenderer';

export interface CustomColorsConfig {
  bg?: string;
  button?: string;
  text?: string;
  buttonStyle?: 'solid' | 'outline' | 'glass';
  layoutStyle?: 'stack' | 'bento' | 'editorial';
  cardGlow?: boolean;
  proBadge?: boolean;
  interfaceStyle?: string;
}

interface LinkItem {
  id: string;
  type: string;
  title: string;
  url: string;
  isPinned: boolean;
  icon: string;
  thumbnail: string;
  config: Record<string, unknown>;
}

interface Props {
  link: LinkItem;
  pinned?: boolean;
  index?: number;
  isBentoTile?: boolean;
  customColors?: CustomColorsConfig;
}

export function LinkBlock({ link, pinned, index = 0, isBentoTile = false, customColors }: Props) {
  function handleClick() {
    fetch('/api/analytics/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        linkId: link.id,
        referrer: document.referrer,
        search: window.location.search,
      }),
    }).catch(() => {});
  }

  const layoutStyle = customColors?.layoutStyle || 'stack';
  const buttonStyle = customColors?.buttonStyle || 'solid';
  const hasGlow = customColors?.cardGlow ?? false;
  const customBtnColor = customColors?.button;
  const customTextColor = customColors?.text;

  // Base style computation
  let containerStyle: React.CSSProperties = {};
  let containerClass =
    'group relative no-underline cursor-pointer transition-all duration-300 select-none ';

  // Glow shadow styling
  const glowShadow = hasGlow
    ? customBtnColor
      ? `0 10px 30px -4px ${customBtnColor}40`
      : '0 10px 30px -4px rgba(224, 159, 62, 0.35)'
    : undefined;

  // Button Fill Styles (Solid, Outline, Glass)
  if (pinned) {
    // Hero Highlight Card
    if (customBtnColor) {
      containerStyle = {
        backgroundColor: customBtnColor,
        color: customTextColor || '#FFFFFF',
        borderColor: `${customBtnColor}99`,
        boxShadow: glowShadow || '0 8px 24px rgba(0,0,0,0.12)',
      };
      containerClass += ' border-2 font-bold shadow-md hover:brightness-105 active:scale-[0.98]';
    } else {
      containerStyle = {
        boxShadow: glowShadow || '0 10px 30px -6px rgba(224,159,62,0.4)',
      };
      containerClass +=
        ' bg-gradient-to-r from-[#E09F3E] to-[#F3B755] text-[#230E01] font-bold border border-[#FFF3B0]/40 hover:brightness-105 active:scale-[0.98]';
    }
  } else {
    // Standard Card
    if (buttonStyle === 'outline') {
      containerStyle = {
        backgroundColor: 'transparent',
        borderColor: customBtnColor || 'currentColor',
        borderWidth: '1.5px',
        borderStyle: 'solid',
        color: customTextColor || customBtnColor || 'inherit',
        boxShadow: glowShadow,
      };
      containerClass += ' hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]';
    } else if (buttonStyle === 'glass') {
      containerStyle = {
        backgroundColor: customBtnColor ? `${customBtnColor}22` : 'rgba(255, 255, 255, 0.14)',
        borderColor: customBtnColor ? `${customBtnColor}55` : 'rgba(255, 255, 255, 0.25)',
        borderWidth: '1px',
        borderStyle: 'solid',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: customTextColor || 'inherit',
        boxShadow: glowShadow,
      };
      containerClass += ' hover:brightness-110 active:scale-[0.98]';
    } else {
      // Solid (default)
      containerStyle = {
        backgroundColor: customBtnColor || 'var(--surface)',
        borderColor: customBtnColor ? 'transparent' : 'rgba(84, 11, 14, 0.12)',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: customTextColor || 'var(--ink)',
        boxShadow: glowShadow || '0 2px 8px rgba(0,0,0,0.04)',
      };
      containerClass += ' hover:border-current/30 hover:shadow-md active:scale-[0.98]';
    }
  }

  // ── A: Bento Tile Format (Compact 2-Column Tile) ──
  if (isBentoTile && !pinned) {
    return (
      <a
        href={normalizeUrl(link.url)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        style={containerStyle}
        className={`${containerClass} flex flex-col justify-between p-4 rounded-2xl min-h-[105px] h-full overflow-hidden`}
      >
        {/* Top row: Icon + Arrow */}
        <div className="flex items-center justify-between w-full">
          <div className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
            <IconRenderer icon={link.icon} size={18} />
          </div>
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={15}
            className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </div>

        {/* Bottom row: Title */}
        <div className="mt-3">
          <div className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">
            {link.title}
          </div>
        </div>
      </a>
    );
  }

  // ── B: Editorial Magazine Style (Numbered Catalog 01 / 02) ──
  if (layoutStyle === 'editorial' && !pinned) {
    const formattedIndex = String(index + 1).padStart(2, '0');
    return (
      <a
        href={normalizeUrl(link.url)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        style={containerStyle}
        className={`${containerClass} flex items-center justify-between w-full px-5 py-4 rounded-xl font-sans text-sm`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <span className="font-mono text-xs font-bold text-[#E09F3E] tracking-wider flex-shrink-0 opacity-80">
            {formattedIndex} //
          </span>
          {link.icon && (
            <div className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
              <IconRenderer icon={link.icon} size={16} />
            </div>
          )}
          <span className="font-bold text-sm truncate tracking-tight">
            {link.title}
          </span>
        </div>
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={16}
          className="flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </a>
    );
  }

  // ── C: Classic Stack / Hero Featured Banner ──
  return (
    <a
      href={normalizeUrl(link.url)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      style={containerStyle}
      className={`${containerClass} flex items-center gap-3.5 w-full px-5 py-4 rounded-2xl font-sans text-sm`}
    >
      {pinned && (
        <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase bg-[#540B0E] text-[#FFF3B0] border border-[#E09F3E]/40 flex items-center gap-1 shadow-xs">
          <HugeiconsIcon icon={SparklesIcon} size={10} className="text-[#E09F3E]" />
          Featured
        </span>
      )}

      {link.icon && (
        <div className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
          <IconRenderer icon={link.icon} size={20} />
        </div>
      )}

      {link.thumbnail && (
        <img
          src={link.thumbnail}
          alt=""
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
          className="w-10 h-10 object-cover rounded-xl border border-current/20 flex-shrink-0"
        />
      )}

      <span className="flex-1 font-bold text-sm truncate tracking-tight">
        {link.title}
      </span>

      <HugeiconsIcon
        icon={ArrowUpRight01Icon}
        size={16}
        className="flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
      />
    </a>
  );
}
