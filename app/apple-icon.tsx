import { renderBrandImage } from '@/lib/og-brand';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return renderBrandImage(size);
}
