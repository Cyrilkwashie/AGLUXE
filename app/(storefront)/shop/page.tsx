import ProductGrid from '@/components/sections/ProductGrid';

export const metadata = {
  title: 'Shop — AG LUXE',
  description: 'Browse our collection of fine jewelry — rings, necklaces, bracelets, and earrings.',
};

export default function ShopPage() {
  return (
    <main className="pt-16 md:pt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <h1 className="font-display text-5xl md:text-6xl font-light text-ag-black mb-4">
          Shop
        </h1>
        <p className="font-sans text-sm text-ag-muted max-w-md leading-relaxed">
          Explore our complete collection of fine jewelry, each piece
          designed to become part of your story.
        </p>
      </div>
      <ProductGrid />
    </main>
  );
}
