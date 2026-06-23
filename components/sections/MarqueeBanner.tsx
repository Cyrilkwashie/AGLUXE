'use client';

import { useCatalog } from '@/context/CatalogContext';

export default function MarqueeBanner() {
  const { marqueeItems, loading } = useCatalog();
  if (loading || marqueeItems.length === 0) return null;

  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="bg-ag-black overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className={`inline-block mx-8 font-sans text-[10px] tracking-[0.4em] uppercase ${
              item === '✦' ? 'text-ag-gold' : 'text-white'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
