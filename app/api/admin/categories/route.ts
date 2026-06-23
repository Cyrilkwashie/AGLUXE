import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore, newId, slugify } from '@/lib/store';
import type { Category } from '@/lib/types';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const store = await getStore();
  return NextResponse.json(store.categories);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<Omit<Category, 'id'> & { id?: string }>(request);
  if (!body?.name?.trim()) return jsonError('Name is required');
  if (!body.tagline?.trim()) return jsonError('Tagline is required');
  if (!body.image?.trim()) return jsonError('Image URL is required');

  const store = await getStore();
  const slug = body.slug?.trim() || slugify(body.name);

  if (store.categories.some((c) => c.slug === slug)) {
    return jsonError('A category with this slug already exists');
  }

  const category: Category = {
    id: body.id?.trim() || newId('cat'),
    name: body.name.trim(),
    slug,
    tagline: body.tagline.trim(),
    image: body.image.trim(),
  };

  store.categories.push(category);
  await saveStore(store);
  return NextResponse.json(category, { status: 201 });
}
