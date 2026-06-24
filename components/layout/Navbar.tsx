'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { mainNavLinks } from '@/lib/navigation';
import { premiumEase } from '@/lib/motion';

const linkClass =
  'relative font-sans text-xs tracking-widest uppercase transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-ag-gold hover:after:w-full after:transition-all after:duration-300';

function isActive(pathname: string, href: string) {
  if (href === '/shop') return pathname === '/shop' || pathname.startsWith('/shop/');
  return pathname === href;
}

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === '/';
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const textColor = solid ? 'text-ag-charcoal' : 'text-white';
  const iconColor = solid ? 'text-ag-charcoal' : 'text-white';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-500 ${
          solid
            ? 'bg-white/95 backdrop-blur-md border-b border-ag-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-full flex items-center justify-between">
          <Link href="/" className={`${textColor} transition-colors duration-500`}>
            <span className="font-display text-xl tracking-[0.4em] font-light uppercase">
              AG <span className="text-ag-gold">LUXE</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {mainNavLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${linkClass} ${textColor} hover:text-ag-gold ${
                    active ? 'text-ag-gold after:w-full' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              aria-label="Search"
              className={`${iconColor} hover:text-ag-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-1`}
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              aria-label="Shopping bag"
              onClick={openCart}
              className={`relative ${iconColor} hover:text-ag-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-1`}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-ag-gold text-white text-[9px] flex items-center justify-center rounded-full font-sans">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden ${iconColor} hover:text-ag-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-1`}
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: premiumEase }}
            className="fixed inset-0 z-[60] bg-ag-black flex flex-col items-center justify-center"
          >
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-ag-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-1"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {mainNavLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: premiumEase }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl text-white hover:text-ag-gold transition-colors duration-300 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
