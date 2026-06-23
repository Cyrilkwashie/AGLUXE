import { getSupabaseAdmin } from './server';

export const MEDIA_BUCKET = 'media';

const MAX_BYTES = 50 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
]);

export function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function validateMediaFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return 'File type not allowed. Use JPG, PNG, WebP, GIF, MP4, or WebM.';
  }
  if (file.size > MAX_BYTES) {
    return 'File is too large. Maximum size is 50MB.';
  }
  return null;
}

export async function uploadMediaFile(
  file: File,
  folder: string
): Promise<{ url: string; path: string }> {
  const validationError = validateMediaFile(file);
  if (validationError) throw new Error(validationError);

  const safeName = sanitizeFilename(file.name || 'upload.bin');
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}
