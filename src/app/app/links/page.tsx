'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { toast } from 'react-hot-toast';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Copy01Icon,
  QrCodeIcon,
  Add01Icon,
  Delete01Icon,
  ArrowUpRight01Icon,
  Tick01Icon,
  Download01Icon,
  SparklesIcon,
} from '@hugeicons/core-free-icons';

interface ShortLink {
  _id: string;
  slug: string;
  destination: string;
  clicks: number;
  createdAt: string;
}

const QR_PALETTES = [
  { id: 'bordeaux', label: 'Bordeaux', hex: '#540B0E' },
  { id: 'honey', label: 'Honey Bronze', hex: '#E09F3E' },
  { id: 'slate', label: 'Dark Slate', hex: '#335C67' },
  { id: 'noir', label: 'Noir', hex: '#1B1B2F' },
];

export default function LinksPage() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [qrSlug, setQrSlug] = useState<string | null>(null);
  const [selectedBioColor, setSelectedBioColor] = useState(QR_PALETTES[0].hex);
  const [selectedModalColor, setSelectedModalColor] = useState(QR_PALETTES[0].hex);

  const [dest, setDest] = useState('');
  const [slug, setSlug] = useState('');
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedBio, setCopiedBio] = useState(false);

  const APP_URL = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    Promise.all([
      fetch('/api/shortlinks')
        .then(r => r.json())
        .then(data => setLinks(Array.isArray(data) ? data : [])),
      fetch('/api/user/profile')
        .then(r => r.json())
        .then(data => {
          if (data?.username) setUsername(data.username);
        }),
    ]).finally(() => setLoading(false));
  }, []);

  async function checkSlug(val: string) {
    setSlug(val);
    if (!val || val.length < 2) {
      setSlugAvailable(null);
      return;
    }
    const res = await fetch(`/api/shortlinks/check?slug=${val}`);
    const data = await res.json();
    setSlugAvailable(data.available);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!dest) return;
    setCreating(true);
    try {
      const res = await fetch('/api/shortlinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: dest, slug: slug || undefined }),
      });
      if (!res.ok) {
        const d = await res.json();
        toast.error(d.error || 'Failed to create link');
        return;
      }
      const link = await res.json();
      setLinks(prev => [link, ...prev]);
      setDest('');
      setSlug('');
      setSlugAvailable(null);
      setAddOpen(false);
      toast.success('Short link created!');
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this short link?')) return;
    await fetch(`/api/shortlinks/${id}`, { method: 'DELETE' });
    setLinks(prev => prev.filter(l => l._id !== id));
    toast.success('Deleted short link.');
  }

  function copyLink(s: string, id: string) {
    navigator.clipboard.writeText(`${APP_URL}/s/${s}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Copied to clipboard!');
  }

  function copyBioLink() {
    if (!username) return;
    navigator.clipboard.writeText(`${APP_URL}/${username}`);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
    toast.success('Bio link copied!');
  }

  const encodedBioColor = encodeURIComponent(selectedBioColor);
  const bioQrPreview = username
    ? `/api/qr/${username}?isBio=true&view=1&color=${encodedBioColor}&bg=%23FAF7EE`
    : '';
  const bioQrSvg = username
    ? `/api/qr/${username}?isBio=true&format=svg&color=${encodedBioColor}&bg=%23FAF7EE`
    : '';
  const bioQrPng = username
    ? `/api/qr/${username}?isBio=true&format=png&color=${encodedBioColor}&bg=%23FAF7EE`
    : '';

  const encodedModalColor = encodeURIComponent(selectedModalColor);
  const modalQrPreview = qrSlug
    ? `/api/qr/${qrSlug}?view=1&color=${encodedModalColor}&bg=%23FAF7EE`
    : '';
  const modalQrSvg = qrSlug
    ? `/api/qr/${qrSlug}?format=svg&color=${encodedModalColor}&bg=%23FAF7EE`
    : '';
  const modalQrPng = qrSlug
    ? `/api/qr/${qrSlug}?format=png&color=${encodedModalColor}&bg=%23FAF7EE`
    : '';

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden p-6 sm:p-8 w-full font-sans">
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#540B0E]/10">
          <div>
            <h1 className="text-2xl font-black text-[#540B0E] tracking-tight">QR Studio & Short Links</h1>
            <p className="text-xs text-[#766050] mt-0.5">
              Vector QR code generator for your bio page and trackable campaign short links.
            </p>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <HugeiconsIcon icon={Add01Icon} size={15} />
            <span>Create Short Link</span>
          </Button>
        </div>

        {/* ── Main Bio Page Vector QR Studio (Linktree Pro) ── */}
        {username && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#540B0E]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF7EE] border border-[#540B0E]/10 flex items-center justify-center text-[#E09F3E]">
                  <HugeiconsIcon icon={QrCodeIcon} size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#540B0E]">Main Bio Page Vector QR Studio</h2>
                  <p className="text-xs text-[#766050]">
                    Download print-ready vector SVGs and ultra-high-res PNGs for posters, packaging, and business cards.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E09F3E] bg-[#E09F3E]/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <HugeiconsIcon icon={SparklesIcon} size={12} />
                  <span>Pro Vector Studio</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* QR Preview Column */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#FAF7EE] rounded-3xl border border-[#540B0E]/12">
                <div className="w-48 h-48 bg-white rounded-2xl p-3 border border-[#540B0E]/10 shadow-sm flex items-center justify-center">
                  {bioQrPreview && (
                    <img
                      src={bioQrPreview}
                      alt={`QR code for ${username}`}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="mt-3 text-xs font-mono font-bold text-[#540B0E] bg-white px-3 py-1.5 rounded-xl border border-[#540B0E]/10">
                  lookup.bio/{username}
                </div>
              </div>

              {/* QR Customizer & Download Actions */}
              <div className="md:col-span-7 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#540B0E] uppercase tracking-wider block">
                    Brand Palette Accent
                  </label>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {QR_PALETTES.map(p => {
                      const isSelected = selectedBioColor === p.hex;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedBioColor(p.hex)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#540B0E] bg-[#FAF7EE] text-[#540B0E] shadow-2xs ring-2 ring-[#540B0E]/20'
                              : 'border-[#540B0E]/15 bg-white text-[#766050] hover:border-[#E09F3E]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10"
                            style={{ backgroundColor: p.hex }}
                          />
                          <span>{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7EE]/60 border border-[#540B0E]/10 space-y-2">
                  <span className="text-[11px] font-bold text-[#540B0E] uppercase tracking-wider block">
                    Public Bio URL
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${APP_URL}/${username}`}
                      className="flex-1 px-3 py-2 rounded-xl border border-[#540B0E]/15 bg-white text-xs font-mono font-semibold text-[#540B0E] outline-none select-all"
                    />
                    <Button size="sm" onClick={copyBioLink} className="flex-shrink-0">
                      {copiedBio ? (
                        <HugeiconsIcon icon={Tick01Icon} size={15} />
                      ) : (
                        <HugeiconsIcon icon={Copy01Icon} size={15} />
                      )}
                      <span>{copiedBio ? 'Copied' : 'Copy'}</span>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a href={bioQrSvg} download={`${username}-vector-qr.svg`} className="flex-1 min-w-[140px]">
                    <Button size="sm" className="w-full justify-center shadow-2xs">
                      <HugeiconsIcon icon={Download01Icon} size={15} />
                      <span>Download SVG Vector</span>
                    </Button>
                  </a>
                  <a href={bioQrPng} download={`${username}-qr-1024px.png`} className="flex-1 min-w-[140px]">
                    <Button size="sm" variant="secondary" className="w-full justify-center">
                      <HugeiconsIcon icon={Download01Icon} size={15} />
                      <span>Download Print PNG (1024px)</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Short Links Section ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#540B0E]">Campaign Tracked Short Links</h2>
            <span className="text-xs text-[#766050] font-mono">{links.length} total link{links.length === 1 ? '' : 's'}</span>
          </div>

          {!loading && links.length === 0 ? (
            <EmptyState
              title="No Short Links Created"
              description="Generate custom branded short URLs with QR codes to track clicks across campaigns."
              action={
                <Button size="sm" onClick={() => setAddOpen(true)}>
                  <HugeiconsIcon icon={Add01Icon} size={15} /> Create First Link
                </Button>
              }
            />
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-4">
              <div className="space-y-3">
                {links.map(l => (
                  <div
                    key={l._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#FAF7EE]/60 border border-[#540B0E]/10 hover:border-[#E09F3E]/40 transition-all gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#540B0E]">
                          /s/{l.slug}
                        </span>
                        <span className="text-xs font-semibold text-[#E09F3E] bg-[#E09F3E]/10 px-2 py-0.5 rounded-md">
                          {l.clicks} clicks
                        </span>
                      </div>
                      <div className="text-xs text-[#766050] truncate max-w-md">
                        Destination: {l.destination}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => copyLink(l.slug, l._id)}
                        className="p-2 rounded-xl border border-[#540B0E]/10 bg-white hover:bg-[#FAF7EE] text-[#540B0E] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        title="Copy URL"
                      >
                        {copiedId === l._id ? (
                          <HugeiconsIcon icon={Tick01Icon} size={15} className="text-emerald-600" />
                        ) : (
                          <HugeiconsIcon icon={Copy01Icon} size={15} />
                        )}
                        <span className="hidden sm:inline">{copiedId === l._id ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setQrSlug(l.slug);
                          setSelectedModalColor(QR_PALETTES[0].hex);
                        }}
                        className="p-2 rounded-xl border border-[#540B0E]/10 bg-white hover:bg-[#FAF7EE] text-[#540B0E] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        title="Show Vector QR Code"
                      >
                        <HugeiconsIcon icon={QrCodeIcon} size={15} />
                        <span className="hidden sm:inline">QR Studio</span>
                      </button>

                      <a
                        href={`${APP_URL}/s/${l.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border border-[#540B0E]/10 bg-white hover:bg-[#FAF7EE] text-[#540B0E] text-xs font-bold transition-all flex items-center cursor-pointer shadow-2xs"
                        title="Open Link"
                      >
                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} />
                      </a>

                      <button
                        onClick={() => handleDelete(l._id)}
                        className="p-2 rounded-xl text-[#9E2A2B] hover:bg-[#9E2A2B]/10 transition-colors cursor-pointer"
                        title="Delete Link"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Create Modal ── */}
        <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Create Branded Short Link">
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Destination URL"
              value={dest}
              onChange={e => setDest(e.target.value)}
              placeholder="https://yourlongwebsite.com/promotion"
              required
              autoFocus
            />

            <div>
              <Input
                label="Custom Slug (optional)"
                value={slug}
                onChange={e => checkSlug(e.target.value)}
                prefix="/s/"
                placeholder="my-link"
              />
              {slugAvailable === false && (
                <p className="text-[#9E2A2B] text-xs font-bold mt-1">Slug is already in use.</p>
              )}
              {slugAvailable === true && (
                <p className="text-emerald-600 text-xs font-bold mt-1">Slug is available!</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#540B0E]/10">
              <Button type="button" variant="secondary" size="sm" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={creating} disabled={slugAvailable === false}>
                Create Link
              </Button>
            </div>
          </form>
        </Modal>

        {/* ── In-House First-Party QR Code Modal ── */}
        {qrSlug && (
          <Modal open={Boolean(qrSlug)} onClose={() => setQrSlug(null)} title={`Vector QR: /s/${qrSlug}`}>
            <div className="flex flex-col items-center justify-center p-4 space-y-5 font-sans">
              <div className="w-52 h-52 bg-[#FAF7EE] rounded-3xl p-4 border border-[#540B0E]/12 shadow-inner flex items-center justify-center">
                {modalQrPreview && (
                  <img
                    src={modalQrPreview}
                    alt={`QR Code for /s/${qrSlug}`}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="text-xs font-mono font-bold text-[#540B0E] bg-[#FAF7EE] px-3.5 py-1.5 rounded-xl border border-[#540B0E]/10">
                {APP_URL}/s/{qrSlug}
              </div>

              {/* Color switcher */}
              <div className="space-y-1.5 text-center">
                <span className="text-[11px] font-bold text-[#766050] uppercase tracking-wider block">
                  Color Accent
                </span>
                <div className="flex items-center gap-2 justify-center">
                  {QR_PALETTES.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedModalColor(p.hex)}
                      className={`w-7 h-7 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                        selectedModalColor === p.hex
                          ? 'border-[#540B0E] ring-2 ring-[#540B0E]/30 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: p.hex }}
                    >
                      {selectedModalColor === p.hex && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Download actions */}
              <div className="flex items-center gap-2 w-full pt-2">
                <a href={modalQrSvg} download={`${qrSlug}-vector-qr.svg`} className="flex-1">
                  <Button size="sm" className="w-full justify-center">
                    <HugeiconsIcon icon={Download01Icon} size={15} />
                    <span>SVG</span>
                  </Button>
                </a>
                <a href={modalQrPng} download={`${qrSlug}-qr-1024px.png`} className="flex-1">
                  <Button size="sm" variant="secondary" className="w-full justify-center">
                    <HugeiconsIcon icon={Download01Icon} size={15} />
                    <span>PNG (1024px)</span>
                  </Button>
                </a>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}