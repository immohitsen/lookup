'use client';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from '@/lib/clsx';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:   'bg-[#E09F3E] text-[#230E01] font-bold shadow-[0_4px_14px_rgba(224,159,62,0.35)] hover:brightness-105 active:scale-95 transition-all',
  secondary: 'bg-white text-[#540B0E] font-semibold border border-[#540B0E]/15 shadow-sm hover:border-[#E09F3E] hover:bg-[#FAF7EE] active:scale-95 transition-all',
  danger:    'bg-[#9E2A2B] text-[#FFF3B0] font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all',
  ghost:     'bg-transparent text-[#766050] hover:text-[#540B0E] hover:bg-[#540B0E]/5 font-semibold transition-all',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center gap-2',
          'font-sans transition-all cursor-pointer select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : children}
      </button>
    );
  }
);
Button.displayName = 'Button';
