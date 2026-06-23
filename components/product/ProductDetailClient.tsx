'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCatalog } from '@/context/CatalogContext';
import { formatPrice } from '@/lib/format';
import { getProductDescription, getProductDetails } from '@/lib/product-utils';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  const { addItem } = useCart();
  const { products, getCategoryName } = useCatalog();
  const [activeImage, setActiveImage] = useState<'primary' | 'hover'>('primary');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const description = getProductDescription(product);
  const details = getProductDetails(product);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <nav className="font-sans text-[11px] tracking-widest uppercase text-ag-muted mb-8">
        <Link href="/shop" className="hover:text-ag-gold transition-colors">
          Shop
        </Link>
        <span className="mx-3">/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-ag-gold transition-colors"
        >
          {getCategoryName(product.category)}
        </Link>
        <span className="mx-3">/</span>
        <span className="text-ag-charcoal">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <div
            className="relative aspect-[3/4] bg-ag-cream overflow-hidden mb-4 cursor-pointer"
            onMouseEnter={() => setActiveImage('hover')}
            onMouseLeave={() => setActiveImage('primary')}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-500 ${
                activeImage === 'primary' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <Image
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-500 ${
                activeImage === 'hover' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {product.isNew && (
              <span className="absolute top-6 left-6 bg-ag-gold text-white text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 font-sans">
                New
              </span>
            )}
          </div>

          <div className="flex gap-3">
            {[product.image, product.hoverImage].map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i === 0 ? 'primary' : 'hover')}
                className={`relative w-20 aspect-[3/4] overflow-hidden border-2 transition-colors ${
                  (i === 0 && activeImage === 'primary') ||
                  (i === 1 && activeImage === 'hover')
                    ? 'border-ag-gold'
                    : 'border-transparent'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-ag-gold" />
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-ag-gold">
              {getCategoryName(product.category)}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-ag-black leading-tight mb-3">
            {product.name}
          </h1>
          <p className="font-sans text-[13px] text-ag-muted mb-6">{product.material}</p>

          <div className="flex items-center gap-3 mb-8">
            <span className="font-sans text-2xl font-medium text-ag-black">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-base text-ag-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="font-sans text-sm text-ag-charcoal leading-[1.9] mb-8 max-w-md">
            {description}
          </p>

          <ul className="space-y-2 mb-10">
            {details.map((detail) => (
              <li
                key={detail}
                className="font-sans text-xs text-ag-muted flex items-center gap-2"
              >
                <span className="text-ag-gold">✦</span>
                {detail}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mb-6">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-ag-muted">
              Qty
            </span>
            <div className="flex items-center border border-ag-border">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-ag-cream transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold"
              >
                −
              </button>
              <span className="w-10 text-center font-sans text-sm">{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-ag-cream transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 font-sans text-xs tracking-[0.3em] uppercase bg-ag-gold text-white py-4 hover:bg-ag-gold-dark transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-ag-gold focus:ring-offset-2"
            >
              {added ? 'Added to Bag ✓' : 'Add to Bag'}
            </button>
            <Button href="/shop" variant="outline" className="flex-1 text-center">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 md:mt-36 pt-16 border-t border-ag-border">
          <h2 className="font-display text-3xl md:text-4xl font-light text-ag-black mb-10">
            You May Also Love
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
