export const HERO_VIDEO_SRC = '/videos/hero.mp4';

export const SITE_NAME = 'AG LUXE';
export const SITE_TITLE = 'AG LUXE — Fine Jewelry for the Timeless You';
export const SITE_DESCRIPTION =
  'Discover fine jewelry — rings, necklaces, bracelets, and earrings in 18K gold and certified diamonds.';
export const SITE_TAGLINE = 'Timeless. Refined. Yours.';
export const SITE_KEYWORDS = [
  'fine jewelry',
  'luxury jewelry',
  '18K gold',
  'diamond rings',
  'AG LUXE',
];

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}
