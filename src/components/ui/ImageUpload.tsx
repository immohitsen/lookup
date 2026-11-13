'use client';

import { useState, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Upload01Icon,
  Delete01Icon,
  Loading01Icon,
  Camera01Icon,
} from '@hugeicons/core-free-icons';
import { toast } from 'react-hot-toast';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspect?: 'circle' | 'square' | 'wide';
  helperText?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = 'Upload Image',
  aspect = 'circle',
  helperText = 'JPEG, PNG, WebP up to 5MB',
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      toast.error('Only JPG, PNG, WebP, or GIF images are supported.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size cannot exceed 5MB.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Upload failed.');
        return;
      }
      onChange(data.url);
      toast.success('Image uploaded successfully!');
    } catch {
      toast.error('Network error uploading image.');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-[#540B0E] block">{label}</label>}

      <div className="flex items-center gap-4">
        {/* Preview Frame */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative flex items-center justify-center border-2 border-dashed cursor-pointer transition-all overflow-hidden group select-none ${
            dragOver
              ? 'border-[#E09F3E] bg-[#E09F3E]/10 scale-102'
              : 'border-[#540B0E]/20 bg-[#FAF7EE] hover:border-[#E09F3E]'
          } ${
            aspect === 'circle'
              ? 'w-20 h-20 rounded-full'
              : aspect === 'wide'
              ? 'w-32 h-16 rounded-2xl'
              : 'w-20 h-20 rounded-2xl'
          }`}
        >
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#766050] group-hover:text-[#540B0E]">
              <HugeiconsIcon icon={Camera01Icon} size={20} />
              <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Upload</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold">
            {uploading ? (
              <HugeiconsIcon icon={Loading01Icon} size={18} className="animate-spin text-[#FFF3B0]" />
            ) : (
              <span>Change</span>
            )}
          </div>
        </div>

        {/* Action Buttons & Text */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#540B0E]/15 text-xs font-bold text-[#540B0E] hover:bg-[#FAF7EE] hover:border-[#E09F3E] shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <HugeiconsIcon icon={Loading01Icon} size={14} className="animate-spin text-[#E09F3E]" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={Upload01Icon} size={14} className="text-[#E09F3E]" />
                  <span>Choose Photo</span>
                </>
              )}
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 rounded-xl text-[#9E2A2B] hover:bg-[#9E2A2B]/10 transition-colors cursor-pointer"
                title="Remove image"
                aria-label="Remove image"
              >
                <HugeiconsIcon icon={Delete01Icon} size={15} />
              </button>
            )}
          </div>

          <p className="text-[11px] text-[#766050] leading-snug">{helperText}</p>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}

