'use client';
import { useState } from 'react';
import { SOCIAL_PLATFORMS, PLATFORM_MAP } from '@/components/public/SocialIconsRow';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Add01Icon,
  Delete01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from '@hugeicons/core-free-icons';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Props {
  socialLinks: Record<string, string>;
  socialPosition: 'top' | 'bottom';
  onChangeLinks: (links: Record<string, string>) => void;
  onChangePosition: (pos: 'top' | 'bottom') => void;
}

export function SocialsEditor({
  socialLinks,
  socialPosition,
  onChangeLinks,
  onChangePosition,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const entries = Object.entries(socialLinks || {}).filter(([, v]) => v && v.trim().length > 0);

  function openAddModal(platformId?: string) {
    if (platformId) {
      setSelectedPlatformId(platformId);
      setInputValue(socialLinks[platformId] || '');
    } else {
      setSelectedPlatformId(null);
      setInputValue('');
    }
    setModalOpen(true);
  }

  function handleSavePlatform() {
    if (!selectedPlatformId) return;
    const platform = PLATFORM_MAP.get(selectedPlatformId);
    if (!platform) return;

    const trimmed = inputValue.trim();
    const updated = { ...socialLinks };

    if (!trimmed) {
      delete updated[selectedPlatformId];
    } else {
      updated[selectedPlatformId] = platform.formatUrl(trimmed);
    }

    onChangeLinks(updated);
    setModalOpen(false);
    setSelectedPlatformId(null);
    setInputValue('');
  }

  function handleRemove(platformKey: string) {
    const updated = { ...socialLinks };
    delete updated[platformKey];
    onChangeLinks(updated);
  }

  const selectedPlatform = selectedPlatformId ? PLATFORM_MAP.get(selectedPlatformId) : null;

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-bold text-[#540B0E]">Social Icons</label>
          <p className="text-xs text-[#766050] mt-0.5">
            Add direct links to your socials, streaming, and contact channels.
          </p>
        </div>

        {/* Position Toggle */}
        <div className="flex items-center bg-[#FAF7EE] p-1 rounded-xl border border-[#540B0E]/10">
          <button
            type="button"
            onClick={() => onChangePosition('top')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              socialPosition === 'top'
                ? 'bg-[#E09F3E] text-[#230E01] shadow-sm'
                : 'text-[#766050] hover:text-[#540B0E]'
            }`}
          >
            <HugeiconsIcon icon={ArrowUp01Icon} size={14} />
            Top (Bio)
          </button>
          <button
            type="button"
            onClick={() => onChangePosition('bottom')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              socialPosition === 'bottom'
                ? 'bg-[#E09F3E] text-[#230E01] shadow-sm'
                : 'text-[#766050] hover:text-[#540B0E]'
            }`}
          >
            <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
            Bottom
          </button>
        </div>
      </div>

      {/* Active Social Chips */}
      {entries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {entries.map(([key, val]) => {
            const platform = PLATFORM_MAP.get(key);
            if (!platform) return null;
            return (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-xl border border-[#540B0E]/12 bg-[#FAF7EE]/60 hover:bg-[#FAF7EE] transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#540B0E]/10 flex items-center justify-center text-[#540B0E] flex-shrink-0 shadow-2xs">
                    {platform.icon({ className: 'w-4 h-4' })}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#540B0E]">{platform.name}</div>
                    <div className="text-[11px] text-[#766050] truncate">{val}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openAddModal(key)}
                    className="p-1.5 rounded-lg text-[#766050] hover:text-[#540B0E] hover:bg-black/5 text-xs font-semibold cursor-pointer"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(key)}
                    className="p-1.5 rounded-lg text-[#9E2A2B] hover:bg-[#9E2A2B]/10 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <HugeiconsIcon icon={Delete01Icon} size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 px-4 rounded-2xl border border-dashed border-[#540B0E]/20 bg-[#FAF7EE]/30">
          <p className="text-xs text-[#766050]">No social icons added yet.</p>
        </div>
      )}

      {/* Add Button */}
      <button
        type="button"
        onClick={() => openAddModal()}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-[#E09F3E] bg-[#FAF7EE]/50 hover:bg-[#FAF7EE] text-[#540B0E] hover:text-[#230E01] font-bold text-xs transition-all cursor-pointer"
      >
        <HugeiconsIcon icon={Add01Icon} size={15} className="text-[#E09F3E]" />
        <span>Add Social Icon (Instagram, X, TikTok, Spotify...)</span>
      </button>

      {/* Social Picker & Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedPlatform ? `Configure ${selectedPlatform.name}` : 'Select a Platform'}
      >
        {!selectedPlatform ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {SOCIAL_PLATFORMS.map(p => {
              const isAdded = Boolean(socialLinks[p.id]);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedPlatformId(p.id);
                    setInputValue(socialLinks[p.id] || '');
                  }}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isAdded
                      ? 'border-[#E09F3E] bg-[#FAF7EE]'
                      : 'border-[#540B0E]/12 bg-white hover:border-[#E09F3E] hover:bg-[#FAF7EE]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#540B0E]/10 flex items-center justify-center text-[#540B0E] flex-shrink-0">
                    {p.icon({ className: 'w-4 h-4' })}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#540B0E] truncate">{p.name}</div>
                    {isAdded && <div className="text-[10px] text-[#E09F3E] font-bold">Added</div>}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSavePlatform();
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7EE] border border-[#540B0E]/10">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#540B0E]/10 flex items-center justify-center text-[#540B0E] shadow-2xs">
                {selectedPlatform.icon({ className: 'w-5 h-5' })}
              </div>
              <div>
                <div className="font-bold text-sm text-[#540B0E]">{selectedPlatform.name}</div>
                <div className="text-xs text-[#766050]">Prefix: {selectedPlatform.prefix}</div>
              </div>
            </div>

            <Input
              label={`Your ${selectedPlatform.name} Handle or URL`}
              placeholder={selectedPlatform.placeholder}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              prefix={selectedPlatform.prefix}
              autoFocus
            />

            <div className="flex justify-between items-center pt-3 border-t border-[#540B0E]/10">
              <button
                type="button"
                onClick={() => setSelectedPlatformId(null)}
                className="text-xs font-bold text-[#766050] hover:text-[#540B0E] cursor-pointer"
              >
                ← Choose Another
              </button>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Save Icon
                </Button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
