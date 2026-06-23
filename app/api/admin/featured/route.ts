import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore, newId } from '@/lib/store';
import type { FeaturedCollectionItem } from '@/lib/types';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const store = await getStore();
  return NextResponse.json(store.featuredCollection);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<Omit<FeaturedCollectionItem, 'id'>>(request);
  if (!body?.name?.trim() || !body.image?.trim()) {
    return jsonError('Name and image are required');
  }
  if (typeof body.price !== 'number') return jsonError('Price is required');

  const store = await getStore();
  const item: FeaturedCollectionItem = {
    id: newId('feat'),
    label: body.label?.trim() ?? 'Featured',
    name: body.name.trim(),
    material: body.material?.trim() ?? '',
    description: body.description?.trim() ?? '',
    price: body.price,
    image: body.image.trim(),
    productId: body.productId,
  };

  store.featuredCollection.push(item);
  await saveStore(store);
  return NextResponse.json(item, { status: 201 });
}
