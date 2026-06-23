import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore } from '@/lib/store';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const store = await getStore();
  return NextResponse.json({
    marqueeItems: store.marqueeItems,
    instagramPosts: store.instagramPosts,
  });
}

export async function PUT(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<{
    marqueeItems?: string[];
    instagramPosts?: { id: string; image: string; alt: string }[];
  }>(request);

  if (!body) return jsonError('Invalid body');

  const store = await getStore();

  if (body.marqueeItems) store.marqueeItems = body.marqueeItems;
  if (body.instagramPosts) store.instagramPosts = body.instagramPosts;

  await saveStore(store);
  return NextResponse.json({ success: true });
}
