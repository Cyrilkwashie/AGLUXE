'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import { getCardMedia, isVideoMedia } from '@/lib/product-media';
import type { Product } from '@/lib/types';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const { primary, hover } = getCardMedia(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
  };

  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <article>
        <div className="relative aspect-[3/4] overflow-hidden bg-ag-cream mb-4">
          {isVideoMedia(primary) ? (
            <video
              src={primary.url}
              muted
              loop
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={primary.url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {hover && hover.url !== primary.url && !isVideoMedia(hover) && (
            <Image
              src={hover.url}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {hover && isVideoMedia(hover) && hover.url !== primary.url && (
            <video
              src={hover.url}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {product.isNew && (
            <span className="absolute top-4 left-4 bg-ag-gold text-white text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 font-sans">
              New
            </span>
          )}

          <button
            aria-label={`Add ${product.name} to wishlist`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-ag-charcoal hover:text-ag-gold focus:outline-none focus:ring-2 focus:ring-ag-gold rounded-full p-1"
          >
            <Heart className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-ag-black/90 text-white text-[10px] tracking-[0.3em] uppercase py-3 font-sans translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ag-gold"
          >
            Add to Cart ↓
          </button>
        </div>

        <h3 className="font-display text-base text-ag-black mb-1 group-hover:text-ag-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-sans text-[11px] text-ag-muted mb-2">{product.material}</p>
        <div className="flex items-center gap-2">
          <span className="font-sans text-sm font-medium text-ag-black">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-sans text-xs text-ag-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
