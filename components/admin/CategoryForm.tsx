'use client';

import { useState } from 'react';
import type { Category } from '@/lib/types';
import {
  adminButtonPrimary,
  adminButtonSecondary,
  adminInputClass,
  adminLabelClass,
} from './AdminHeader';

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

      <div>
        <label className={adminLabelClass}>Image URL *</label>
        <input
          className={adminInputClass}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          placeholder="https://images.unsplash.com/..."
        />
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="Preview" className="mt-3 w-32 h-40 object-cover border border-ag-border" />
        )}
      </div>

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
