import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/admin-api';
import { isSupabaseConfigured } from '@/lib/supabase/server';
import { uploadMediaFile } from '@/lib/supabase/storage';

const ALLOWED_FOLDERS = new Set([
  'products',
  'categories',
  'featured',
  'instagram',
  'videos',
]);

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!isSupabaseConfigured()) {
    return jsonError('Supabase Storage is not configured. Add your Supabase env vars.', 503);
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = String(formData.get('folder') ?? 'products');

    if (!(file instanceof File)) {
      return jsonError('No file provided');
    }

    if (!ALLOWED_FOLDERS.has(folder)) {
      return jsonError('Invalid upload folder');
    }

    const result = await uploadMediaFile(file, folder);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return jsonError(message, 400);
  }
}
