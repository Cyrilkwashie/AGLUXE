'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { premiumEase } from '@/lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedText({ children, className = '', delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: premiumEase, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
