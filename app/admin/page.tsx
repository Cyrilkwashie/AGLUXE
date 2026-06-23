import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata = {
  title: 'Dashboard — AG LUXE Admin',
  robots: 'noindex',
};

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12">
        <AdminHeader
          title="Dashboard"
          description="Overview of your AG LUXE store content and inventory."
        />
        <AdminDashboard />
      </main>
    </div>
  );
}
