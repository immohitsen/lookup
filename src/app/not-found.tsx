import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, Compass01Icon } from '@hugeicons/core-free-icons';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF7EE] flex flex-col items-center justify-center p-6 font-sans text-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#540B0E]/12 shadow-xl p-8 sm:p-10 space-y-6">
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#540B0E] text-[#FFF3B0] mx-auto flex items-center justify-center shadow-md">
          <HugeiconsIcon icon={Compass01Icon} size={32} className="text-[#E09F3E]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#E09F3E]">
            404 • Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#540B0E] tracking-tight">
            This handle is unclaimed.
          </h1>
          <p className="text-xs sm:text-sm text-[#766050] leading-relaxed">
            The page or bio you were looking for doesn't exist yet. Claim this name and build your luxury bio in minutes.
          </p>
        </div>

        <div className="pt-2 space-y-2.5">
          <Link
            href="/signup"
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-[#230E01] bg-[#E09F3E] shadow-[0_4px_14px_rgba(224,159,62,0.35)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Claim Your Free Handle</span>
            <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
          </Link>
          <Link
            href="/"
            className="w-full py-2.5 px-6 rounded-xl font-semibold text-xs text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE] transition-all block"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

