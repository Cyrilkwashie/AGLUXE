import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore } from '@/lib/store';
import type { FeaturedCollectionItem } from '@/lib/types';

type Params = { params: { id: string } };

export async function PUT(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<Partial<FeaturedCollectionItem>>(request);
  if (!body) return jsonError('Invalid body');

  const store = await getStore();
  const index = store.featuredCollection.findIndex((f) => f.id === params.id);
  if (index === -1) return jsonError('Item not found', 404);

  const current = store.featuredCollection[index];
  store.featuredCollection[index] = {
    ...current,
    label: body.label?.trim() ?? current.label,
    name: body.name?.trim() ?? current.name,
    material: body.material?.trim() ?? current.material,
    description: body.description?.trim() ?? current.description,
    price: typeof body.price === 'number' ? body.price : current.price,
    image: body.image?.trim() ?? current.image,
    productId: body.productId ?? current.productId,
  };

  await saveStore(store);
  return NextResponse.json(store.featuredCollection[index]);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const store = await getStore();
  store.featuredCollection = store.featuredCollection.filter((f) => f.id !== params.id);
  await saveStore(store);
  return NextResponse.json({ success: true });
}
