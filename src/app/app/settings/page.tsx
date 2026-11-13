'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { toast } from 'react-hot-toast';
import { LUXURY_THEMES } from '@/components/editor/DesignEditor';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  UserIcon,
  PaintBoardIcon,
  Shield01Icon,
  Tick01Icon,
  FloppyDiskIcon,
  Search01Icon,
  Globe02Icon,
} from '@hugeicons/core-free-icons';
import { signOut } from 'next-auth/react';

interface UserProfile {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  themeId: string;
  fontId: string;
  bgType: string;
  socialLinks: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(setProfile);
  }, []);

  function update(key: string, val: unknown) {
    setProfile(p => (p ? { ...p, [key]: val } : p));
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) toast.success('Settings saved successfully!');
      else toast.error('Failed to save settings.');
    } catch {
      toast.error('Network error saving settings.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    const confirmation = prompt('Type DELETE to permanently erase your account and all associated links:');
    if (confirmation !== 'DELETE') return;
    setDeleting(true);
    try {
      const res = await fetch('/api/user/profile', { method: 'DELETE' });
      if (res.ok) {
        toast.success('Account deleted.');
        signOut({ callbackUrl: '/' });
      } else {
        toast.error('Failed to delete account.');
      }
    } finally {
      setDeleting(false);
    }
  }

  if (!profile) {
    return (
      <div className="p-8 max-w-4xl w-full mx-auto font-sans text-sm text-[#766050]">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden p-6 sm:p-8 w-full font-sans">
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        {/* ── Header Row ── */}
      <div className="flex items-center justify-between pb-4 border-b border-[#540B0E]/10">
        <div>
          <h1 className="text-2xl font-black text-[#540B0E] tracking-tight">Account Settings</h1>
          <p className="text-xs text-[#766050] mt-0.5">
            Manage your profile details, default themes, and account security.
          </p>
        </div>
        <Button size="sm" onClick={handleSave} loading={saving}>
          <HugeiconsIcon icon={FloppyDiskIcon} size={15} />
          <span>Save Changes</span>
        </Button>
      </div>

      {/* ── Profile Information ── */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#540B0E]/10">
          <HugeiconsIcon icon={UserIcon} size={18} className="text-[#E09F3E]" />
          <h2 className="text-base font-bold text-[#540B0E]">Profile Details</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Display Name"
            value={profile.name || ''}
            onChange={e => update('name', e.target.value)}
            placeholder="Your Name or Brand"
          />

          <div>
            <label className="text-xs font-bold text-[#540B0E] block mb-1.5">Username</label>
            <input
              type="text"
              readOnly
              value={profile.username || ''}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#540B0E]/15 bg-[#FAF7EE] text-sm font-semibold text-[#766050] outline-none cursor-not-allowed select-none"
            />
            <span className="text-[10px] text-[#766050] mt-1 block">Username cannot be changed.</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#540B0E] block mb-1.5">Bio Description</label>
          <textarea
            value={profile.bio || ''}
            onChange={e => update('bio', e.target.value)}
            maxLength={160}
            rows={3}
            placeholder="Brief description about yourself..."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#540B0E]/15 bg-white focus:outline-none focus:border-[#E09F3E] focus:ring-2 focus:ring-[#E09F3E]/20 text-[#25150E] resize-none leading-relaxed"
          />
          <div className="flex justify-end text-[11px] font-mono text-[#766050]">
            {(profile.bio || '').length}/160
          </div>
        </div>

        <ImageUpload
          value={profile.avatarUrl || ''}
          onChange={url => update('avatarUrl', url)}
          label="Profile Photo"
          helperText="Upload your avatar image (JPEG, PNG, WebP up to 5MB)."
        />
      </section>

      {/* ── Theme & Appearance ── */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#540B0E]/10">
          <HugeiconsIcon icon={PaintBoardIcon} size={18} className="text-[#E09F3E]" />
          <h2 className="text-base font-bold text-[#540B0E]">Default Theme</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {LUXURY_THEMES.map(theme => {
            const isSelected = profile.themeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => update('themeId', theme.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-[#E09F3E] ring-2 ring-[#E09F3E]/30 bg-[#FAF7EE]'
                    : 'border-[#540B0E]/12 bg-white hover:border-[#E09F3E]/50'
                }`}
              >
                <div
                  className="w-full h-12 rounded-xl flex items-center justify-center p-2 mb-2 relative"
                  style={{ backgroundColor: theme.bg }}
                >
                  <div
                    className="w-full py-1 rounded text-center text-[10px] font-bold"
                    style={{ backgroundColor: theme.accent, color: '#230E01' }}
                  >
                    Theme
                  </div>
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E09F3E] text-[#230E01] flex items-center justify-center">
                      <HugeiconsIcon icon={Tick01Icon} size={10} />
                    </div>
                  )}
                </div>
                <div className="text-xs font-bold text-[#540B0E]">{theme.name}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── SEO & Social Sharing Previews (Linktree Pro) ── */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#540B0E]/10">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Search01Icon} size={18} className="text-[#335C67]" />
            <div>
              <h2 className="text-base font-bold text-[#540B0E]">Custom SEO & Social Sharing</h2>
              <p className="text-xs text-[#766050] mt-0.5">
                Control how your profile appears on Google, Twitter, LinkedIn, and messaging apps.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#335C67] bg-[#335C67]/10 px-2.5 py-1 rounded-full">
            Pro Metadata
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#540B0E]">Custom SEO Title</label>
              <span className="text-[10px] font-mono text-[#766050]">
                {(profile.seoTitle || '').length}/60
              </span>
            </div>
            <input
              type="text"
              maxLength={60}
              value={profile.seoTitle || ''}
              onChange={e => update('seoTitle', e.target.value)}
              placeholder={`${profile.name || profile.username} | Official Portfolio & Bio`}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#540B0E]/15 bg-white focus:outline-none focus:border-[#E09F3E] focus:ring-2 focus:ring-[#E09F3E]/20 text-[#25150E]"
            />
            <p className="text-[10px] text-[#766050] mt-1">
              Leave blank to use default: &ldquo;{profile.name || profile.username} (@{profile.username}) | Lookup&rdquo;
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#540B0E]">Custom Meta Description</label>
              <span className="text-[10px] font-mono text-[#766050]">
                {(profile.seoDescription || '').length}/160
              </span>
            </div>
            <textarea
              rows={2}
              maxLength={160}
              value={profile.seoDescription || ''}
              onChange={e => update('seoDescription', e.target.value)}
              placeholder="Explore links, creative releases, contact details, and exclusive projects..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#540B0E]/15 bg-white focus:outline-none focus:border-[#E09F3E] focus:ring-2 focus:ring-[#E09F3E]/20 text-[#25150E] resize-none leading-relaxed"
            />
            <p className="text-[10px] text-[#766050] mt-1">
              Shown beneath your page link in Google results and chat bubbles.
            </p>
          </div>
        </div>

        {/* Live Search & Social Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Google Search Result Preview */}
          <div className="bg-[#FAF7EE]/60 rounded-2xl p-4 border border-[#540B0E]/10 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#335C67] uppercase tracking-wider">
              <HugeiconsIcon icon={Globe02Icon} size={13} />
              <span>Google Search Result Preview</span>
            </div>
            <div className="bg-white rounded-xl p-3.5 border border-[#540B0E]/10 space-y-1 font-sans">
              <div className="text-[11px] text-[#555] truncate">
                https://lookup.bio &gt; {profile.username}
              </div>
              <div className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer truncate">
                {profile.seoTitle || (profile.name ? `${profile.name} (@${profile.username}) | Lookup` : `@${profile.username} | Lookup`)}
              </div>
              <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                {profile.seoDescription || profile.bio || `Explore ${profile.name || profile.username}'s links, creative portfolios, and exclusive projects on Lookup.`}
              </p>
            </div>
          </div>

          {/* Social Share Card Preview */}
          <div className="bg-[#FAF7EE]/60 rounded-2xl p-4 border border-[#540B0E]/10 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#E09F3E] uppercase tracking-wider">
              <HugeiconsIcon icon={Search01Icon} size={13} />
              <span>Social Share Card Preview (iMessage / X / LinkedIn)</span>
            </div>
            <div className="bg-white rounded-xl overflow-hidden border border-[#540B0E]/10 font-sans shadow-2xs">
              <div className="h-16 bg-gradient-to-r from-[#540B0E] via-[#9E2A2B] to-[#E09F3E] flex items-center px-4 gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-xs flex items-center justify-center text-white font-black text-sm">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    (profile.name || profile.username || 'U')[0].toUpperCase()
                  )}
                </div>
                <div className="min-w-0 text-white">
                  <div className="text-xs font-black truncate">{profile.name || profile.username}</div>
                  <div className="text-[10px] text-[#FFF3B0] font-mono">lookup.bio/{profile.username}</div>
                </div>
              </div>
              <div className="p-3 space-y-1">
                <div className="text-xs font-bold text-[#540B0E] truncate">
                  {profile.seoTitle || (profile.name ? `${profile.name} (@${profile.username})` : `@${profile.username}`)}
                </div>
                <p className="text-[11px] text-[#766050] line-clamp-2 leading-tight">
                  {profile.seoDescription || profile.bio || `Official bio and curated links.`}
                </p>
                <div className="text-[10px] font-mono text-[#766050]/80 pt-1">lookup.bio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Danger Zone ── */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#9E2A2B]/20 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#9E2A2B]/15">
          <HugeiconsIcon icon={Shield01Icon} size={18} className="text-[#9E2A2B]" />
          <h2 className="text-base font-bold text-[#9E2A2B]">Danger Zone</h2>
        </div>
        <p className="text-xs text-[#766050] leading-relaxed">
          Permanently delete your profile, public bio page, links, and collected audience subscribers. This action is irreversible.
        </p>
        <div className="pt-2">
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={handleDeleteAccount}
            loading={deleting}
          >
            Delete Account
          </Button>
        </div>
      </section>
      </div>
    </div>
  );
}
