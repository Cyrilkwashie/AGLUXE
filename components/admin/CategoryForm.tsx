'use client';

import { useState } from 'react';
import type { Category } from '@/lib/types';
import {
  adminButtonPrimary,
  adminButtonSecondary,
  adminInputClass,
  adminLabelClass,
} from './AdminHeader';
import MediaUpload from './MediaUpload';

type Props = {
  initial?: Category;
  onSubmit: (data: Omit<Category, 'id'> & { id?: string }) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
};

export default function CategoryForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = 'Save Category',
}: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [tagline, setTagline] = useState(initial?.tagline ?? '');
  const [image, setImage] = useState(initial?.image ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit({ name, slug, tagline, image, id: initial?.id });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={adminLabelClass}>Name *</label>
          <input
            className={adminInputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Rings"
          />
        </div>
        <div>
          <label className={adminLabelClass}>Slug</label>
          <input
            className={adminInputClass}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="rings (auto-generated if empty)"
          />
        </div>
      </div>

      <div>
        <label className={adminLabelClass}>Tagline *</label>
        <input
          className={adminInputClass}
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          required
          placeholder="Circles of Devotion"
        />
      </div>

      <MediaUpload
        label="Category Image *"
        value={image}
        onChange={setImage}
        folder="categories"
        accept="image/jpeg,image/png,image/webp,image/gif"
        required
        hint="Upload from device or paste a URL"
      />

      {error && <p className="font-sans text-sm text-red-600">{error}</p>}

      <div className="flex gap-4">
        <button type="submit" disabled={saving} className={adminButtonPrimary}>
          {saving ? 'Saving...' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} className={adminButtonSecondary}>
          Cancel
        </button>
      </div>
    </form>
  );
}
