import { HTMLAttributes } from 'react';
import { clsx } from '@/lib/clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'flat';
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface rounded-2xl border border-[#540B0E]/12 p-5 transition-all',
        variant === 'default' && 'shadow-sm hover:shadow-md',
        variant === 'accent' && 'border-[#E09F3E]/40 shadow-[0_4px_20px_rgba(224,159,62,0.15)]',
        variant === 'flat' && 'shadow-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
