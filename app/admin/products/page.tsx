'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader, { adminButtonPrimary } from '@/components/admin/AdminHeader';
import type { Product, Category } from '@/lib/types';
import { formatPrice } from '@/lib/format';

export default function ProductsAdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/products').then((r) => r.json()),
      fetch('/api/admin/categories').then((r) => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  const categoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete product "${name}"?`)) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to delete');
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12">
        <AdminHeader
          title="Products"
          description="Manage your full product catalog — prices, images, descriptions, and flags."
          action={
            <Link href="/admin/products/new" className={adminButtonPrimary}>
              Add Product
            </Link>
          }
        />

        {loading ? (
          <p className="font-sans text-sm text-ag-muted">Loading...</p>
        ) : (
          <div className="border border-ag-border overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-ag-cream border-b border-ag-border">
                <tr>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Image</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Name</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Category</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Price</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Flags</th>
                  <th className="px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-ag-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-ag-border last:border-0">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} className="w-12 h-16 object-cover" />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-display text-base">{p.name}</p>
                      <p className="font-sans text-[11px] text-ag-muted">{p.material}</p>
                    </td>
                    <td className="px-4 py-3 font-sans text-sm">{categoryName(p.category)}</td>
                    <td className="px-4 py-3 font-sans text-sm font-medium">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {p.isNew && (
                          <span className="text-[9px] tracking-widest uppercase bg-ag-gold text-white px-2 py-0.5">New</span>
                        )}
                        {p.isBestseller && (
                          <span className="text-[9px] tracking-widest uppercase bg-ag-charcoal text-white px-2 py-0.5">Best</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <Link href={`/admin/products/${p.id}`} className="font-sans text-xs uppercase tracking-wider text-ag-gold hover:underline">
                          Edit
                        </Link>
                        <Link href={`/shop/${p.id}`} target="_blank" className="font-sans text-xs uppercase tracking-wider text-ag-muted hover:underline">
                          View
                        </Link>
                        <button onClick={() => handleDelete(p.id, p.name)} className="font-sans text-xs uppercase tracking-wider text-red-500 hover:underline">
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
