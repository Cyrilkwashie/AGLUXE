import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore } from '@/lib/store';
import type { Product } from '@/lib/types';

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const store = await getStore();
  const product = store.products.find((p) => p.id === params.id);
  if (!product) return jsonError('Product not found', 404);
  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<Partial<Product>>(request);
  if (!body) return jsonError('Invalid body');

  const store = await getStore();
  const index = store.products.findIndex((p) => p.id === params.id);
  if (index === -1) return jsonError('Product not found', 404);

  const current = store.products[index];

  if (body.category && !store.categories.some((c) => c.slug === body.category)) {
    return jsonError('Category does not exist');
  }

  const updated: Product = {
    ...current,
    name: body.name?.trim() ?? current.name,
    price: typeof body.price === 'number' ? body.price : current.price,
    originalPrice: body.originalPrice !== undefined ? body.originalPrice : current.originalPrice,
    category: body.category?.trim() ?? current.category,
    material: body.material?.trim() ?? current.material,
    image: body.image?.trim() ?? current.image,
    hoverImage: body.hoverImage?.trim() ?? current.hoverImage,
    description: body.description?.trim() ?? current.description,
    isNew: body.isNew !== undefined ? Boolean(body.isNew) : current.isNew,
    isBestseller:
      body.isBestseller !== undefined ? Boolean(body.isBestseller) : current.isBestseller,
  };

  store.products[index] = updated;
  await saveStore(store);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const store = await getStore();
  if (!store.products.some((p) => p.id === params.id)) {
    return jsonError('Product not found', 404);
  }

  store.products = store.products.filter((p) => p.id !== params.id);
  await saveStore(store);
  return NextResponse.json({ success: true });
}
