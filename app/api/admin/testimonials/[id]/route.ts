import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore } from '@/lib/store';
import type { Testimonial } from '@/lib/types';

type Params = { params: { id: string } };

export async function PUT(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<Partial<Testimonial>>(request);
  if (!body) return jsonError('Invalid body');

  const store = await getStore();
  const index = store.testimonials.findIndex((t) => t.id === params.id);
  if (index === -1) return jsonError('Testimonial not found', 404);

  store.testimonials[index] = {
    ...store.testimonials[index],
    name: body.name?.trim() ?? store.testimonials[index].name,
    location: body.location?.trim() ?? store.testimonials[index].location,
    quote: body.quote?.trim() ?? store.testimonials[index].quote,
    rating:
      body.rating !== undefined
        ? Math.min(5, Math.max(1, body.rating))
        : store.testimonials[index].rating,
  };

  await saveStore(store);
  return NextResponse.json(store.testimonials[index]);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const store = await getStore();
  store.testimonials = store.testimonials.filter((t) => t.id !== params.id);
  await saveStore(store);
  return NextResponse.json({ success: true });
}
