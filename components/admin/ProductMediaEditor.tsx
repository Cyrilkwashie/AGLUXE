'use client';

import MediaUpload from './MediaUpload';
import { adminButtonSecondary, adminLabelClass } from './AdminHeader';
import { detectMediaType } from '@/lib/product-media';
import type { ProductMedia } from '@/lib/types';

type Props = {
  items: ProductMedia[];
  onChange: (items: ProductMedia[]) => void;
};

export default function ProductMediaEditor({ items, onChange }: Props) {
  const updateItem = (index: number, url: string) => {
    const next = [...items];
    next[index] = { url, type: detectMediaType(url) };
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, { url: '', type: 'image' }]);
  };

  return (
    <div className="space-y-4 md:col-span-2">
      <div className="flex items-center justify-between gap-4">
        <div>
          <label className={adminLabelClass}>Product Media *</label>
          <p className="font-sans text-xs text-ag-muted mt-1">
            Add as many images and videos as you like. The first image is used on shop cards.
          </p>
        </div>
        <button type="button" onClick={addItem} className={adminButtonSecondary}>
          Add media
        </button>
      </div>

      {items.length === 0 && (
        <p className="font-sans text-sm text-ag-muted border border-dashed border-ag-border p-4">
          No media yet. Click &quot;Add media&quot; to upload images or videos.
        </p>
      )}

      {items.map((item, index) => (
        <div key={index} className="border border-ag-border p-4 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="font-sans text-xs tracking-[0.25em] uppercase text-ag-muted">
              Media {index + 1} · {item.type}
            </p>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="font-sans text-xs uppercase tracking-wider text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <MediaUpload
            label=""
            value={item.url}
            onChange={(url) => updateItem(index, url)}
            folder="products"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
            placeholder="Paste a URL or upload an image/video"
            hint="Images or videos up to 50MB"
          />
        </div>
      ))}
    </div>
  );
}
