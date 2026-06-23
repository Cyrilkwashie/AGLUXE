'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import { premiumEase } from '@/lib/motion';

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    totalItems,
    subtotal,
    updateQuantity,
    removeItem,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: premiumEase }}
            className="fixed inset-0 z-[70] bg-black/40"
            onClick={closeCart}
            aria-hidden
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-ag-white shadow-2xl flex flex-col"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ag-border">
              <h2 className="font-display text-2xl font-light text-ag-black">
                Your Bag
                {totalItems > 0 && (
                  <span className="font-sans text-xs tracking-[0.3em] uppercase text-ag-muted ml-3">
                    ({totalItems})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-ag-charcoal hover:text-ag-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-1"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <p className="font-display text-xl text-ag-charcoal mb-2">Your bag is empty</p>
                <p className="font-sans text-sm text-ag-muted mb-8">
                  Discover pieces made for the timeless you.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="font-sans text-xs tracking-[0.3em] uppercase bg-ag-gold text-white px-8 py-3.5 hover:bg-ag-gold-dark transition-colors duration-500"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                  {lines.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-4">
                      <Link
                        href={`/shop/${product.id}`}
                        onClick={closeCart}
                        className="relative w-24 aspect-[3/4] bg-ag-cream overflow-hidden shrink-0"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${product.id}`}
                          onClick={closeCart}
                          className="font-display text-base text-ag-black hover:text-ag-gold transition-colors"
                        >
                          {product.name}
                        </Link>
                        <p className="font-sans text-[11px] text-ag-muted mt-0.5">
                          {product.material}
                        </p>
                        <p className="font-sans text-sm font-medium text-ag-black mt-2">
                          {formatPrice(product.price)}
                        </p>

                        <div className="flex items-center gap-3 mt-3">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-7 h-7 border border-ag-border flex items-center justify-center hover:border-ag-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold"
                          >
                            <Minus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                          <span className="font-sans text-sm w-4 text-center">{quantity}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-7 h-7 border border-ag-border flex items-center justify-center hover:border-ag-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold"
                          >
                            <Plus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                          <button
                            aria-label={`Remove ${product.name}`}
                            onClick={() => removeItem(product.id)}
                            className="ml-auto text-ag-muted hover:text-ag-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-1"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-ag-border px-6 py-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs tracking-[0.3em] uppercase text-ag-muted">
                      Subtotal
                    </span>
                    <span className="font-sans text-lg font-medium text-ag-black">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="font-sans text-[10px] text-ag-muted">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block w-full text-center font-sans text-xs tracking-[0.3em] uppercase bg-ag-gold text-white py-4 hover:bg-ag-gold-dark transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-ag-gold focus:ring-offset-2"
                  >
                    View Cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
