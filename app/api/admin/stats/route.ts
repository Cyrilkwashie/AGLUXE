import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-api';
import { getStore } from '@/lib/store';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const store = await getStore();
  return NextResponse.json({
    categories: store.categories.length,
    products: store.products.length,
    featured: store.featuredCollection.length,
    testimonials: store.testimonials.length,
    newProducts: store.products.filter((p) => p.isNew).length,
    bestsellers: store.products.filter((p) => p.isBestseller).length,
  });
}
