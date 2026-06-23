import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError, parseBody } from '@/lib/admin-api';
import { getStore, saveStore } from '@/lib/store';
import type { HeroVideo } from '@/lib/types';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const store = await getStore();
  return NextResponse.json({
    marqueeItems: store.marqueeItems,
    heroVideos: store.heroVideos,
    instagramPosts: store.instagramPosts,
  });
}

export async function PUT(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await parseBody<{
    marqueeItems?: string[];
    heroVideos?: HeroVideo[];
    instagramPosts?: { id: string; image: string; alt: string }[];
  }>(request);

  if (!body) return jsonError('Invalid body');

  const store = await getStore();

  if (body.marqueeItems) store.marqueeItems = body.marqueeItems;
  if (body.heroVideos) store.heroVideos = body.heroVideos;
  if (body.instagramPosts) store.instagramPosts = body.instagramPosts;

  await saveStore(store);
  return NextResponse.json({ success: true });
}
