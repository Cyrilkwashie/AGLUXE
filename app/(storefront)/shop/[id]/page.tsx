import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPrimaryImageUrl } from '@/lib/product-media';
import { getProductById } from '@/lib/products';
import ProductDetailClient from '@/components/product/ProductDetailClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id);
  if (!product) return { title: 'Product Not Found — AG LUXE' };

  return {
    title: `${product.name} — AG LUXE`,
    description: `${product.name} in ${product.material}. Fine jewelry by AG LUXE.`,
    openGraph: {
      title: `${product.name} — AG LUXE`,
      images: [getPrimaryImageUrl(product)],
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
