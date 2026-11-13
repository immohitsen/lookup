// Detect traffic source from referrer / UTM
export function detectSource(referer: string | null, searchParams: URLSearchParams): string {
  const utm = searchParams.get('utm_source')?.toLowerCase();
  if (utm) {
    if (utm.includes('instagram')) return 'instagram';
    if (utm.includes('tiktok')) return 'tiktok';
    if (utm.includes('youtube')) return 'youtube';
    return 'other';
  }
  if (!referer) return 'direct';
  if (referer.includes('instagram.com') || referer.includes('l.instagram.com')) return 'instagram';
  if (referer.includes('tiktok.com')) return 'tiktok';
  if (referer.includes('youtube.com') || referer.includes('youtu.be')) return 'youtube';
  if (referer.includes('t.co') || referer.includes('twitter.com')) return 'other';
  return 'other';
}

// Detect device type from UA string
export function detectDevice(ua: string): 'mobile' | 'tablet' | 'desktop' {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

// Normalize a URL — ensure it starts with https://
export function normalizeUrl(url: string): string {
  if (!url) return '';
  url = url.trim();
  if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('sms:')) return url;
  if (!/^https?:\/\//i.test(url)) return `https://${url}`;
  return url;
}

// Slugify a string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Format numbers for display (1200 → 1.2K)
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

// Get date ranges
export function getDateRange(range: '7d' | '30d' | 'all'): Date | null {
  if (range === 'all') return null;
  const d = new Date();
  d.setDate(d.getDate() - (range === '7d' ? 7 : 30));
  return d;
}

// Validate email
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

