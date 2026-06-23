'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { PublicCatalog } from '@/lib/types';

type CatalogContextValue = PublicCatalog & {
  loading: boolean;
  refresh: () => Promise<void>;
  getProductById: (id: string) => PublicCatalog['products'][number] | undefined;
  getCategoryName: (slug: string) => string;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [catalog, setCatalog] = useState<PublicCatalog | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await fetch('/api/catalog', { cache: 'no-store' });
    const data = (await res.json()) as PublicCatalog;
    setCatalog(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo<CatalogContextValue>(() => {
    const empty: PublicCatalog = {
      categories: [],
      products: [],
      featuredCollection: [],
      testimonials: [],
      instagramPosts: [],
      marqueeItems: [],
      heroVideos: [],
    };
    const data = catalog ?? empty;

    return {
      ...data,
      loading,
      refresh,
      getProductById: (id: string) => data.products.find((p) => p.id === id),
      getCategoryName: (slug: string) =>
        data.categories.find((c) => c.slug === slug)?.name ?? slug,
    };
  }, [catalog, loading, refresh]);

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
