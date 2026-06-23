export const metadata = {
  title: 'Admin — AG LUXE',
  robots: 'noindex',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-sans">
      {children}
    </div>
  );
}
