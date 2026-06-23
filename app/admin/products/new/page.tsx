'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';
import type { Category } from '@/lib/types';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/admin/categories').then((r) => r.json()).then(setCategories);
  }, []);

  const handleSubmit = async (data: Parameters<Parameters<typeof ProductForm>[0]['onSubmit']>[0]) => {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create product');
    router.push('/admin/products');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12">
        <AdminHeader title="New Product" description="Add a new piece to your catalog." />
        {categories.length === 0 ? (
          <p className="font-sans text-sm text-ag-muted">
            Create a category first before adding products.
          </p>
        ) : (
          <ProductForm
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => router.push('/admin/products')}
            submitLabel="Create Product"
          />
        )}
      </main>
    </div>
  );
}
