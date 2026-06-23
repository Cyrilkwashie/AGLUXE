'use client';

import { useState } from 'react';
import type { Category, Product } from '@/lib/types';
import {
  adminButtonPrimary,
  adminButtonSecondary,
  adminInputClass,
  adminLabelClass,
} from './AdminHeader';
import MediaUpload from './MediaUpload';

type Props = {
  categories: Category[];
  initial?: Product;
  onSubmit: (data: Omit<Product, 'id'> & { id?: string }) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
};

export default function ProductForm({
  categories,
  initial,
  onSubmit,
  onCancel,
  submitLabel = 'Save Product',
}: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState(initial?.category ?? categories[0]?.slug ?? '');
  const [material, setMaterial] = useState(initial?.material ?? '');
  const [price, setPrice] = useState(initial?.price?.toString() ?? '');
  const [originalPrice, setOriginalPrice] = useState(
    initial?.originalPrice?.toString() ?? ''
  );
  const [image, setImage] = useState(initial?.image ?? '');
  const [hoverImage, setHoverImage] = useState(initial?.hoverImage ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [isNew, setIsNew] = useState(initial?.isNew ?? false);
  const [isBestseller, setIsBestseller] = useState(initial?.isBestseller ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      setError('Enter a valid price');
      setSaving(false);
      return;
    }

    try {
      await onSubmit({
        id: initial?.id,
        name,
        category,
        material,
        price: parsedPrice,
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        image,
        hoverImage: hoverImage || image,
        description,
        isNew,
        isBestseller,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={adminLabelClass}>Product Name *</label>
          <input className={adminInputClass} value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label className={adminLabelClass}>Category *</label>
          <select
            className={adminInputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={adminLabelClass}>Material *</label>
          <input className={adminInputClass} value={material} onChange={(e) => setMaterial(e.target.value)} required placeholder="18K Gold" />
        </div>

        <div>
          <label className={adminLabelClass}>Price (USD) *</label>
          <input className={adminInputClass} type="number" min="0" step="1" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div>
          <label className={adminLabelClass}>Original Price (optional)</label>
          <input className={adminInputClass} type="number" min="0" step="1" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="For sale items" />
        </div>

        <MediaUpload
          label="Primary Image *"
          value={image}
          onChange={setImage}
          folder="products"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required
          hint="JPG, PNG, or WebP up to 50MB"
        />

        <MediaUpload
          label="Hover Image"
          value={hoverImage}
          onChange={setHoverImage}
          folder="products"
          accept="image/jpeg,image/png,image/webp,image/gif"
          placeholder="Defaults to primary image"
          hint="Optional second product photo"
        />
      </div>

      <div>
        <label className={adminLabelClass}>Description</label>
        <textarea
          className={`${adminInputClass} min-h-[120px] resize-y`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description for the detail page..."
        />
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 font-sans text-sm text-ag-charcoal cursor-pointer">
          <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} className="accent-ag-gold" />
          Mark as New Arrival
        </label>
        <label className="flex items-center gap-2 font-sans text-sm text-ag-charcoal cursor-pointer">
          <input type="checkbox" checked={isBestseller} onChange={(e) => setIsBestseller(e.target.checked)} className="accent-ag-gold" />
          Mark as Bestseller
        </label>
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
