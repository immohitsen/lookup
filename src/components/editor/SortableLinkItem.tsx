'use client';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { IconPickerModal } from '@/components/editor/IconPickerModal';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Menu01Icon,
  Delete01Icon,
  EyeIcon,
  ViewOffIcon,
  SparklesIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Calendar01Icon,
  Clock01Icon,
} from '@hugeicons/core-free-icons';

interface LinkItem {
  _id: string;
  type: string;
  title: string;
  url: string;
  isPinned: boolean;
  isActive: boolean;
  icon: string;
  thumbnail: string;
  config: Record<string, unknown>;
  clicks: number;
  scheduledStart?: string | Date;
  scheduledEnd?: string | Date;
}

interface Props {
  link: LinkItem;
  onUpdate: (id: string, data: Partial<LinkItem>) => Promise<void>;
  onDelete: (id: string) => void;
}

const TYPE_LABEL: Record<string, string> = {
  link: 'Link',
  pinned: 'Pinned Highlight',
  content: 'Content Embed',
  booking: 'Meeting Booking',
  email_signup: 'Newsletter',
  affiliate: 'Affiliate Link',
};

export function SortableLinkItem({ link, onUpdate, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [icon, setIcon] = useState(link.icon);
  const [thumbnail, setThumbnail] = useState(link.thumbnail || '');
  const [hasSchedule, setHasSchedule] = useState(Boolean(link.scheduledStart || link.scheduledEnd));
  const [startDate, setStartDate] = useState(
    link.scheduledStart ? new Date(link.scheduledStart).toISOString().slice(0, 16) : ''
  );
  const [endDate, setEndDate] = useState(
    link.scheduledEnd ? new Date(link.scheduledEnd).toISOString().slice(0, 16) : ''
  );

  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  async function handleSave() {
    setSaving(true);
    await onUpdate(link._id, {
      title,
      url,
      icon,
      thumbnail,
      scheduledStart: hasSchedule && startDate ? new Date(startDate) : undefined,
      scheduledEnd: hasSchedule && endDate ? new Date(endDate) : undefined,
    });
    setSaving(false);
    setDirty(false);
  }

  function handleSelectIcon(iconId: string) {
    setIcon(iconId);
    setDirty(true);
    onUpdate(link._id, { icon: iconId });
  }

  // Schedule status evaluation
  const now = new Date();
  let scheduleBadge = null;
  if (link.scheduledStart || link.scheduledEnd) {
    const sStart = link.scheduledStart ? new Date(link.scheduledStart) : null;
    const sEnd = link.scheduledEnd ? new Date(link.scheduledEnd) : null;

    if (sStart && now < sStart) {
      scheduleBadge = (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E09F3E]/20 text-[#E09F3E] border border-[#E09F3E]/30">
          Starts {sStart.toLocaleDateString()}
        </span>
      );
    } else if (sEnd && now > sEnd) {
      scheduleBadge = (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#9E2A2B]/20 text-[#9E2A2B] border border-[#9E2A2B]/30">
          Expired
        </span>
      );
    } else {
      scheduleBadge = (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          Live Scheduled
        </span>
      );
    }
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`rounded-2xl border bg-white shadow-xs transition-all font-sans overflow-hidden ${
          link.isPinned ? 'border-[#E09F3E] ring-1 ring-[#E09F3E]/30' : 'border-[#540B0E]/12'
        }`}
      >
        {/* Header row */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-[#766050] hover:text-[#540B0E] p-1 select-none"
            aria-label="Drag to reorder"
          >
            <HugeiconsIcon icon={Menu01Icon} size={16} />
          </button>

          {/* Thumbnail / Icon */}
          {link.thumbnail ? (
            <img src={link.thumbnail} alt="" className="w-8 h-8 rounded-xl object-cover border border-[#540B0E]/15 flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-[#FAF7EE] border border-[#540B0E]/10 flex items-center justify-center text-[#540B0E] flex-shrink-0">
              <IconRenderer icon={link.icon} size={17} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#540B0E] truncate">{link.title}</span>
              {scheduleBadge}
            </div>
            <div className="text-[11px] text-[#766050] font-medium">{TYPE_LABEL[link.type] ?? link.type}</div>
          </div>

          {/* Click count */}
          <span className="text-xs font-semibold text-[#766050] bg-[#FAF7EE] px-2.5 py-1 rounded-full hidden sm:block">
            {link.clicks} clicks
          </span>

          {/* Controls */}
          <button
            onClick={() => onUpdate(link._id, { isActive: !link.isActive })}
            className="p-1.5 rounded-lg text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
            title="Toggle visibility"
          >
            {link.isActive ? (
              <HugeiconsIcon icon={EyeIcon} size={16} />
            ) : (
              <HugeiconsIcon icon={ViewOffIcon} size={16} className="opacity-40" />
            )}
          </button>
          <button
            onClick={() => onDelete(link._id)}
            className="p-1.5 rounded-lg text-[#9E2A2B] hover:bg-[#9E2A2B]/10 transition-colors cursor-pointer"
            title="Delete"
          >
            <HugeiconsIcon icon={Delete01Icon} size={16} />
          </button>
          <button
            onClick={() => setExpanded(e => !e)}
            className="p-1.5 rounded-lg text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
            title="Edit"
          >
            {expanded ? (
              <HugeiconsIcon icon={ArrowUp01Icon} size={16} />
            ) : (
              <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
            )}
          </button>
        </div>

        {/* Expanded edit form */}
        {expanded && (
          <div className="border-t border-[#540B0E]/10 p-5 space-y-4 bg-[#FAF7EE]/50">
            <Input
              label="Link Title"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                setDirty(true);
              }}
            />

            {link.type !== 'email_signup' && (
              <Input
                label="Destination URL"
                value={url}
                onChange={e => {
                  setUrl(e.target.value);
                  setDirty(true);
                }}
                placeholder="https://..."
              />
            )}

            {/* Thumbnail Upload */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#540B0E]/10 space-y-2">
              <label className="text-xs font-bold text-[#540B0E] block">Card Thumbnail</label>
              <ImageUpload
                value={thumbnail}
                onChange={(imgUrl) => {
                  setThumbnail(imgUrl);
                  setDirty(true);
                  onUpdate(link._id, { thumbnail: imgUrl });
                }}
                label=""
                aspect="square"
                helperText="Upload image thumbnail for your link card."
              />
            </div>

            {/* Icon Picker Trigger */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#540B0E]">Block Icon</label>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#540B0E]/15 flex items-center justify-center text-[#540B0E] shadow-2xs">
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
                {icon && (
                  <button
                    type="button"
                    onClick={() => {
                      setIcon('');
                      setDirty(true);
                      onUpdate(link._id, { icon: '' });
                    }}
                    className="text-xs font-bold text-[#9E2A2B] hover:underline cursor-pointer"
                  >
                    Clear Icon
                  </button>
                )}
              </div>
            </div>

            {/* Linktree Pro: Link Scheduling Feature */}
            <div className="p-4 rounded-2xl bg-white border border-[#540B0E]/12 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Calendar01Icon} size={16} className="text-[#E09F3E]" />
                  <span className="text-xs font-bold text-[#540B0E]">Schedule Link</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#E09F3E]/20 text-[#230E01]">
                    PRO FEATURE
                  </span>
                </div>
                <Toggle
                  checked={hasSchedule}
                  onChange={(val) => {
                    setHasSchedule(val);
                    setDirty(true);
                  }}
                />
              </div>

              {hasSchedule && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#540B0E]/8 animate-pop-in">
                  <div>
                    <label className="text-[11px] font-bold text-[#766050] block mb-1 flex items-center gap-1">
                      <HugeiconsIcon icon={Clock01Icon} size={12} />
                      Publish Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setDirty(true);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#540B0E]/15 bg-[#FAF7EE] text-[#540B0E] focus:outline-none focus:border-[#E09F3E]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#766050] block mb-1 flex items-center gap-1">
                      <HugeiconsIcon icon={Clock01Icon} size={12} />
                      Expiration End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setDirty(true);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#540B0E]/15 bg-[#FAF7EE] text-[#540B0E] focus:outline-none focus:border-[#E09F3E]"
                    />
                  </div>
                </div>
              )}
            </div>

            {link.type === 'email_signup' && (
              <div className="space-y-3 pt-1">
                <Input
                  label="Button Text"
                  value={(link.config?.buttonText as string) ?? 'Subscribe'}
                  onChange={e =>
                    onUpdate(link._id, { config: { ...link.config, buttonText: e.target.value } })
                  }
                />
                <Input
                  label="Thank You Message"
                  value={(link.config?.thankYou as string) ?? 'Thanks for subscribing!'}
                  onChange={e =>
                    onUpdate(link._id, { config: { ...link.config, thankYou: e.target.value } })
                  }
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-[#540B0E]/10">
              <Toggle
                checked={link.isPinned}
                onChange={v => onUpdate(link._id, { isPinned: v })}
                label="Pin to top highlight"
              />
              {dirty && (
                <Button size="sm" loading={saving} onClick={handleSave}>
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <IconPickerModal
        open={iconPickerOpen}
        currentIcon={icon}
        onClose={() => setIconPickerOpen(false)}
        onSelect={handleSelectIcon}
      />
    </>
  );
}
