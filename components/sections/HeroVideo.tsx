'use client';

import { motion } from 'framer-motion';
import { HERO_VIDEO_SRC } from '@/lib/site-config';
import { premiumEase } from '@/lib/motion';

export default function HeroVideo() {
  return (
    <section
      aria-label="Hero video showcase"
      className="relative h-screen w-full overflow-hidden"
    >
      <video
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: premiumEase }}
          className="font-sans text-xs tracking-[0.5em] uppercase mb-6 text-white/70"
        >
          New Collection 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: premiumEase }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none mb-8"
        >
          Wear Your
          <br />
          <em className="italic text-ag-gold-light">Story</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1, ease: premiumEase }}
          className="font-sans font-light text-sm tracking-[0.3em] uppercase text-white/60 mb-12"
        >
          Timeless. Refined. Yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: premiumEase }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/shop"
            className="px-10 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-ag-black transition-all duration-500 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-ag-gold"
          >
            Explore Collection
          </a>
          <a
            href="#categories"
            className="px-10 py-4 bg-ag-gold text-white text-xs tracking-[0.3em] uppercase hover:bg-ag-gold-dark transition-all duration-500 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-ag-gold"
          >
            Shop Now
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1, ease: premiumEase }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-white/50"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mb-4">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
