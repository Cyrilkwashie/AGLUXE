import { Suspense } from 'react';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata = {
  title: 'Admin Login — AG LUXE',
  robots: 'noindex',
};

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
