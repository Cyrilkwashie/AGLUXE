import { NextResponse } from 'next/server';
import { getPublicCatalog } from '@/lib/store';

export async function GET() {
  const catalog = await getPublicCatalog();
  return NextResponse.json(catalog);
}
