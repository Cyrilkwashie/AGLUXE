import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductById, getAllProducts } from '@/lib/products';
import ProductDetailClient from '@/components/product/ProductDetailClient';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id);
  if (!product) return { title: 'Product Not Found — AG LUXE' };

  return {
    title: `${product.name} — AG LUXE`,
    description: `${product.name} in ${product.material}. Fine jewelry by AG LUXE.`,
    openGraph: {
      title: `${product.name} — AG LUXE`,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <main className="pt-16 md:pt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <ProductDetailClient product={product} />
      </div>
    </main>
  );
}
