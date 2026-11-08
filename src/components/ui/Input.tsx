'use client';
import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

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
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="font-pixel text-xs text-ink">
            {label}
          </label>
        )}
        <div className="relative flex">
          {prefix && (
            <span className="flex items-center px-3 border-[3px] border-r-0 border-ink bg-paper text-muted text-sm font-mono">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'flex-1 px-3 py-2.5 text-sm text-ink bg-surface',
              'border-[3px] border-ink',
              'shadow-[inset_2px_2px_0_rgba(0,0,0,0.15)]',
              'placeholder:text-muted font-body',
              'focus:outline-none focus:border-accent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-danger',
              prefix && 'border-l-0',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-danger text-xs font-body">{error}</p>}
        {hint && !error && <p className="text-muted text-xs font-body">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
