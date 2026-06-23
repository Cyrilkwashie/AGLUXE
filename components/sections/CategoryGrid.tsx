'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCatalog } from '@/context/CatalogContext';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { premiumEase } from '@/lib/motion';
import type { CategoryWithCount } from '@/lib/types';

const gridPlacement: Record<string, string> = {
  rings: 'md:col-span-1 md:row-span-2 min-h-[500px] md:min-h-0',
  earrings: 'md:col-span-1 md:row-span-1 min-h-[300px]',
  necklaces: 'md:col-span-1 md:row-span-1 min-h-[300px]',
  bracelets: 'md:col-span-1 md:row-span-1 min-h-[300px]',
};

function CategoryCard({
  category,
  index,
}: {
  category: CategoryWithCount;
  index: number;
}) {
  const placement = gridPlacement[category.slug] ?? 'min-h-[300px]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: premiumEase, delay: index * 0.1 }}
      className={placement}
    >
      <Link
        href={`/shop?category=${category.slug}`}
        className="group relative block w-full h-full min-h-[300px] overflow-hidden"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-700" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileHover={{ y: 0 }}
            className="group-hover:translate-y-0 translate-y-2 opacity-90 group-hover:opacity-100 transition-all duration-500"
          >
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-2">
              {category.name}
            </h3>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/70 mb-3">
              {category.tagline}
            </p>
            <p className="font-sans text-xs tracking-widest uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {category.count} Pieces →
            </p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategoryGrid() {
  const { categories, loading } = useCatalog();

  const ordered = ['rings', 'earrings', 'necklaces', 'bracelets']
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean) as CategoryWithCount[];

  const display = ordered.length > 0 ? ordered : categories;

  if (loading) return null;

  return (
    <section id="categories" className="py-24 md:py-36 lg:py-48 bg-ag-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="Collections"
          title="Shop by Category"
          subtitle="Discover our curated collections, each piece designed with intention."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 min-h-[600px] md:min-h-[700px]">
          {display.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
