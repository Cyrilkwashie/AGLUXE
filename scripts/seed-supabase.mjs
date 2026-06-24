import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const storePath = path.join(process.cwd(), 'data', 'store.json');

function detectMediaType(url) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url) ? 'video' : 'image';
}

function buildMedia(product) {
  if (product.media?.length) {
    return product.media.map((item) => ({
      url: item.url,
      type: item.type ?? detectMediaType(item.url),
    }));
  }

  const media = [];
  if (product.image) media.push({ url: product.image, type: detectMediaType(product.image) });
  if (product.hoverImage && product.hoverImage !== product.image) {
    media.push({ url: product.hoverImage, type: detectMediaType(product.hoverImage) });
  }
  return media;
}

function mapProduct(product) {
  const media = buildMedia(product);

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    original_price: product.originalPrice,
    category: product.category,
    material: product.material,
    image: product.image,
    hover_image: product.hoverImage,
    description: product.description,
    is_new: product.isNew,
    is_bestseller: product.isBestseller,
    media,
  };
}

function mapFeatured(item) {
  return {
    id: item.id,
    label: item.label,
    name: item.name,
    material: item.material,
    description: item.description,
    price: item.price,
    image: item.image,
    product_id: item.productId ?? null,
  };
}

async function main() {
  const raw = await fs.readFile(storePath, 'utf-8');
  const store = JSON.parse(raw);

  const upserts = [
    { table: 'categories', rows: store.categories },
    { table: 'products', rows: store.products.map(mapProduct) },
    { table: 'featured_collection', rows: store.featuredCollection.map(mapFeatured) },
    { table: 'testimonials', rows: store.testimonials },
    {
      table: 'instagram_posts',
      rows: store.instagramPosts.map((post, index) => ({
        id: post.id,
        image: post.image,
        alt: post.alt,
        sort_order: index,
      })),
    },
  ];

  for (const { table, rows } of upserts) {
    if (rows.length === 0) continue;
    const { error } = await supabase.from(table).upsert(rows, { onConflict: 'id' });
    if (error) throw error;
  }

  const { error: settingsError } = await supabase.from('site_settings').upsert({
    id: 'default',
    marquee_items: store.marqueeItems,
  });
  if (settingsError) throw settingsError;

  console.log('Seeded Supabase from data/store.json');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
