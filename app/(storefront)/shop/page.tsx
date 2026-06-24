import ShopCatalog from '@/components/shop/ShopCatalog';

export const metadata = {
  title: 'Shop',
  description: 'Browse our collection of fine jewelry — rings, necklaces, bracelets, and earrings.',
};

export default function ShopPage() {
  return (
    <main className="pt-16 md:pt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-ag-gold mb-4">Collections</p>
        <h1 className="font-display text-5xl md:text-6xl font-light text-ag-black mb-4">Shop</h1>
        <p className="font-sans text-sm text-ag-muted max-w-xl leading-relaxed">
          Explore our complete collection of fine jewelry. Filter by category or browse new
          arrivals and bestsellers.
        </p>
      </div>
      <section className="pb-24 md:pb-36 lg:pb-48 bg-ag-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <ShopCatalog />
        </div>
      </section>
    </main>
  );
}
