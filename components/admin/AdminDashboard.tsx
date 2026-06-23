'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Tags, Star, MessageSquareQuote } from 'lucide-react';
import { adminButtonPrimary } from './AdminHeader';

type Stats = {
  categories: number;
  products: number;
  featured: number;
  testimonials: number;
  newProducts: number;
  bestsellers: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats);
  }, []);

  const cards = [
    { label: 'Categories', value: stats?.categories, icon: Tags, href: '/admin/categories' },
    { label: 'Products', value: stats?.products, icon: Package, href: '/admin/products' },
    { label: 'Featured Items', value: stats?.featured, icon: Star, href: '/admin/featured' },
    { label: 'Testimonials', value: stats?.testimonials, icon: MessageSquareQuote, href: '/admin/testimonials' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="border border-ag-border p-6 hover:border-ag-gold transition-colors group"
          >
            <Icon className="w-5 h-5 text-ag-gold mb-4" strokeWidth={1.5} />
            <p className="font-sans text-3xl font-light text-ag-black">{value ?? '—'}</p>
            <p className="font-sans text-xs tracking-widest uppercase text-ag-muted mt-2 group-hover:text-ag-gold transition-colors">
              {label}
            </p>
          </Link>
        ))}
      </div>

      {stats && (
        <div className="border border-ag-border p-6 max-w-lg">
          <h2 className="font-display text-xl font-light text-ag-black mb-4">Quick Stats</h2>
          <ul className="space-y-2 font-sans text-sm text-ag-charcoal">
            <li className="flex justify-between">
              <span className="text-ag-muted">New Arrivals</span>
              <span>{stats.newProducts}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-ag-muted">Bestsellers</span>
              <span>{stats.bestsellers}</span>
            </li>
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <Link href="/admin/products/new" className={adminButtonPrimary}>
          Add Product
        </Link>
        <Link href="/admin/categories/new" className={adminButtonPrimary}>
          Add Category
        </Link>
      </div>
    </div>
  );
}
