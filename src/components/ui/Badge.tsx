import { clsx } from '@/lib/clsx';

type BadgeColor = 'default' | 'accent' | 'slate' | 'honey' | 'danger';

const colorMap: Record<BadgeColor, string> = {
  default: 'bg-[#540B0E]/10 text-[#540B0E] border-[#540B0E]/15',
  accent:  'bg-[#E09F3E]/15 text-[#E09F3E] border-[#E09F3E]/30',
  slate:   'bg-[#335C67]/15 text-[#335C67] border-[#335C67]/30',
  honey:   'bg-[#E09F3E] text-[#230E01] border-[#E09F3E]',
  danger:  'bg-[#9E2A2B]/15 text-[#9E2A2B] border-[#9E2A2B]/30',
};

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

export function Badge({ children, color = 'default', className }: BadgeProps) {
  return (
    <span className={clsx('inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border', colorMap[color], className)}>
      {children}
    </span>
  );
}
