import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Providers from '@/components/providers/Providers';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AG LUXE — Fine Jewelry for the Timeless You',
  description:
    'Discover fine jewelry — rings, necklaces, bracelets, and earrings in 18K gold and certified diamonds.',
  openGraph: {
    title: 'AG LUXE Fine Jewelry',
    description: 'Timeless. Refined. Yours.',
    images: [
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=1200&q=80',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
