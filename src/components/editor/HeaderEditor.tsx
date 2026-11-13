'use client';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Add01Icon,
  Camera01Icon,
  SparklesIcon,
  DicesIcon,
  Tick01Icon,
  Link01Icon,
} from '@hugeicons/core-free-icons';
import { SocialsEditor } from './SocialsEditor';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/ui/ImageUpload';

interface Props {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  socialPosition: 'top' | 'bottom';
  socialLinks: Record<string, string>;
  onChangeProfile: (updates: {
    name?: string;
    bio?: string;
    avatarUrl?: string;
    socialPosition?: 'top' | 'bottom';
    socialLinks?: Record<string, string>;
  }) => void;
}

const PRESET_3D_AVATARS = [
  // 3D Bottts / Tech Creators
  { id: '3d-1',  name: 'Cyber Felix',    url: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Felix&backgroundColor=e09f3e' },
  { id: '3d-2',  name: 'Astro Luna',     url: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Luna&backgroundColor=335c67' },
  { id: '3d-3',  name: 'Mecha Milo',     url: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Milo&backgroundColor=9e2a2b' },
  { id: '3d-4',  name: 'Neon Nova',      url: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Nova&backgroundColor=540b0e' },

  // 3D Lorelei Stylized Characters
  { id: '3d-5',  name: 'Creator Sophie', url: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Sophie&backgroundColor=fff3b0' },
  { id: '3d-6',  name: 'Artist Leo',     url: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Leo&backgroundColor=e09f3e' },
  { id: '3d-7',  name: 'Director Chloe', url: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Chloe&backgroundColor=335c67' },
  { id: '3d-8',  name: 'Designer Jasper',url: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Jasper&backgroundColor=9e2a2b' },

  // 3D Adventurers
  { id: '3d-9',  name: 'Explorer Alex',  url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex&backgroundColor=335c67' },
  { id: '3d-10', name: 'Nomad Maya',     url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Maya&backgroundColor=e09f3e' },
  { id: '3d-11', name: 'Pilot Jordan',   url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jordan&backgroundColor=540b0e' },
  { id: '3d-12', name: 'Gamer Riley',    url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Riley&backgroundColor=fff3b0' },

  // 3D Rendered Portrait Busts
  { id: '3d-13', name: 'Render Glow',    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80' },
  { id: '3d-14', name: 'Clay Hero',      url: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300&auto=format&fit=crop&q=80' },
  { id: '3d-15', name: 'Minimal 3D',     url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80' },
  { id: '3d-16', name: 'Studio Sculpt',  url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80' },
];

const SAMPLE_PHOTO_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
];

export function HeaderEditor({
  name,
  username,
  bio,
  avatarUrl,
  socialPosition,
  socialLinks,
  onChangeProfile,
}: Props) {
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'3d' | 'custom'>('3d');
  const [avatarInput, setAvatarInput] = useState(avatarUrl || '');
  const [generatorSeed, setGeneratorSeed] = useState(username || 'creator');
  const [generatorStyle, setGeneratorStyle] = useState<'bottts-neutral' | 'lorelei' | 'adventurer'>('adventurer');

  function handleSaveAvatar(selectedUrl?: string) {
    const finalUrl = (selectedUrl ?? avatarInput).trim();
    onChangeProfile({ avatarUrl: finalUrl });
    setAvatarModalOpen(false);
  }

  function handleRandomize3D() {
    const randomWords = ['cyber', 'zen', 'sol', 'echo', 'flux', 'vibe', 'pixel', 'star', 'nova', 'zenith'];
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const newSeed = `${randomWord}-${randomNum}`;
    setGeneratorSeed(newSeed);

    const generated = `https://api.dicebear.com/7.x/${generatorStyle}/svg?seed=${encodeURIComponent(
      newSeed
    )}&backgroundColor=e09f3e,335c67,540b0e,9e2a2b`;
    setAvatarInput(generated);
  }

  function handleSelectGeneratorStyle(style: 'bottts-neutral' | 'lorelei' | 'adventurer') {
    setGeneratorStyle(style);
    const generated = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(
      generatorSeed
    )}&backgroundColor=e09f3e,335c67,540b0e,9e2a2b`;
    setAvatarInput(generated);
  }

  return (
    <div className="space-y-6 font-sans">
      {/* ── Sub Header ── */}
      <div className="pb-4 border-b border-[#540B0E]/10">
        <h2 className="text-2xl font-black text-[#540B0E] tracking-tight">Header</h2>
        <p className="text-xs text-[#766050] mt-0.5">
          Customize your public photo, display name, bio description, and social presence.
        </p>
      </div>

      {/* ── Profile Image Row ── */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-[#540B0E]/12 bg-white">
        <div>
          <span className="text-sm font-bold text-[#540B0E]">Profile image</span>
          <p className="text-xs text-[#766050] mt-0.5">
            Choose a 3D animated character, custom photo, or upload URL.
          </p>
          <button
            type="button"
            onClick={() => {
              setAvatarInput(avatarUrl || '');
              setModalTab('3d');
              setAvatarModalOpen(true);
            }}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E09F3E]/40 bg-[#FAF7EE] text-[#540B0E] hover:bg-[#FAF7EE]/80 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <HugeiconsIcon icon={SparklesIcon} size={14} className="text-[#E09F3E]" />
            <span>Browse 3D Avatars & Photos</span>
          </button>
        </div>

        {/* Avatar with '+' badge */}
        <button
          type="button"
          onClick={() => {
            setAvatarInput(avatarUrl || '');
            setAvatarModalOpen(true);
          }}
          className="relative w-20 h-20 rounded-2xl border-2 border-dashed border-[#540B0E]/20 hover:border-[#E09F3E] bg-[#FAF7EE] flex items-center justify-center overflow-hidden group transition-all cursor-pointer shadow-sm flex-shrink-0"
          title="Change profile image"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#E09F3E] text-[#230E01] flex items-center justify-center font-black text-2xl">
              {(name || username || 'U')[0]?.toUpperCase()}
            </div>
          )}

          {/* Plus icon pill overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
            <HugeiconsIcon icon={Camera01Icon} size={20} />
          </div>

          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white border border-[#540B0E]/20 shadow-md flex items-center justify-center text-[#540B0E]">
            <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2.5} />
          </div>
        </button>
      </div>

      {/* ── Title Input with 30 char limit ── */}
      <div className="p-4 rounded-2xl border border-[#540B0E]/12 bg-white space-y-1.5">
        <label className="text-sm font-bold text-[#540B0E]">Title / Display Name</label>
        <div className="relative">
          <input
            type="text"
            maxLength={30}
            value={name}
            onChange={e => onChangeProfile({ name: e.target.value })}
            placeholder={username || 'Your Name or Brand'}
            className="w-full px-4 py-3 rounded-xl border border-[#540B0E]/15 focus:border-[#E09F3E] focus:ring-2 focus:ring-[#E09F3E]/20 text-sm font-semibold text-[#25150E] outline-none transition-all placeholder:text-[#766050]/40"
          />
        </div>
        <div className="flex justify-end">
          <span className="text-[11px] font-mono font-semibold text-[#766050]">
            {(name || '').length}/30
          </span>
        </div>
      </div>

      {/* ── Bio Textarea with 160 char limit ── */}
      <div className="p-4 rounded-2xl border border-[#540B0E]/12 bg-white space-y-1.5">
        <label className="text-sm font-bold text-[#540B0E]">Bio Description</label>
        <div className="relative">
          <textarea
            rows={3}
            maxLength={160}
            value={bio}
            onChange={e => onChangeProfile({ bio: e.target.value })}
            placeholder="Introduce yourself, your work, or mission in a few sentences..."
            className="w-full px-4 py-3 rounded-xl border border-[#540B0E]/15 focus:border-[#E09F3E] focus:ring-2 focus:ring-[#E09F3E]/20 text-sm text-[#25150E] outline-none transition-all placeholder:text-[#766050]/40 resize-none leading-relaxed"
          />
        </div>
        <div className="flex justify-end">
          <span className="text-[11px] font-mono font-semibold text-[#766050]">
            {(bio || '').length}/160
          </span>
        </div>
      </div>

      {/* ── Social Icons Section ── */}
      <div className="p-4 rounded-2xl border border-[#540B0E]/12 bg-white">
        <SocialsEditor
          socialLinks={socialLinks}
          socialPosition={socialPosition}
          onChangeLinks={links => onChangeProfile({ socialLinks: links })}
          onChangePosition={pos => onChangeProfile({ socialPosition: pos })}
        />
      </div>

      {/* ── 3D & Custom Avatar Modal ── */}
      <Modal open={avatarModalOpen} onClose={() => setAvatarModalOpen(false)} title="Select Profile Avatar">
        <div className="space-y-4 font-sans max-h-[520px] overflow-y-auto pr-1">
          {/* Tabs: 3D Avatars vs Custom URL */}
          <div className="flex bg-[#FAF7EE] p-1 rounded-xl border border-[#540B0E]/10">
            <button
              type="button"
              onClick={() => setModalTab('3d')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                modalTab === '3d'
                  ? 'bg-[#540B0E] text-[#FFF3B0] shadow-sm'
                  : 'text-[#766050] hover:text-[#540B0E]'
              }`}
            >
              <HugeiconsIcon icon={SparklesIcon} size={15} className="text-[#E09F3E]" />
              <span>3D Avatars Gallery</span>
            </button>
            <button
              type="button"
              onClick={() => setModalTab('custom')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                modalTab === 'custom'
                  ? 'bg-[#540B0E] text-[#FFF3B0] shadow-sm'
                  : 'text-[#766050] hover:text-[#540B0E]'
              }`}
            >
              <HugeiconsIcon icon={Link01Icon} size={15} />
              <span>Custom Photo URL</span>
            </button>
          </div>

          {/* TAB 1: 3D AVATARS */}
          {modalTab === '3d' && (
            <div className="space-y-4">
              {/* 3D Randomizer & Generator */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7EE] border border-[#540B0E]/12 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#540B0E] flex items-center gap-1.5">
                    <HugeiconsIcon icon={SparklesIcon} size={14} className="text-[#E09F3E]" />
                    <span>Generate Unique 3D Avatar</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleRandomize3D}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#540B0E]/15 text-xs font-bold text-[#540B0E] hover:border-[#E09F3E] transition-all cursor-pointer shadow-2xs"
                  >
                    <HugeiconsIcon icon={DicesIcon} size={14} className="text-[#E09F3E]" />
                    <span>Roll 🎲</span>
                  </button>
                </div>

                {/* Style pills */}
                <div className="flex gap-1.5">
                  {(
                    [
                      { id: 'adventurer',     label: '3D Human' },
                      { id: 'bottts-neutral', label: '3D Robot' },
                      { id: 'lorelei',        label: '3D Stylized' },
                    ] as const
                  ).map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectGeneratorStyle(s.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        generatorStyle === s.id
                          ? 'bg-[#E09F3E] text-[#230E01] shadow-xs'
                          : 'bg-white border border-[#540B0E]/10 text-[#766050] hover:text-[#540B0E]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Curated 3D Avatars Grid */}
              <div>
                <label className="text-xs font-bold text-[#540B0E] block mb-2">
                  Curated 3D Characters & Renders
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {PRESET_3D_AVATARS.map(avatar => {
                    const isSelected = avatarInput === avatar.url;
                    return (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => {
                          setAvatarInput(avatar.url);
                          handleSaveAvatar(avatar.url);
                        }}
                        className={`relative rounded-2xl overflow-hidden border-2 transition-all p-1 bg-[#FAF7EE]/60 hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center group ${
                          isSelected
                            ? 'border-[#E09F3E] ring-2 ring-[#E09F3E]/40 shadow-md'
                            : 'border-[#540B0E]/10 hover:border-[#E09F3E]/60'
                        }`}
                        title={avatar.name}
                      >
                        <div className="w-full aspect-square rounded-xl overflow-hidden bg-white">
                          <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] font-semibold text-[#540B0E] mt-1 truncate max-w-full">
                          {avatar.name}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#E09F3E] text-[#230E01] flex items-center justify-center shadow-xs">
                            <HugeiconsIcon icon={Tick01Icon} size={10} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD PHOTO & CUSTOM URL */}
          {modalTab === 'custom' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#FAF7EE] border border-[#540B0E]/12 space-y-3">
                <ImageUpload
                  value={avatarInput}
                  onChange={(url) => setAvatarInput(url)}
                  label="Upload Profile Photo"
                  helperText="Choose a photo from your computer or camera roll (JPEG, PNG, WebP up to 5MB)."
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#540B0E]/10" />
                <span className="flex-shrink mx-3 text-[10px] font-mono uppercase text-[#766050] font-bold">Or enter direct URL</span>
                <div className="flex-grow border-t border-[#540B0E]/10" />
              </div>

              <Input
                label="Direct Image URL"
                value={avatarInput}
                onChange={e => setAvatarInput(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                hint="Supports PNG, JPG, WebP, or SVG."
              />

              <div>
                <label className="text-xs font-bold text-[#540B0E] mb-2 block">Or select a sample portrait:</label>
                <div className="flex gap-2">
                  {SAMPLE_PHOTO_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatarInput(url)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        avatarInput === url
                          ? 'border-[#E09F3E] scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex justify-between items-center pt-3 border-t border-[#540B0E]/10">
            {avatarUrl ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setAvatarInput('');
                  onChangeProfile({ avatarUrl: '' });
                  setAvatarModalOpen(false);
                }}
              >
                Remove Avatar
              </Button>
            ) : <div />}

            <div className="flex gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => setAvatarModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => handleSaveAvatar()}
                disabled={!avatarInput.trim()}
              >
                Apply Avatar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
