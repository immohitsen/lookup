'use client';
import { useState } from 'react';
import { isValidEmail } from '@/lib/utils';

interface Props {
  link: { id: string; title: string; config: Record<string, unknown> };
  userId: string;
}

export function EmailSignupBlock({ link, userId }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const buttonText = (link.config?.buttonText as string) || 'Subscribe';
  const thankYou = (link.config?.thankYou as string) || 'Thanks for subscribing! 🎉';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) { setMsg('Enter a valid email.'); setState('error'); return; }
    setLoading(true);
    const res = await fetch('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, userId, source: document.referrer || 'direct' }),
    });
    setLoading(false);
    if (res.ok) { setState('success'); setMsg(thankYou); }
    else { const d = await res.json(); setState('error'); setMsg(d.error || 'Something went wrong.'); }
  }

  if (state === 'success') {
    return (
      <div className="w-full px-5 py-4 rounded-xl border border-[#335C67]/30 bg-surface shadow-sm text-center space-y-1 font-sans">
        <div className="text-2xl">🎉</div>
        <p className="text-sm font-semibold text-ink">{msg}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-5 py-4 rounded-xl border border-current/15 bg-surface shadow-sm space-y-3 font-sans">
      <p className="text-sm font-bold text-ink">{link.title || 'Join my newsletter'}</p>
      {/* Honeypot */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email..."
          required
          className="w-full px-3.5 py-2.5 text-sm rounded-lg text-ink bg-transparent border border-current/20 placeholder:text-muted focus:outline-none focus:border-[#E09F3E]"
        />
        {state === 'error' && <p className="text-[#9E2A2B] text-xs font-semibold">{msg}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-[#E09F3E] text-[#230E01] font-bold text-sm shadow-sm hover:brightness-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? 'Subscribing...' : buttonText}
        </button>
      </form>
    </div>
  );
}
