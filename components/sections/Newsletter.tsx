'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { premiumEase } from '@/lib/motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <section className="py-24 md:py-36 lg:py-48 bg-ag-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="w-16 h-px bg-ag-gold mx-auto mb-8" />

          <h2 className="font-sans text-xs tracking-[0.4em] uppercase text-ag-gold mb-6">
            Stay in the Loop
          </h2>

          <p className="font-display text-2xl md:text-3xl font-light text-ag-black mb-4 leading-relaxed">
            Be first to know about new collections, exclusive offers, and private
            events.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mt-10 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              aria-label="Email address"
              className="flex-1 border-b border-ag-charcoal bg-transparent py-3 font-sans text-sm text-ag-black placeholder:text-ag-muted focus:outline-none focus:border-ag-gold transition-colors"
            />
            <button
              type="submit"
              className="bg-ag-gold text-white px-8 py-3 font-sans text-xs tracking-[0.3em] uppercase hover:bg-ag-gold-dark transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-ag-gold focus:ring-offset-2 whitespace-nowrap"
            >
              Join
            </button>
          </form>

          <p className="font-sans text-[10px] text-ag-muted">
            We respect your privacy. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
