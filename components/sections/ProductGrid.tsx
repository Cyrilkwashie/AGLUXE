'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCatalog } from '@/context/CatalogContext';
import { SectionHeader } from '@/components/ui/SectionHeader';
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

export default function ProductGrid() {
  const { products, loading } = useCatalog();
  const [activeTab, setActiveTab] = useState<Tab>('new');
  const filtered = getFilteredProducts(products, activeTab);

  if (loading) return null;

  return (
    <section className="py-24 md:py-36 lg:py-48 bg-ag-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="Curated"
          title="Our Collection"
          subtitle="Curated pieces that embody timeless elegance."
        />

        <div className="flex gap-8 mb-12 border-b border-ag-border">
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
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: premiumEase }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
