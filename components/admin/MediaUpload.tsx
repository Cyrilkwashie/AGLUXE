'use client';

import { useRef, useState } from 'react';
import { adminInputClass, adminLabelClass } from './AdminHeader';

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: 'products' | 'categories' | 'featured' | 'instagram' | 'videos';
  accept?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
};

export default function MediaUpload({
  label,
  value,
  onChange,
  folder = 'products',
  accept = 'image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime',
  required,
  placeholder = 'Paste a URL or upload from your device',
  hint,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(value) || value.includes('/videos/');

  async function handleUpload(file: File) {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Upload failed');
      }

      onChange(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-2">
      <label className={adminLabelClass}>{label}</label>
      <input
        className={adminInputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required && !value}
        placeholder={placeholder}
      />
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 px-4 py-2 border border-ag-border font-sans text-xs tracking-wider uppercase cursor-pointer hover:border-ag-gold transition-colors">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
          {uploading ? 'Uploading...' : 'Upload from device'}
        </label>
        {hint && <span className="font-sans text-xs text-ag-muted">{hint}</span>}
      </div>
      {error && <p className="font-sans text-sm text-red-600">{error}</p>}
      {value && (
        <div className="mt-2">
          {isVideo ? (
            <video
              src={value}
              controls
              className="w-full max-w-xs h-40 object-cover border border-ag-border bg-ag-black"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Preview"
              className="w-24 h-32 object-cover border border-ag-border"
            />
          )}
        </div>
      )}
    </div>
  );
}
