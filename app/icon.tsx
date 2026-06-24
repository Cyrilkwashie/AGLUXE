import { renderBrandImage } from '@/lib/og-brand';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  return renderBrandImage(size);
}
