import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore, newId } from '@/lib/store';
import type { Testimonial } from '@/lib/types';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const store = await getStore();
  return NextResponse.json(store.testimonials);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<Omit<Testimonial, 'id'>>(request);
  if (!body?.name?.trim() || !body.quote?.trim()) {
    return jsonError('Name and quote are required');
  }

  const store = await getStore();
  const item: Testimonial = {
    id: newId('test'),
    name: body.name.trim(),
    location: body.location?.trim() ?? '',
    quote: body.quote.trim(),
    rating: Math.min(5, Math.max(1, body.rating ?? 5)),
  };

  store.testimonials.push(item);
  await saveStore(store);
  return NextResponse.json(item, { status: 201 });
}
