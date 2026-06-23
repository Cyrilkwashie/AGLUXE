'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader, {
  adminButtonPrimary,
  adminButtonSecondary,
  adminInputClass,
  adminLabelClass,
} from '@/components/admin/AdminHeader';
import type { Testimonial } from '@/lib/types';

const empty = (): Omit<Testimonial, 'id'> => ({
  name: '',
  location: '',
  quote: '',
  rating: 5,
});

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<(Testimonial | Omit<Testimonial, 'id'>) & { id?: string } | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = () => fetch('/api/admin/testimonials').then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${(editing as Testimonial).id}`;
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
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12">
        <AdminHeader
          title="Testimonials"
          description="Manage customer quotes shown in the homepage carousel."
          action={
            <button onClick={() => { setEditing(empty()); setIsNew(true); }} className={adminButtonPrimary}>
              Add Testimonial
            </button>
          }
        />

        {editing && (
          <div className="border border-ag-border p-6 mb-10 space-y-4 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={adminLabelClass}>Name</label>
                <input className={adminInputClass} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div>
                <label className={adminLabelClass}>Location</label>
                <input className={adminInputClass} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
              </div>
            </div>
            <div>
              <label className={adminLabelClass}>Quote</label>
              <textarea className={`${adminInputClass} min-h-[100px]`} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} />
            </div>
            <div>
              <label className={adminLabelClass}>Rating (1–5)</label>
              <input className={adminInputClass} type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value, 10) || 5 })} />
            </div>
            <div className="flex gap-3">
              <button onClick={save} className={adminButtonPrimary}>Save</button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className={adminButtonSecondary}>Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {items.map((t) => (
            <div key={t.id} className="border border-ag-border p-6">
              <p className="font-display text-lg italic text-ag-charcoal mb-3">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-sans text-xs tracking-widest uppercase text-ag-muted">— {t.name}, {t.location} · {'★'.repeat(t.rating)}</p>
              <div className="flex gap-3 mt-4">
                <button onClick={() => { setEditing(t); setIsNew(false); }} className="text-xs uppercase tracking-wider text-ag-gold">Edit</button>
                <button onClick={() => remove(t.id)} className="text-xs uppercase tracking-wider text-red-500">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
