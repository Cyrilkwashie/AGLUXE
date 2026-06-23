import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore, slugify } from '@/lib/store';
import type { Category } from '@/lib/types';

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const store = await getStore();
  const category = store.categories.find((c) => c.id === params.id);
  if (!category) return jsonError('Category not found', 404);
  return NextResponse.json(category);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<Partial<Category>>(request);
  if (!body) return jsonError('Invalid body');

  const store = await getStore();
  const index = store.categories.findIndex((c) => c.id === params.id);
  if (index === -1) return jsonError('Category not found', 404);

  const current = store.categories[index];
  const slug = body.slug?.trim() || (body.name ? slugify(body.name) : current.slug);

  if (store.categories.some((c) => c.slug === slug && c.id !== params.id)) {
    return jsonError('A category with this slug already exists');
  }

  const updated: Category = {
    ...current,
    name: body.name?.trim() ?? current.name,
    slug,
    tagline: body.tagline?.trim() ?? current.tagline,
    image: body.image?.trim() ?? current.image,
  };

  store.categories[index] = updated;

  if (current.slug !== updated.slug) {
    store.products = store.products.map((p) =>
      p.category === current.slug ? { ...p, category: updated.slug } : p
    );
  }

  await saveStore(store);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const store = await getStore();
  const category = store.categories.find((c) => c.id === params.id);
  if (!category) return jsonError('Category not found', 404);

  const inUse = store.products.some((p) => p.category === category.slug);
  if (inUse) {
    return jsonError('Cannot delete category with assigned products. Reassign products first.');
  }

  store.categories = store.categories.filter((c) => c.id !== params.id);
  await saveStore(store);
  return NextResponse.json({ success: true });
}
