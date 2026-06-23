'use client';

import { motion } from 'framer-motion';
import { premiumEase, staggerContainer, staggerItem } from '@/lib/motion';

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9L12 2Z" />
      </svg>
    ),
    title: 'Material',
    description:
      'Ethically sourced 18K gold and certified diamonds from trusted mines worldwide.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M8 12C8 12 10 8 12 8C14 8 16 12 16 12" />
        <path d="M6 16C6 16 8 20 12 20C16 20 18 16 18 16" />
        <path d="M12 8V4M8 6L6 4M16 6L18 4" />
      </svg>
    ),
    title: 'Quality',
    description:
      'Precision engineering and a flawless finish in every detail.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M12 3L4 7V11C4 16 7 20 12 22C17 20 20 16 20 11V7L12 3Z" />
      </svg>
    ),
    title: 'Longevity',
    description:
      'Every piece guaranteed for a lifetime with our care program.',
  },
];

export default function CraftsmanshipBlock() {
  return (
    <section id="quality" className="py-24 md:py-36 lg:py-48 bg-ag-black text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={staggerItem}
              transition={{ delay: i * 0.2, duration: 0.8, ease: premiumEase }}
              className="text-center"
            >
              <div className="w-12 h-px bg-ag-gold mx-auto mb-8" />
              <div className="text-ag-gold mb-6 flex justify-center">{pillar.icon}</div>
              <h3 className="font-sans text-xs tracking-[0.4em] uppercase text-white mb-4">
                ◇ {pillar.title}
              </h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed max-w-xs mx-auto">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
