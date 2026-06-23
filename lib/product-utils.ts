import type { Product } from './types';

export function getProductDescription(product: Product): string {
  return (
    product.description ||
    'Made with precision and devotion, this piece embodies the quiet luxury of AG LUXE.'
  );
}

export function getProductDetails(product: Product): string[] {
  return [
    product.material,
    'Premium materials and exceptional finish',
    'Complimentary worldwide shipping',
    'Lifetime care program included',
    'Presented in signature AG LUXE packaging',
  ];
}
