'use client';
import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from '@/lib/clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5 font-sans">
        {label && (
          <label htmlFor={inputId} className="text-xs font-bold text-[#540B0E]">
            {label}
          </label>
        )}
        <div className="relative flex rounded-xl overflow-hidden border border-[#540B0E]/15 focus-within:border-[#E09F3E] focus-within:ring-2 focus-within:ring-[#E09F3E]/20 transition-all bg-white">
          {prefix && (
            <span className="flex items-center px-3.5 bg-[#FAF7EE] border-r border-[#540B0E]/10 text-[#766050] text-sm font-semibold select-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'flex-1 px-3.5 py-2.5 text-sm text-[#25150E] bg-transparent',
              'placeholder:text-[#766050]/50 font-sans',
              'focus:outline-none',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-[#9E2A2B] text-xs font-semibold">{error}</p>}
        {hint && !error && <p className="text-[#766050] text-xs">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
