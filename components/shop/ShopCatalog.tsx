'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCatalog } from '@/context/CatalogContext';
import { ProductCard } from '@/components/ui/ProductCard';
import { premiumEase } from '@/lib/motion';
import type { Product } from '@/lib/types';

type Tab = 'new' | 'bestsellers' | 'all';

const tabs: { id: Tab; label: string }[] = [
  { id: 'new', label: 'New Arrivals' },
  { id: 'bestsellers', label: 'Bestsellers' },
  { id: 'all', label: 'All Pieces' },
];

function getFilteredProducts(products: Product[], tab: Tab) {
  switch (tab) {
    case 'new':
      return products.filter((p) => p.isNew);
    case 'bestsellers':
      return products.filter((p) => p.isBestseller);
    default:
      return products;
  }
}

function categoryLinkClass(active: boolean) {
  return `px-4 py-2 font-sans text-xs tracking-[0.2em] uppercase border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ag-gold ${
    active
      ? 'border-ag-gold bg-ag-gold text-white'
      : 'border-ag-border text-ag-charcoal hover:border-ag-gold hover:text-ag-gold'
  }`;
}

function ShopCatalogContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');
  const { products, categories, loading } = useCatalog();
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const activeCategory = categorySlug
    ? categories.find((category) => category.slug === categorySlug)
    : undefined;

  const categoryProducts = categorySlug
    ? products.filter((product) => product.category === categorySlug)
    : products;

  const filtered = getFilteredProducts(categoryProducts, activeTab);

  useEffect(() => {
    setActiveTab('all');
  }, [categorySlug]);

  if (loading) return null;

  return (
    <>
      <div className="mb-10">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-ag-muted mb-4">
          Categories
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/shop" className={categoryLinkClass(!categorySlug)}>
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className={categoryLinkClass(categorySlug === category.slug)}
            >
              {category.name}
              <span className="ml-2 opacity-60">
                ({products.filter((product) => product.category === category.slug).length})
              </span>
            </Link>
          ))}
        </div>
      </div>

      {activeCategory && (
        <p className="font-sans text-sm text-ag-muted mb-8">
          {activeCategory.tagline} · {categoryProducts.length}{' '}
          {categoryProducts.length === 1 ? 'piece' : 'pieces'}
        </p>
      )}

      <div className="flex flex-wrap gap-6 md:gap-8 mb-12 border-b border-ag-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 font-sans text-xs tracking-[0.3em] uppercase transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ag-gold ${
              activeTab === tab.id
                ? 'text-ag-black border-b border-ag-gold -mb-px'
                : 'text-ag-muted hover:text-ag-charcoal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${categorySlug ?? 'all'}-${activeTab}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: premiumEase }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {filtered.length > 0 ? (
            filtered.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="col-span-full font-sans text-sm text-ag-muted py-12">
              No pieces found in this category.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function ShopCatalog() {
  return (
    <Suspense fallback={null}>
      <ShopCatalogContent />
    </Suspense>
  );
}
