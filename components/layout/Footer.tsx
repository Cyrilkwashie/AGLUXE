'use client';

import Link from 'next/link';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { useCatalog } from '@/context/CatalogContext';

const aboutLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Quality', href: '/about#quality' },
  { label: 'Sustainability', href: '/about' },
  { label: 'Press', href: '/contact' },
  { label: 'Careers', href: '/contact' },
];

const contactLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'hello@agluxe.com', href: 'mailto:hello@agluxe.com' },
  { label: '+1 (800) 000 0000', href: 'tel:+18000000000' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
];

export default function Footer() {
  const { categories } = useCatalog();

  const shopLinks = [
    ...categories.map((c) => ({
      label: c.name,
      href: `/shop?category=${c.slug}`,
    })),
    { label: 'New Arrivals', href: '/shop' },
    { label: 'Bestsellers', href: '/shop' },
  ];

  return (
    <footer className="bg-ag-black text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <span className="font-display text-xl tracking-[0.4em] font-light uppercase">
              AG <span className="text-ag-gold">LUXE</span>
            </span>
            <p className="font-display text-sm italic text-white/70 mt-4 leading-relaxed">
              &ldquo;Designed for the ones you love.&rdquo;
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-white/60 hover:text-ag-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-1"
              >
                <InstagramIcon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-6">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/80 hover:text-ag-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-6">
              About
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/80 hover:text-ag-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-6">
              Contact
            </h3>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-white/80 hover:text-ag-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-white/50">
            © 2025 AG LUXE. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="font-sans text-xs text-white/50 hover:text-ag-gold transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="font-sans text-xs text-white/50 hover:text-ag-gold transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
