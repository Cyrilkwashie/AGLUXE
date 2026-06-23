'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCatalog } from '@/context/CatalogContext';
import { Button } from '@/components/ui/Button';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { premiumEase } from '@/lib/motion';

export default function InstagramGallery() {
  const { instagramPosts, loading } = useCatalog();
  if (loading || instagramPosts.length === 0) return null;

  return (
    <section className="py-24 md:py-36 lg:py-48 bg-ag-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-light text-ag-black mb-2">
            @AGLUXE
          </h2>
          <p className="font-sans text-sm text-ag-muted">
            Follow us for daily inspiration
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 mb-12">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: premiumEase, delay: i * 0.08 }}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <InstagramIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <Button href="https://instagram.com" variant="ghost" className="!px-0">
            Follow on Instagram →
          </Button>
        </div>
      </div>
    </section>
  );
}
