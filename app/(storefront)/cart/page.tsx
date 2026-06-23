'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { lines, subtotal, totalItems, updateQuantity, removeItem, clearCart } =
    useCart();

  return (
    <main className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <h1 className="font-display text-5xl md:text-6xl font-light text-ag-black mb-4">
          Your Bag
        </h1>
        <p className="font-sans text-sm text-ag-muted mb-12">
          {totalItems === 0
            ? 'Your bag is currently empty.'
            : `${totalItems} item${totalItems === 1 ? '' : 's'} in your bag`}
        </p>

        {lines.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-ag-charcoal mb-6">
              Nothing here yet
            </p>
            <Button href="/shop">Explore Collection</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-2 space-y-8">
              {lines.map(({ product, quantity }) => (
                <article
                  key={product.id}
                  className="flex gap-6 pb-8 border-b border-ag-border last:border-0"
                >
                  <Link
                    href={`/shop/${product.id}`}
                    className="relative w-32 md:w-40 aspect-[3/4] bg-ag-cream overflow-hidden shrink-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <Link
                      href={`/shop/${product.id}`}
                      className="font-display text-xl md:text-2xl text-ag-black hover:text-ag-gold transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="font-sans text-[11px] text-ag-muted mt-1">
                      {product.material}
                    </p>
                    <p className="font-sans text-base font-medium text-ag-black mt-3">
                      {formatPrice(product.price)}
                    </p>

                    <div className="flex items-center gap-4 mt-auto pt-4">
                      <div className="flex items-center border border-ag-border">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-ag-cream transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold"
                        >
                          <Minus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center font-sans text-sm">
                          {quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-ag-cream transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold"
                        >
                          <Plus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase text-ag-muted hover:text-ag-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold rounded px-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="font-sans text-base font-medium text-ag-black hidden md:block">
                    {formatPrice(product.price * quantity)}
                  </p>
                </article>
              ))}

              <button
                onClick={clearCart}
                className="font-sans text-[11px] tracking-widest uppercase text-ag-muted hover:text-ag-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold"
              >
                Clear Bag
              </button>
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-ag-cream p-8 sticky top-28">
                <h2 className="font-sans text-xs tracking-[0.4em] uppercase text-ag-gold mb-6">
                  Order Summary
                </h2>
                <div className="flex justify-between mb-3">
                  <span className="font-sans text-sm text-ag-muted">Subtotal</span>
                  <span className="font-sans text-sm text-ag-black">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="font-sans text-sm text-ag-muted">Shipping</span>
                  <span className="font-sans text-sm text-ag-black">Complimentary</span>
                </div>
                <div className="border-t border-ag-border my-4" />
                <div className="flex justify-between mb-8">
                  <span className="font-sans text-xs tracking-[0.3em] uppercase text-ag-charcoal">
                    Total
                  </span>
                  <span className="font-sans text-xl font-medium text-ag-black">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <button className="w-full font-sans text-xs tracking-[0.3em] uppercase bg-ag-black text-white py-4 hover:bg-ag-charcoal transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-ag-gold focus:ring-offset-2 mb-4">
                  Proceed to Checkout
                </button>
                <Button href="/shop" variant="ghost" className="w-full text-center !px-0">
                  Continue Shopping
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
