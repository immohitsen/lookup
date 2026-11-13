'use client';
import { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { HugeiconsIcon } from '@hugeicons/react';
import { HUGEICONS_CATALOG, IconDefinition } from '@/lib/hugeiconsRegistry';
import { Search01Icon, Tick01Icon, Delete01Icon } from '@hugeicons/core-free-icons';

interface Props {
  open: boolean;
  currentIcon?: string;
  onClose: () => void;
  onSelect: (iconId: string) => void;
}

type CategoryFilter = 'all' | 'popular' | 'media' | 'commerce' | 'social' | 'tech';

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all',      label: 'All Icons' },
  { id: 'popular',  label: 'Popular' },
  { id: 'media',    label: 'Media' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'social',   label: 'Connect' },
  { id: 'tech',     label: 'Tech' },
];

export function IconPickerModal({ open, currentIcon, onClose, onSelect }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const filteredIcons = useMemo(() => {
    return HUGEICONS_CATALOG.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        !search.trim() ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <Modal open={open} onClose={onClose} title="Select an Icon">
      <div className="space-y-4 font-sans max-h-[540px] flex flex-col">
        {/* Search input with Hugeicons search */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#766050] pointer-events-none">
            <HugeiconsIcon icon={Search01Icon} size={16} />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search icons (e.g. music, bag, fire, star)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#540B0E]/15 bg-[#FAF7EE]/50 focus:bg-white text-xs font-semibold text-[#25150E] outline-none focus:border-[#E09F3E] focus:ring-2 focus:ring-[#E09F3E]/20 transition-all placeholder:text-[#766050]/50"
            autoFocus
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#540B0E] text-[#FFF3B0] shadow-2xs'
                  : 'bg-[#FAF7EE] text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE]/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Icons Grid */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-4 sm:grid-cols-6 gap-2.5 max-h-[340px]">
          {filteredIcons.map(item => {
            const isSelected = currentIcon === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  onClose();
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer group relative ${
                  isSelected
                    ? 'border-[#E09F3E] bg-[#FAF7EE] ring-2 ring-[#E09F3E]/30 shadow-xs'
                    : 'border-[#540B0E]/10 bg-white hover:border-[#E09F3E] hover:bg-[#FAF7EE]/50 shadow-2xs'
                }`}
                title={item.name}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[#540B0E] group-hover:scale-110 transition-transform">
                  <HugeiconsIcon icon={item.icon} size={20} />
                </div>
                <span className="text-[10px] font-semibold text-[#766050] group-hover:text-[#540B0E] truncate max-w-full mt-1">
                  {item.name}
                </span>

                {isSelected && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E09F3E] text-[#230E01] flex items-center justify-center shadow-2xs">
                    <HugeiconsIcon icon={Tick01Icon} size={10} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
          {filteredIcons.length === 0 && (
            <div className="col-span-full py-12 text-center text-xs text-[#766050]">
              No icons found matching &quot;{search}&quot;.
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#540B0E]/10">
          {currentIcon ? (
            <button
              type="button"
              onClick={() => {
                onSelect('');
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#9E2A2B] hover:underline cursor-pointer"
            >
              <HugeiconsIcon icon={Delete01Icon} size={13} />
              <span>Remove Icon</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#540B0E] bg-[#FAF7EE] hover:bg-[#FAF7EE]/80 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

