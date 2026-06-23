import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Bag — AG LUXE',
  description: 'Review the fine jewelry pieces in your AG LUXE bag.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
