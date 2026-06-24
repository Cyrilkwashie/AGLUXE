import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { normalizeProduct } from '@/lib/product-media';
import { getStore, saveStore, newId } from '@/lib/store';
import type { Product } from '@/lib/types';

function buildProduct(body: Omit<Product, 'id'> & { id?: string }, id: string): Product {
  const product = normalizeProduct({
    id,
    name: body.name.trim(),
    price: body.price,
    originalPrice: body.originalPrice ?? null,
    category: body.category.trim(),
    material: body.material.trim(),
    media: body.media ?? [],
    image: body.image ?? '',
    hoverImage: body.hoverImage ?? '',
    description: body.description?.trim() ?? '',
    isNew: Boolean(body.isNew),
    isBestseller: Boolean(body.isBestseller),
  });

  if (product.media.length === 0) {
    throw new Error('At least one image or video is required');
  }

  return product;
}

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
  if (typeof body.price !== 'number' || body.price < 0) return jsonError('Valid price is required');

  const store = await getStore();
  if (!store.categories.some((c) => c.slug === body.category)) {
    return jsonError('Category does not exist');
  }

  try {
    const product = buildProduct(body, body.id?.trim() || newId('prod'));
    store.products.push(product);
    await saveStore(store);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : 'Invalid product media', 400);
  }
}
