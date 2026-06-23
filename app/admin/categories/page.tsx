'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader, { adminButtonPrimary } from '@/components/admin/AdminHeader';
import type { Category } from '@/lib/types';

export default function CategoriesAdminPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/categories').then((r) => r.json()),
      fetch('/api/admin/products').then((r) => r.json()),
    ]).then(([cats, products]) => {
      setCategories(cats);
      const counts: Record<string, number> = {};
      products.forEach((p: { category: string }) => {
        counts[p.category] = (counts[p.category] ?? 0) + 1;
      });
      setProductCounts(counts);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Failed to delete');
      return;
    }
    setCategories((prev) => prev.filter((c) => c.id !== id));
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12">
        <AdminHeader
          title="Categories"
          description="Manage shop categories shown on the homepage and navigation."
          action={
            <Link href="/admin/categories/new" className={adminButtonPrimary}>
              Add Category
            </Link>
          }
        />

        {loading ? (
          <p className="font-sans text-sm text-ag-muted">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="font-sans text-sm text-ag-muted">No categories yet.</p>
        ) : (
          <div className="border border-ag-border overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-ag-cream border-b border-ag-border">
                <tr>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Image</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Name</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Slug</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Tagline</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Products</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-ag-border last:border-0">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cat.image} alt={cat.name} className="w-12 h-16 object-cover" />
                    </td>
                    <td className="px-4 py-3 font-display text-base">{cat.name}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ag-muted">{cat.slug}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ag-charcoal max-w-xs truncate">{cat.tagline}</td>
                    <td className="px-4 py-3 font-sans text-sm">{productCounts[cat.slug] ?? 0}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/categories/${cat.id}`}
                          className="font-sans text-xs tracking-wider uppercase text-ag-gold hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="font-sans text-xs tracking-wider uppercase text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
