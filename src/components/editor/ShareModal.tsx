'use client';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Copy01Icon,
  Tick01Icon,
  ArrowUpRight01Icon,
  QrCodeIcon,
  Download01Icon,
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/Button';

interface Props {
  open: boolean;
  onClose: () => void;
  username: string;
}

const QR_COLORS = [
  { id: 'bordeaux', label: 'Bordeaux', hex: '#540B0E' },
  { id: 'honey', label: 'Honey Bronze', hex: '#E09F3E' },
  { id: 'slate', label: 'Dark Slate', hex: '#335C67' },
  { id: 'noir', label: 'Noir', hex: '#1B1B2F' },
];

export function ShareModal({ open, onClose, username }: Props) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(true);
  const [selectedColor, setSelectedColor] = useState(QR_COLORS[0].hex);

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${username}`
    : `https://lookup.bio/${username}`;

  function handleCopy() {
    navigator.clipboard.writeText(publicUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const encodedColor = encodeURIComponent(selectedColor);
  const qrPreviewUrl = `/api/qr/${username}?isBio=true&view=1&color=${encodedColor}&bg=%23FAF7EE`;
  const qrSvgDownload = `/api/qr/${username}?isBio=true&format=svg&color=${encodedColor}&bg=%23FAF7EE`;
  const qrPngDownload = `/api/qr/${username}?isBio=true&format=png&color=${encodedColor}&bg=%23FAF7EE`;

  return (
    <Modal open={open} onClose={onClose} title="Share Your Bio Page & Vector QR">
      <div className="space-y-5 font-sans">
        {/* Bio URL Bar */}
        <div className="p-4 rounded-2xl bg-[#FAF7EE] border border-[#540B0E]/12 space-y-2.5">
          <label className="text-xs font-bold text-[#540B0E] uppercase tracking-wider block">Your Public URL</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#540B0E]/15 bg-white text-xs font-mono font-semibold text-[#540B0E] outline-none select-all"
            />
            <Button size="sm" onClick={handleCopy} className="flex-shrink-0">
              {copied ? (
                <HugeiconsIcon icon={Tick01Icon} size={15} />
              ) : (
                <HugeiconsIcon icon={Copy01Icon} size={15} />
              )}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </Button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-3">
          <a
            href={`/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#540B0E]/12 bg-white hover:border-[#E09F3E] hover:bg-[#FAF7EE] text-xs font-bold text-[#540B0E] transition-all cursor-pointer shadow-2xs"
          >
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} />
            <span>Open in New Tab</span>
          </a>

          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-[#540B0E]/12 bg-white hover:border-[#E09F3E] hover:bg-[#FAF7EE] text-xs font-bold text-[#540B0E] transition-all cursor-pointer shadow-2xs"
          >
            <HugeiconsIcon icon={QrCodeIcon} size={15} />
            <span>{showQr ? 'Hide Studio' : 'QR Studio'}</span>
          </button>
        </div>

        {/* First-Party In-House QR Code Studio */}
        {showQr && (
          <div className="p-5 bg-white rounded-3xl border border-[#540B0E]/12 shadow-sm space-y-4 text-center">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#766050] pb-2 border-b border-[#540B0E]/10">
              <span>VECTOR QR STUDIO</span>
              <span className="text-[#E09F3E]">100% IN-HOUSE</span>
            </div>

            {/* QR Preview Frame */}
            <div className="flex justify-center py-2">
              <div className="p-3 rounded-2xl bg-[#FAF7EE] border-2 border-[#540B0E]/12 shadow-md">
                <img
                  src={qrPreviewUrl}
                  alt={`QR code for ${username}`}
                  className="w-44 h-44 rounded-xl object-contain"
                />
              </div>
            </div>

            {/* QR Color Picker */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#766050] block">Branded Color Palette:</span>
              <div className="flex items-center justify-center gap-2">
                {QR_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColor(c.hex)}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      selectedColor === c.hex
                        ? 'border-[#25150E] scale-115 shadow-sm'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Vector & Print Download Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <a
                href={qrSvgDownload}
                download={`${username}-qr.svg`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FAF7EE] border border-[#540B0E]/15 hover:border-[#E09F3E] text-xs font-bold text-[#540B0E] transition-all cursor-pointer shadow-2xs"
              >
                <HugeiconsIcon icon={Download01Icon} size={14} className="text-[#E09F3E]" />
                <span>Vector SVG</span>
              </a>

              <a
                href={qrPngDownload}
                download={`${username}-qr.png`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#540B0E] hover:bg-[#3E0709] text-xs font-bold text-[#FFF3B0] transition-all cursor-pointer shadow-2xs"
              >
                <HugeiconsIcon icon={Download01Icon} size={14} className="text-[#E09F3E]" />
                <span>Print PNG (1024px)</span>
              </a>
            </div>

            <p className="text-[11px] text-[#766050] leading-snug">
              Print-ready for concert flyers, merchandise labels, exhibition stands, and stickers.
            </p>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-[#540B0E]/10">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
