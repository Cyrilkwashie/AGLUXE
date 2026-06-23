'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { premiumEase } from '@/lib/motion';

import { images } from '@/lib/data';

export default function BrandStory() {
  return (
    <section id="brand-story" className="py-24 md:py-36 lg:py-48 bg-ag-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="lg:col-span-5"
          >
            <blockquote className="font-display text-4xl md:text-5xl lg:text-[56px] italic text-ag-charcoal leading-tight mb-8">
              AG LUXE is a house of quiet luxury — where each piece tells a story of
              precision, devotion, and timeless beauty.
            </blockquote>
            <p className="font-sans text-sm text-ag-charcoal leading-[1.9] mb-6 max-w-md">
              Founded on the belief that fine jewelry should feel personal, not
              performative. Every creation begins with a conversation — understanding
              the moments you wish to commemorate, the stories you want to carry.
            </p>
            <p className="font-sans text-sm text-ag-charcoal leading-[1.9] mb-10 max-w-md">
              From ethically sourced materials to rigorous quality standards, we create
              pieces meant to be passed down through generations.
            </p>
            <Button href="#brand-story" variant="ghost" className="!px-0">
              Learn Our Story →
            </Button>
          </motion.div>

          <div className="lg:col-span-7 relative min-h-[500px]">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase, delay: 0.1 }}
              className="relative w-[70%] aspect-[3/4] overflow-hidden"
            >
              <Image
                src={images.editorial1}
                alt="Editorial jewelry portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase, delay: 0.25 }}
              className="absolute bottom-0 right-0 w-[45%] aspect-square overflow-hidden shadow-2xl"
            >
              <Image
                src={images.ring2}
                alt="Diamond ring detail"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
