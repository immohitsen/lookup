'use client';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { HugeiconsIcon } from '@hugeicons/react';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { IconPickerModal } from '@/components/editor/IconPickerModal';
import {
  Link01Icon,
  FireIcon,
  File01Icon,
  Calendar01Icon,
  Mail01Icon,
  DollarCircleIcon,
  SparklesIcon,
} from '@hugeicons/core-free-icons';

const BLOCK_TYPES = [
  { type: 'link',         icon: Link01Icon,         iconKey: 'link-01',       label: 'Link',         desc: 'Standard link to any destination' },
  { type: 'pinned',       icon: FireIcon,           iconKey: 'fire',          label: 'Pinned Link',  desc: 'Highlighted feature link at top' },
  { type: 'content',      icon: File01Icon,         iconKey: 'file',          label: 'Content',      desc: 'Article, video, or podcast embed' },
  { type: 'booking',      icon: Calendar01Icon,     iconKey: 'calendar',      label: 'Booking',      desc: 'Calendly or meeting scheduling' },
  { type: 'email_signup', icon: Mail01Icon,         iconKey: 'mail',          label: 'Email Signup', desc: 'Collect audience subscriber emails' },
  { type: 'affiliate',    icon: DollarCircleIcon,   iconKey: 'dollar-circle', label: 'Affiliate',    desc: 'Promote partner links with tracking' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    type: string;
    title: string;
    url: string;
    icon: string;
    isPinned: boolean;
    isActive: boolean;
    thumbnail: string;
    config: Record<string, unknown>;
  }) => void;
}

export function AddBlockModal({ open, onClose, onAdd }: Props) {
  const [step, setStep] = useState<'type' | 'form'>('type');
  const [selectedType, setSelectedType] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('link-01');
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  function reset() {
    setStep('type');
    setSelectedType('');
    setTitle('');
    setUrl('');
    setIcon('link-01');
  }

  function handleClose() {
    reset();
    onClose();
  }

  function selectType(block: (typeof BLOCK_TYPES)[0]) {
    setSelectedType(block.type);
    const defaults: Record<string, { title: string }> = {
      link: { title: '' },
      pinned: { title: 'Check This Out!' },
      content: { title: 'Latest Release' },
      booking: { title: 'Book 1-on-1 Session' },
      email_signup: { title: 'Join My Inner Circle' },
      affiliate: { title: 'My Favorite Tools' },
    };
    setTitle(defaults[block.type]?.title ?? '');
    setIcon(block.iconKey);
    setStep('form');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      type: selectedType,
      title: title.trim(),
      url: url.trim() || 'https://',
      icon,
      isPinned: selectedType === 'pinned',
      isActive: true,
      thumbnail: '',
      config: {},
    });
    reset();
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        title={step === 'type' ? 'Add a Block to Your Page' : `Configure ${selectedType.replace('_', ' ')}`}
      >
        {step === 'type' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
            {BLOCK_TYPES.map(b => (
              <button
                key={b.type}
                onClick={() => selectType(b)}
                className="flex items-start gap-3.5 p-4 rounded-2xl border border-[#540B0E]/12 bg-white hover:border-[#E09F3E] hover:bg-[#FAF7EE] shadow-xs hover:shadow-md transition-all text-left cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF7EE] group-hover:bg-[#E09F3E] text-[#540B0E] group-hover:text-[#230E01] flex items-center justify-center flex-shrink-0 transition-colors shadow-2xs">
                  <HugeiconsIcon icon={b.icon} size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#540B0E]">{b.label}</div>
                  <div className="text-xs text-[#766050] mt-0.5 leading-relaxed">{b.desc}</div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <Input
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Listen to My New Single"
              required
              autoFocus
            />

            {selectedType !== 'email_signup' && (
              <Input
                label="Destination URL"
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://yourlink.com"
              />
            )}

            {/* Icon Picker Trigger */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#540B0E]">Block Icon</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#FAF7EE] border border-[#540B0E]/15 flex items-center justify-center text-[#540B0E] shadow-2xs">
                  <IconRenderer icon={icon} size={22} />
                </div>
                <button
                  type="button"
                  onClick={() => setIconPickerOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#540B0E]/15 bg-white hover:border-[#E09F3E] text-xs font-bold text-[#540B0E] transition-all cursor-pointer shadow-2xs"
                >
                  <HugeiconsIcon icon={SparklesIcon} size={14} className="text-[#E09F3E]" />
                  <span>Choose Hugeicon</span>
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#540B0E]/10">
              <button
                type="button"
                onClick={() => setStep('type')}
                className="text-xs font-bold text-[#766050] hover:text-[#540B0E] cursor-pointer"
              >
                ← Back to Types
              </button>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!title.trim()}>
                  Add Block
                </Button>
              </div>
            </div>
          </form>
        )}
      </Modal>

      <IconPickerModal
        open={iconPickerOpen}
        currentIcon={icon}
        onClose={() => setIconPickerOpen(false)}
        onSelect={iconId => setIcon(iconId)}
      />
    </>
  );
}
