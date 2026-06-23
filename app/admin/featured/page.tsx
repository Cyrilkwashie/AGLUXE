'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader, {
  adminButtonPrimary,
  adminButtonSecondary,
  adminInputClass,
  adminLabelClass,
} from '@/components/admin/AdminHeader';
import MediaUpload from '@/components/admin/MediaUpload';
import type { FeaturedCollectionItem } from '@/lib/types';
import { formatPrice } from '@/lib/format';

const emptyItem = (): FeaturedCollectionItem => ({
  id: '',
  label: 'Featured',
  name: '',
  material: '',
  description: '',
  price: 0,
  image: '',
});

export default function FeaturedAdminPage() {
  const [items, setItems] = useState<FeaturedCollectionItem[]>([]);
  const [editing, setEditing] = useState<FeaturedCollectionItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = () => fetch('/api/admin/featured').then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const url = isNew ? '/api/admin/featured' : `/api/admin/featured/${editing.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    if (!res.ok) {
      const json = await res.json();
      alert(json.error || 'Failed to save');
      return;
    }
    setEditing(null);
    setIsNew(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this featured item?')) return;
    await fetch(`/api/admin/featured/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12">
        <AdminHeader
          title="Featured Collection"
          description="Manage the editorial featured rows on the homepage."
          action={
            <button
              onClick={() => { setEditing(emptyItem()); setIsNew(true); }}
              className={adminButtonPrimary}
            >
              Add Featured Item
            </button>
          }
        />

        {editing && (
          <div className="border border-ag-border p-6 mb-10 space-y-4 max-w-2xl">
            <h2 className="font-display text-xl">{isNew ? 'New Item' : 'Edit Item'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={adminLabelClass}>Label</label>
                <input className={adminInputClass} value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} />
              </div>
              <div>
                <label className={adminLabelClass}>Price</label>
                <input className={adminInputClass} type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
            <div>
              <label className={adminLabelClass}>Name</label>
              <input className={adminInputClass} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div>
              <label className={adminLabelClass}>Material</label>
              <input className={adminInputClass} value={editing.material} onChange={(e) => setEditing({ ...editing, material: e.target.value })} />
            </div>
            <div>
              <label className={adminLabelClass}>Description</label>
              <textarea className={`${adminInputClass} min-h-[80px]`} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </div>
            <MediaUpload
              label="Image"
              value={editing.image}
              onChange={(url) => setEditing({ ...editing, image: url })}
              folder="featured"
              accept="image/jpeg,image/png,image/webp,image/gif"
            />
            <div>
              <label className={adminLabelClass}>Linked Product ID (optional)</label>
              <input className={adminInputClass} value={editing.productId ?? ''} onChange={(e) => setEditing({ ...editing, productId: e.target.value || undefined })} placeholder="e.g. 1" />
            </div>
            <div className="flex gap-3">
              <button onClick={save} className={adminButtonPrimary}>Save</button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className={adminButtonSecondary}>Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border border-ag-border p-4 flex gap-4 items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="w-20 h-24 object-cover shrink-0" />
              <div className="flex-1">
                <p className="font-sans text-[10px] tracking-widest uppercase text-ag-gold">{item.label}</p>
                <p className="font-display text-lg">{item.name}</p>
                <p className="font-sans text-sm text-ag-muted">{item.material} · {formatPrice(item.price)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(item); setIsNew(false); }} className="text-xs uppercase tracking-wider text-ag-gold">Edit</button>
                <button onClick={() => remove(item.id)} className="text-xs uppercase tracking-wider text-red-500">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
