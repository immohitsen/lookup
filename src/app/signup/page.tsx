'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { isValidEmail } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, Tick01Icon, Loading01Icon } from '@hugeicons/core-free-icons';
import { signInWithGoogle } from '@/app/actions/auth';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGoogleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGoogleLoading(true);
    setError('');
    try {
      await signInWithGoogle('/onboarding');
    } catch (err) {
      if ((err as Error)?.message?.includes('NEXT_REDIRECT')) {
        return;
      }
      console.error('Google Sign In Error:', err);
      try {
        await signIn('google', { callbackUrl: '/onboarding' });
      } catch (fallbackErr) {
        setGoogleLoading(false);
        setError('Failed to connect to Google. If using mobile LAN IP, please use email sign-in or check Google Cloud redirect URIs.');
      }
    }
  }

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await signIn('credentials', {
        email,
        callbackUrl: '/onboarding',
        redirect: false,
      });
      if (res?.error) {
        setError('Unable to create account. Please check your connection and try again.');
      } else if (res?.ok) {
        window.location.href = '/onboarding';
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7EE] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#E09F3E] text-[#230E01] flex items-center justify-center font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
              L
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#540B0E]">LOOKUP</span>
          </Link>
          <p className="text-[#766050] text-sm font-medium">Create your premium link in bio in 3 minutes</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#540B0E]/12 shadow-xl p-6 sm:p-8 space-y-5">
          {/* Google Sign In */}
          <form onSubmit={handleGoogleSubmit}>
            <button
              type="submit"
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-[#540B0E]/15 font-bold text-sm text-[#540B0E] bg-white hover:bg-[#FAF7EE] hover:border-[#E09F3E] active:scale-[0.98] transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <>
                  <HugeiconsIcon icon={Loading01Icon} size={18} className="animate-spin text-[#E09F3E]" />
                  <span>Connecting to Google...</span>
                </>
              ) : (
                <>
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-[#540B0E]/10" />
            <span className="text-[#766050] text-[11px] font-bold tracking-wider">OR EMAIL</span>
            <div className="flex-1 border-t border-[#540B0E]/10" />
          </div>

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#540B0E] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading || googleLoading}
                className="w-full px-4 py-3 text-sm rounded-xl text-[#25150E] bg-white border border-[#540B0E]/15 placeholder:text-[#766050]/40 focus:outline-none focus:border-[#E09F3E] focus:ring-2 focus:ring-[#E09F3E]/20 transition-all font-medium disabled:opacity-60"
              />
              {error && (
                <div className="p-3 mt-2 rounded-xl bg-[#9E2A2B]/10 border border-[#9E2A2B]/20 text-[#9E2A2B] text-xs font-semibold leading-relaxed">
                  {error}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full px-4 py-3.5 rounded-xl font-bold text-sm text-[#230E01] bg-[#E09F3E] shadow-[0_4px_14px_rgba(224,159,62,0.35)] hover:brightness-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <HugeiconsIcon icon={Loading01Icon} size={16} className="animate-spin text-[#230E01]" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create My Free Page</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 flex items-center justify-between text-xs text-[#766050] font-medium border-t border-[#540B0E]/10">
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Tick01Icon} size={13} className="text-[#540B0E]" /> Free forever
            </span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Tick01Icon} size={13} className="text-[#540B0E]" /> No credit card
            </span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Tick01Icon} size={13} className="text-[#540B0E]" /> 0% commissions
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-[#766050] font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-[#540B0E] font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
