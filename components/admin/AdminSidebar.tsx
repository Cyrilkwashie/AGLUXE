'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Tags,
  Package,
  Star,
  MessageSquareQuote,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/featured', label: 'Featured', icon: Star },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 shrink-0 border-r border-ag-border bg-ag-cream min-h-screen flex flex-col">
      <div className="px-6 py-8 border-b border-ag-border">
        <Link href="/admin" className="font-display text-lg tracking-[0.3em] font-light uppercase">
          AG <span className="text-ag-gold">LUXE</span>
        </Link>
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-ag-muted mt-2">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 font-sans text-sm transition-colors ${
                active
                  ? 'bg-white text-ag-black border-l-2 border-ag-gold'
                  : 'text-ag-muted hover:text-ag-charcoal hover:bg-white/60'
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-6 border-t border-ag-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 font-sans text-sm text-ag-muted hover:text-ag-charcoal transition-colors"
        >
          <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
          View Storefront
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 font-sans text-sm text-ag-muted hover:text-ag-charcoal transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
