'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader, { adminButtonDanger } from '@/components/admin/AdminHeader';
import CategoryForm from '@/components/admin/CategoryForm';
import type { Category } from '@/lib/types';

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetch(`/api/admin/categories/${params.id}`)
      .then((r) => r.json())
      .then(setCategory);
  }, [params.id]);

  const handleSubmit = async (data: Omit<Category, 'id'> & { id?: string }) => {
    const res = await fetch(`/api/admin/categories/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update');
    router.push('/admin/categories');
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this category?')) return;
    const res = await fetch(`/api/admin/categories/${params.id}`, { method: 'DELETE' });
    const json = await res.json();
    if (!res.ok) {
      alert(json.error || 'Failed to delete');
      return;
    }
    router.push('/admin/categories');
    router.refresh();
  };

  if (!category) {
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
        <AdminHeader title={`Edit: ${category.name}`} />
        <CategoryForm
          initial={category}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin/categories')}
        />
        <div className="mt-12 pt-8 border-t border-ag-border">
          <button onClick={handleDelete} className={adminButtonDanger}>
            Delete Category
          </button>
        </div>
      </main>
    </div>
  );
}
