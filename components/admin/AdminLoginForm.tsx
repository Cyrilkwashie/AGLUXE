'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError('Invalid password. Please try again.');
      setLoading(false);
      return;
    }

    const from = searchParams.get('from') || '/admin';
    router.push(from);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-ag-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-ag-border p-10">
        <div className="text-center mb-10">
          <span className="font-display text-2xl tracking-[0.4em] font-light uppercase">
            AG <span className="text-ag-gold">LUXE</span>
          </span>
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-ag-muted mt-4">
            Admin Sign In
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block font-sans text-xs tracking-widest uppercase text-ag-muted mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-ag-charcoal bg-transparent py-3 font-sans text-sm focus:outline-none focus:border-ag-gold"
              placeholder="Enter admin password"
            />
          </div>

          {error && <p className="font-sans text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-sans text-xs tracking-[0.3em] uppercase bg-ag-gold text-white py-4 hover:bg-ag-gold-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8">
          <Link href="/" className="font-sans text-xs text-ag-muted hover:text-ag-gold transition-colors">
            ← Back to storefront
          </Link>
        </p>
      </div>
    </div>
  );
}
