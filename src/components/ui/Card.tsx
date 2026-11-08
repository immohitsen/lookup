import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'flat';
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface border-[3px] border-ink p-4',
        variant === 'default' && 'shadow-pixel',
        variant === 'accent' && 'shadow-pixel-accent border-accent',
        variant === 'flat' && '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
