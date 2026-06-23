'use client';

import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import CategoryForm from '@/components/admin/CategoryForm';

export default function NewCategoryPage() {
  const router = useRouter();

  const handleSubmit = async (data: Parameters<Parameters<typeof CategoryForm>[0]['onSubmit']>[0]) => {
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create category');
    router.push('/admin/categories');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12">
        <AdminHeader title="New Category" description="Create a new shop category." />
        <CategoryForm
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin/categories')}
          submitLabel="Create Category"
        />
      </main>
    </div>
  );
}
