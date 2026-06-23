'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCatalog } from '@/context/CatalogContext';
import { premiumEase } from '@/lib/motion';

export default function Testimonials() {
  const { testimonials, loading } = useCatalog();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goTo = (index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="py-24 md:py-36 lg:py-48 bg-ag-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="relative max-w-3xl mx-auto text-center">
          <span
            aria-hidden
            className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[200px] text-ag-gold/10 leading-none select-none pointer-events-none"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="relative z-10 py-12"
            >
              <p className="font-display text-2xl md:text-[26px] italic text-ag-charcoal leading-relaxed mb-10">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="font-sans text-[11px] tracking-widest uppercase text-ag-muted mb-4">
                — {current.name}, {current.location}
              </p>
              <div className="flex justify-center gap-1 text-ag-gold">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-8 mt-8">
            <button
              aria-label="Previous testimonial"
              onClick={() => goTo(activeIndex - 1)}
              className="text-ag-charcoal hover:text-ag-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-2"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-px transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-ag-gold ${
                    i === activeIndex ? 'w-8 bg-ag-gold' : 'w-4 bg-ag-border'
                  }`}
                />
              ))}
            </div>

            <button
              aria-label="Next testimonial"
              onClick={() => goTo(activeIndex + 1)}
              className="text-ag-charcoal hover:text-ag-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-2"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
