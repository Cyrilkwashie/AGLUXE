'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader, { adminButtonDanger } from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';
import type { Product, Category } from '@/lib/types';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/products/${params.id}`).then((r) => r.json()),
      fetch('/api/admin/categories').then((r) => r.json()),
    ]).then(([prod, cats]) => {
      setProduct(prod);
      setCategories(cats);
    });
  }, [params.id]);

  const handleSubmit = async (data: Omit<Product, 'id'> & { id?: string }) => {
    const res = await fetch(`/api/admin/products/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update');
    router.push('/admin/products');
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this product permanently?')) return;
    const res = await fetch(`/api/admin/products/${params.id}`, { method: 'DELETE' });
    if (!res.ok) {
      const json = await res.json();
      alert(json.error || 'Failed to delete');
      return;
    }
    router.push('/admin/products');
    router.refresh();
  };

  if (!product) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 md:p-12">
          <p className="font-sans text-sm text-ag-muted">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12">
        <AdminHeader title={`Edit: ${product.name}`} />
        <ProductForm
          categories={categories}
          initial={product}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin/products')}
        />
        <div className="mt-12 pt-8 border-t border-ag-border">
          <button onClick={handleDelete} className={adminButtonDanger}>
            Delete Product
          </button>
        </div>
      </main>
    </div>
  );
}
