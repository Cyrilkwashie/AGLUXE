import type { Product, ProductMedia } from '@/lib/types';

export function detectMediaType(url: string): ProductMedia['type'] {
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return 'video';
  return 'image';
}

export function legacyMediaFromProduct(product: Pick<Product, 'media' | 'image' | 'hoverImage'>): ProductMedia[] {
  if (product.media?.length) {
    return product.media.filter((item) => item.url.trim());
  }

  const items: ProductMedia[] = [];

  if (product.image?.trim()) {
    items.push({ url: product.image.trim(), type: detectMediaType(product.image) });
  }

  if (product.hoverImage?.trim() && product.hoverImage.trim() !== product.image?.trim()) {
    items.push({ url: product.hoverImage.trim(), type: detectMediaType(product.hoverImage) });
  }

  return items;
}

export function syncLegacyImageFields<T extends Pick<Product, 'media' | 'image' | 'hoverImage'>>(
  product: T
): T {
  const media = product.media.filter((item) => item.url.trim());
  const images = media.filter((item) => item.type === 'image');

  return {
    ...product,
    media,
    image: images[0]?.url ?? media[0]?.url ?? product.image ?? '',
    hoverImage:
      images[1]?.url ??
      media[1]?.url ??
      images[0]?.url ??
      product.hoverImage ??
      product.image ??
      '',
  };
}

export function normalizeProduct(product: Product): Product {
  const media = legacyMediaFromProduct(product).map((item) => ({
    url: item.url.trim(),
    type: item.type ?? detectMediaType(item.url),
  }));

  return syncLegacyImageFields({ ...product, media });
}

export function getProductMedia(product: Product): ProductMedia[] {
  return legacyMediaFromProduct(normalizeProduct(product));
}

export function getPrimaryImageUrl(product: Product): string {
  const media = getProductMedia(product);
  return media.find((item) => item.type === 'image')?.url ?? media[0]?.url ?? product.image;
}

export function getCardMedia(product: Product): { primary: ProductMedia; hover?: ProductMedia } {
  const media = getProductMedia(product);
  const images = media.filter((item) => item.type === 'image');
  const primary = images[0] ?? media[0];

  if (!primary) {
    return { primary: { url: product.image, type: 'image' } };
  }

  const hover = images[1] ?? media[1];
  return hover ? { primary, hover } : { primary };
}

export function isVideoMedia(item: ProductMedia): boolean {
  return item.type === 'video' || detectMediaType(item.url) === 'video';
}
