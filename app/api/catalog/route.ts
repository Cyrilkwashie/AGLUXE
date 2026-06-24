import { NextResponse } from 'next/server';
import { getPublicCatalog, getStorageBackend } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const catalog = await getPublicCatalog();
    return NextResponse.json(catalog, {
      headers: {
        'Cache-Control': 'no-store',
        'X-Storage-Backend': getStorageBackend(),
      },
    });
  } catch (error) {
    console.error('Failed to load catalog:', error);
    return NextResponse.json(
      { error: 'Failed to load catalog from storage backend.' },
      { status: 500 }
    );
  }
}
