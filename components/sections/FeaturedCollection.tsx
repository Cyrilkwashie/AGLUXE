'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCatalog } from '@/context/CatalogContext';
import { Button } from '@/components/ui/Button';
import { premiumEase } from '@/lib/motion';
import { formatPrice } from '@/lib/format';
import type { FeaturedCollectionItem } from '@/lib/types';

function FeaturedItem({
  item,
  index,
}: {
  item: FeaturedCollectionItem;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  const formattedPrice = formatPrice(item.price);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } gap-8 lg:gap-16 items-center mb-24 md:mb-36 last:mb-0`}
    >
      <div className="w-full lg:w-[60%] relative aspect-[4/5] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: premiumEase }}
        className="w-full lg:w-[40%] px-4 lg:px-0"
      >
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-ag-gold mb-4 block">
          {item.label}
        </span>
        <h3 className="font-display text-4xl md:text-5xl font-light text-ag-black mb-3 leading-tight">
          {item.name}
        </h3>
        <p className="font-sans text-[13px] text-ag-muted mb-6">{item.material}</p>
        <p className="font-sans text-sm text-ag-charcoal leading-relaxed mb-8 max-w-sm">
          {item.description}
        </p>
        <p className="font-sans text-lg font-medium text-ag-black mb-8">
          {formattedPrice}
        </p>
        <Button href={item.productId ? `/shop/${item.productId}` : '/shop'} variant="ghost" className="!px-0">
          Shop Now →
        </Button>
      </motion.div>
    </div>
  );
}

export default function FeaturedCollection() {
  const { featuredCollection, loading } = useCatalog();
  if (loading || featuredCollection.length === 0) return null;

  return (
    <section className="py-24 md:py-36 lg:py-48 bg-ag-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {featuredCollection.map((item, index) => (
          <FeaturedItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
