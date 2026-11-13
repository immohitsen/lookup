'use client';
import { useEffect, useState } from 'react';
import { LinkBlock, CustomColorsConfig } from './LinkBlock';
import { SocialIconsRow } from './SocialIconsRow';
import { EmailSignupBlock } from './EmailSignupBlock';
import { HugeiconsIcon } from '@hugeicons/react';
import { SparklesIcon } from '@hugeicons/core-free-icons';

interface User {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  themeId: string;
  fontId: string;
  bgType: string;
  customColors?: CustomColorsConfig;
  socialPosition?: 'top' | 'bottom';
  socialLinks: Record<string, string>;
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
  user: User;
  links: LinkItem[];
}

export function PublicBioPage({ user, links }: Props) {
  const [avatarError, setAvatarError] = useState(false);

  // Track page view
  useEffect(() => {
    const sessionId = sessionStorage.getItem('sid') ?? crypto.randomUUID();
    sessionStorage.setItem('sid', sessionId);
    fetch('/api/analytics/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        sessionId,
        referrer: document.referrer,
        search: window.location.search,
      }),
    }).catch(() => { });
  }, [user.username]);

  const pinned = links.find(l => l.isPinned || l.type === 'pinned');
  const others = links.filter(l => l.id !== pinned?.id && l.type !== 'social_icons');
  const socialBlock = links.find(l => l.type === 'social_icons');
  const hasSocials = Boolean(
    socialBlock || (user.socialLinks && Object.values(user.socialLinks).some(v => v && v.trim().length > 0))
  );

  const layoutStyle = user.customColors?.layoutStyle || 'stack';
  const showProBadge = Boolean(user.customColors?.proBadge);
  const socialPosition = user.socialPosition || 'top';
  const bgType = user.bgType || 'solid';
  const customBg = user.customColors?.bg;
  const customTextColor = user.customColors?.text;

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

  const pageStyle: React.CSSProperties = {
    background: pageBackground,
    color: customTextColor || 'var(--ink)',
  };

  return (
    <div
      data-theme={user.themeId || 'bordeaux-honey'}
      style={pageStyle}
      className="min-h-screen font-sans transition-colors duration-200 scroll-smooth overflow-x-hidden flex flex-col justify-between py-10 px-4 sm:px-6"
    >
      {/* ── Main Bio Content ── */}
      <main className="mx-auto max-w-[480px] w-full flex flex-col items-center gap-6 my-auto">
        {/* Avatar */}
        {user.avatarUrl && !avatarError ? (
          <div className="w-24 h-24 rounded-full border-2 border-current/20 shadow-xl overflow-hidden ring-4 ring-current/10 transition-all hover:scale-105">
            <img
              src={user.avatarUrl}
              alt={user.name || user.username}
              onError={() => setAvatarError(true)}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full border-2 border-current/20 shadow-xl bg-[#E09F3E] text-[#230E01] flex items-center justify-center ring-4 ring-current/10 transition-all">
            <span className="text-3xl font-black">{(user.name || user.username || 'U')[0].toUpperCase()}</span>
          </div>
        )}

        {/* Name + Pro Badge + Bio */}
        <div className="text-center space-y-2">
          <div className="flex flex-col items-center gap-1.5">
            <h1
              className="text-2xl font-black tracking-tight"
              style={{ color: customTextColor || 'inherit' }}
            >
              {user.name || user.username}
            </h1>
            {showProBadge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-[#E09F3E]/20 text-[#E09F3E] border border-[#E09F3E]/40 shadow-xs">
                <HugeiconsIcon icon={SparklesIcon} size={11} />
                Pro Creator
              </span>
            )}
          </div>
          {user.bio && (
            <p
              className="text-sm font-medium max-w-sm leading-relaxed opacity-85"
              style={{ color: customTextColor || 'inherit' }}
            >
              {user.bio}
            </p>
          )}
        </div>

        {/* Social icons at TOP */}
        {hasSocials && socialPosition === 'top' && (
          <SocialIconsRow
            socialLinks={user.socialLinks}
            customButtonColor={user.customColors?.button}
          />
        )}

        {/* Pinned link (Always spans full width as Hero) */}
        {pinned && (
          <div className="w-full">
            <LinkBlock link={pinned} pinned customColors={user.customColors} />
          </div>
        )}

        {/* ── Dynamic Layout Engine ── */}
        {layoutStyle === 'bento' ? (
          /* Bento Spatial 2-Column Mosaic */
          <div className="w-full grid grid-cols-2 gap-3.5">
            {others.map((link, idx) => {
              if (link.type === 'email_signup') {
                return (
                  <div key={link.id} className="col-span-2">
                    <EmailSignupBlock link={link} userId={user.id} />
                  </div>
                );
              }
              // If odd number of standard links and this is the last one, span 2 columns
              const isLastOdd = idx === others.length - 1 && others.length % 2 === 1;
              return (
                <div key={link.id} className={isLastOdd ? 'col-span-2' : 'col-span-1'}>
                  <LinkBlock
                    link={link}
                    isBentoTile={!isLastOdd}
                    customColors={user.customColors}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          /* Classic Stack & Haute Editorial */
          <div className="w-full flex flex-col gap-3.5">
            {others.map((link, idx) =>
              link.type === 'email_signup' ? (
                <EmailSignupBlock key={link.id} link={link} userId={user.id} />
              ) : (
                <LinkBlock
                  key={link.id}
                  link={link}
                  index={idx}
                  customColors={user.customColors}
                />
              )
            )}
          </div>
        )}

        {/* Social icons at BOTTOM */}
        {hasSocials && socialPosition === 'bottom' && (
          <SocialIconsRow
            socialLinks={user.socialLinks}
            customButtonColor={user.customColors?.button}
          />
        )}

        {/* Footer */}
        <footer className="mt-8 text-xs font-semibold opacity-60 flex items-center gap-1.5">
          <span>Powered by</span>
          <a
            href="/"
            className="font-bold underline underline-offset-2 hover:opacity-100 transition-opacity"
            style={{ color: customTextColor || 'inherit' }}
          >
            Lookup
          </a>
        </footer>
      </main>
    </div>
  );
}
