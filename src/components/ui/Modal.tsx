'use client';
import { useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-3xl border border-[#540B0E]/15 shadow-2xl w-full max-w-lg overflow-hidden font-sans">
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#540B0E]/10 bg-[#FAF7EE]/60">
            <h2 className="text-base font-bold text-[#540B0E]">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#766050] hover:text-[#540B0E] hover:bg-black/5 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
