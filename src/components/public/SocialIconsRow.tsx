'use client';
import React from 'react';

export interface SocialPlatform {
  id: string;
  name: string;
  placeholder: string;
  prefix: string;
  formatUrl: (input: string) => string;
  icon: (props: { className?: string; size?: number }) => React.ReactElement;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    placeholder: 'username',
    prefix: 'instagram.com/',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://instagram.com/${v.replace(/^@/, '')}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    placeholder: 'username',
    prefix: 'x.com/',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://x.com/${v.replace(/^@/, '')}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    placeholder: 'username',
    prefix: 'tiktok.com/@',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://tiktok.com/@${v.replace(/^@/, '')}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    placeholder: '@channel',
    prefix: 'youtube.com/@',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://youtube.com/@${v.replace(/^@/, '')}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: 'spotify',
    name: 'Spotify',
    placeholder: 'artist / show / user URL',
    prefix: 'spotify.com/',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://open.spotify.com/user/${v}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308a.747.747 0 0 1-1.028.248c-2.815-1.72-6.36-2.11-10.533-1.157a.75.75 0 1 1-.334-1.463c4.568-1.044 8.498-.597 11.647 1.344.364.223.477.701.248 1.028zm1.47-3.268a.937.937 0 0 1-1.29.308c-3.223-1.98-8.136-2.553-11.948-1.396a.937.937 0 1 1-.546-1.792c4.358-1.323 9.775-.684 13.476 1.59a.938.938 0 0 1 .308 1.29zm.126-3.41c-3.865-2.295-10.237-2.508-13.92-1.389a1.125 1.125 0 1 1-.655-2.153c4.234-1.286 11.278-1.037 15.729 1.606a1.125 1.125 0 0 1-1.154 1.936z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    placeholder: 'in/username',
    prefix: 'linkedin.com/in/',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://linkedin.com/in/${v.replace(/^@/, '')}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    placeholder: 'username',
    prefix: 'github.com/',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://github.com/${v.replace(/^@/, '')}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'twitch',
    name: 'Twitch',
    placeholder: 'username',
    prefix: 'twitch.tv/',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://twitch.tv/${v.replace(/^@/, '')}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
      </svg>
    ),
  },
  {
    id: 'discord',
    name: 'Discord',
    placeholder: 'invite code or server URL',
    prefix: 'discord.gg/',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://discord.gg/${v}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    id: 'substack',
    name: 'Substack',
    placeholder: 'publication.substack.com',
    prefix: '.substack.com',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://${v.replace(/\.substack\.com$/, '')}.substack.com`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    placeholder: 'phone number with country code',
    prefix: 'wa.me/',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://wa.me/${v.replace(/[^0-9]/g, '')}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
      </svg>
    ),
  },
  {
    id: 'telegram',
    name: 'Telegram',
    placeholder: 'username',
    prefix: 't.me/',
    formatUrl: (v) => (v.startsWith('http') ? v : `https://t.me/${v.replace(/^@/, '')}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    id: 'email',
    name: 'Email',
    placeholder: 'your@email.com',
    prefix: 'mailto:',
    formatUrl: (v) => (v.startsWith('mailto:') ? v : `mailto:${v}`),
    icon: ({ className = 'w-5 h-5' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export const PLATFORM_MAP = new Map(SOCIAL_PLATFORMS.map(p => [p.id, p]));

interface Props {
  socialLinks?: Record<string, string> | Map<string, string>;
  customButtonColor?: string;
}

export function SocialIconsRow({ socialLinks, customButtonColor }: Props) {
  if (!socialLinks) return null;

  const rawEntries =
    socialLinks instanceof Map
      ? Array.from(socialLinks.entries())
      : Object.entries(socialLinks);

  const entries = rawEntries.filter(([, v]) => v && typeof v === 'string' && v.trim().length > 0);
  if (!entries.length) return null;

  return (
    <div className="flex gap-2.5 flex-wrap justify-center items-center py-1">
      {entries.map(([platformKey, val]) => {
        const platform = PLATFORM_MAP.get(platformKey);
        if (!platform) return null;
        const href = platform.formatUrl(val);

        return (
          <a
            key={platformKey}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-current/20 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:scale-105 active:scale-95"
            style={{
              backgroundColor: customButtonColor ? customButtonColor : 'var(--surface)',
              color: 'var(--ink)',
            }}
            aria-label={platform.name}
            title={platform.name}
          >
            {platform.icon({ className: 'w-4.5 h-4.5' })}
          </a>
        );
      })}
    </div>
  );
}
