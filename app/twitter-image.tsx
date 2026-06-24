import { ogSize, renderBrandImage } from '@/lib/og-brand';

export const runtime = 'edge';
export const alt = 'AG LUXE — Fine Jewelry for the Timeless You';
export const size = ogSize;
export const contentType = 'image/png';

export default async function TwitterImage() {
  return renderBrandImage(size);
}
