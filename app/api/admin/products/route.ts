import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore, newId } from '@/lib/store';
import type { Product } from '@/lib/types';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const store = await getStore();
  return NextResponse.json(store.products);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<Omit<Product, 'id'> & { id?: string }>(request);
  if (!body?.name?.trim()) return jsonError('Name is required');
  if (!body.category?.trim()) return jsonError('Category is required');
  if (!body.material?.trim()) return jsonError('Material is required');
  if (!body.image?.trim()) return jsonError('Image URL is required');
  if (typeof body.price !== 'number' || body.price < 0) return jsonError('Valid price is required');

  const store = await getStore();
  if (!store.categories.some((c) => c.slug === body.category)) {
    return jsonError('Category does not exist');
  }

  const product: Product = {
    id: body.id?.trim() || newId('prod'),
    name: body.name.trim(),
    price: body.price,
    originalPrice: body.originalPrice ?? null,
    category: body.category.trim(),
    material: body.material.trim(),
    image: body.image.trim(),
    hoverImage: body.hoverImage?.trim() || body.image.trim(),
    description: body.description?.trim() ?? '',
    isNew: Boolean(body.isNew),
    isBestseller: Boolean(body.isBestseller),
  };

  store.products.push(product);
  await saveStore(store);
  return NextResponse.json(product, { status: 201 });
}
