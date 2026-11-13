'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, Tick01Icon } from '@hugeicons/core-free-icons';

const THEMES = [
  { id: 'bordeaux-honey',  name: 'Bordeaux & Honey', color: '#E09F3E', bg: '#140305' },
  { id: 'vanilla-custard', name: 'Vanilla Custard',  color: '#540B0E', bg: '#FAF7EE' },
  { id: 'slate-grey',      name: 'Dark Slate Grey',  color: '#335C67', bg: '#132227' },
  { id: 'brown-red',       name: 'Brown Red',        color: '#9E2A2B', bg: '#1C0708' },
  { id: 'night-bordeaux',  name: 'Night Bordeaux',   color: '#540B0E', bg: '#540B0E' },
  { id: 'honey-amber',     name: 'Honey Amber',      color: '#E09F3E', bg: '#190C03' },
];

type Step = 'profile' | 'theme' | 'link';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [theme, setTheme] = useState('bordeaux-honey');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const steps: Step[] = ['profile', 'theme', 'link'];
  const stepIdx = steps.indexOf(step);

  async function checkUsername(val: string) {
    setUsername(val);
    if (val.length < 3) return;
    const res = await fetch(`/api/user/check-username?username=${val}`);
    const data = await res.json();
    if (!data.available) setError('Username taken. Try another.');
    else setError('');
  }

  async function handleFinish() {
    setLoading(true);
    try {
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name, bio, avatarUrl, themeId: theme }),
      });
      if (linkTitle && linkUrl) {
        await fetch('/api/links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: linkTitle, url: linkUrl, type: 'link' }),
        });
      }
      router.push('/app/home');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7EE] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md space-y-6">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-all ${
                i <= stepIdx ? 'bg-[#E09F3E]' : 'bg-[#540B0E]/10'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#540B0E]/12 shadow-xl p-8 space-y-6">
          {step === 'profile' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#540B0E] tracking-tight">Claim your handle</h2>
                <p className="text-sm text-[#766050] font-medium">Choose your permanent public Lookup link</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#540B0E] mb-1.5">USERNAME</label>
                <div className="flex rounded-xl overflow-hidden border border-[#540B0E]/15 focus-within:border-[#E09F3E] focus-within:ring-2 focus-within:ring-[#E09F3E]/20 transition-all bg-white">
                  <span className="flex items-center px-3.5 bg-[#FAF7EE] border-r border-[#540B0E]/10 text-[#766050] text-sm font-semibold select-none">
                    lookup.bio/
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={e => checkUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="yourname"
                    required
                    className="flex-1 px-3.5 py-2.5 text-sm text-[#25150E] font-semibold bg-transparent focus:outline-none"
                  />
                </div>
                {error && <p className="text-[#9E2A2B] text-xs font-semibold mt-1">{error}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#540B0E] mb-1.5">DISPLAY NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#540B0E]/15 focus:outline-none focus:border-[#E09F3E] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#540B0E] mb-1.5">BIO</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Creator, designer, storyteller..."
                  maxLength={160}
                  rows={2}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#540B0E]/15 focus:outline-none focus:border-[#E09F3E] font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#540B0E] mb-1.5">PROFILE PHOTO URL</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={e => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#540B0E]/15 focus:outline-none focus:border-[#E09F3E] font-medium"
                />
              </div>

              <button
                disabled={!username || !!error}
                onClick={() => setStep('theme')}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-[#230E01] bg-[#E09F3E] shadow-[0_4px_14px_rgba(224,159,62,0.35)] hover:brightness-105 active:scale-95 transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Theme</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
              </button>
            </div>
          )}

          {step === 'theme' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-extrabold text-[#540B0E] tracking-tight">Pick your signature theme</h2>
                <p className="text-sm text-[#766050] font-medium">Curated from the luxury editorial palette</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                      theme === t.id
                        ? 'border-[#E09F3E] shadow-md bg-[#FAF7EE] ring-2 ring-[#E09F3E]/30'
                        : 'border-[#540B0E]/10 bg-white hover:border-[#540B0E]/20'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full border border-black/30 shadow-sm" style={{ background: t.color }} />
                    <span className="font-bold text-xs text-[#540B0E]">{t.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('profile')}
                  className="flex-1 py-3 rounded-xl border border-[#540B0E]/15 font-semibold text-sm text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE] transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('link')}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-[#230E01] bg-[#E09F3E] shadow-[0_4px_14px_rgba(224,159,62,0.35)] hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  Next: Add Link
                </button>
              </div>
            </div>
          )}

          {step === 'link' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#540B0E] tracking-tight">Add your primary link</h2>
                <p className="text-sm text-[#766050] font-medium">Your most important destination</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#540B0E] mb-1.5">LINK TITLE</label>
                <input
                  type="text"
                  value={linkTitle}
                  onChange={e => setLinkTitle(e.target.value)}
                  placeholder="My Portfolio / Latest Video / Merch"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#540B0E]/15 focus:outline-none focus:border-[#E09F3E] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#540B0E] mb-1.5">DESTINATION URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={e => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#540B0E]/15 focus:outline-none focus:border-[#E09F3E] font-medium"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep('theme')}
                  className="flex-1 py-3 rounded-xl border border-[#540B0E]/15 font-semibold text-sm text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE] transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-[#230E01] bg-[#E09F3E] shadow-[0_4px_14px_rgba(224,159,62,0.35)] hover:brightness-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Launching...' : 'Launch Bio →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
