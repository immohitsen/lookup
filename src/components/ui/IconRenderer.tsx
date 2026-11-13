'use client';
import { HugeiconsIcon } from '@hugeicons/react';
import { HUGEICONS_MAP } from '@/lib/hugeiconsRegistry';
import { Link01Icon } from '@hugeicons/core-free-icons';

interface Props {
  icon?: string | null | any;
  size?: number;
  className?: string;
}

export function IconRenderer({ icon, size = 18, className = '' }: Props) {
  if (!icon) {
    return <HugeiconsIcon icon={Link01Icon} size={size} className={className} />;
  }

  // If icon is already a Hugeicons icon definition object
  if (typeof icon === 'object' && icon !== null) {
    return <HugeiconsIcon icon={icon} size={size} className={className} />;
  }

  if (typeof icon === 'string') {
    const trimmed = icon.trim();

    // Check if it's a registered Hugeicon key
    const hugeIcon = HUGEICONS_MAP.get(trimmed.toLowerCase());
    if (hugeIcon) {
      return <HugeiconsIcon icon={hugeIcon} size={size} className={className} />;
    }

    // Check if it's an emoji (or non-ascii symbol)
    if (/[\p{Emoji}\u2000-\u3300]/u.test(trimmed)) {
      return <span className="text-base select-none">{trimmed}</span>;
    }

    // Return default link icon
    return <HugeiconsIcon icon={Link01Icon} size={size} className={className} />;
  }

  return <HugeiconsIcon icon={Link01Icon} size={size} className={className} />;
}

