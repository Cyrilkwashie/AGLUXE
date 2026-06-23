import { createSeedStore } from '@/lib/seed';
import type {
  Category,
  FeaturedCollectionItem,
  InstagramPost,
  Product,
  Store,
  Testimonial,
} from '@/lib/types';
import { getSupabaseAdmin } from './server';

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  image: string;
};

type ProductRow = {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  category: string;
  material: string;
  image: string;
  hover_image: string;
  description: string;
  is_new: boolean;
  is_bestseller: boolean;
};

type FeaturedRow = {
  id: string;
  label: string;
  name: string;
  material: string;
  description: string;
  price: number;
  image: string;
  product_id: string | null;
};

type TestimonialRow = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
};

type InstagramRow = {
  id: string;
  image: string;
  alt: string;
  sort_order: number;
};

type SettingsRow = {
  marquee_items: string[];
};

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline,
    image: row.image,
  };
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    originalPrice: row.original_price === null ? null : Number(row.original_price),
    category: row.category,
    material: row.material,
    image: row.image,
    hoverImage: row.hover_image,
    description: row.description,
    isNew: row.is_new,
    isBestseller: row.is_bestseller,
  };
}

function mapFeatured(row: FeaturedRow): FeaturedCollectionItem {
  return {
    id: row.id,
    label: row.label,
    name: row.name,
    material: row.material,
    description: row.description,
    price: Number(row.price),
    image: row.image,
    productId: row.product_id ?? undefined,
  };
}

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    quote: row.quote,
    rating: row.rating,
  };
}

function toCategoryRow(category: Category): CategoryRow {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    tagline: category.tagline,
    image: category.image,
  };
}

function toProductRow(product: Product): ProductRow {
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
  };
}

function toFeaturedRow(item: FeaturedCollectionItem): FeaturedRow {
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

function toTestimonialRow(item: Testimonial): TestimonialRow {
  return {
    id: item.id,
    name: item.name,
    location: item.location,
    quote: item.quote,
    rating: item.rating,
  };
}

async function isStoreEmpty(): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return (count ?? 0) === 0;
}

export async function getStoreFromSupabase(): Promise<Store> {
  const supabase = getSupabaseAdmin();

  if (await isStoreEmpty()) {
    const seeded = createSeedStore();
    await saveStoreToSupabase(seeded);
    return seeded;
  }

  const [
    categoriesRes,
    productsRes,
    featuredRes,
    testimonialsRes,
    instagramRes,
    settingsRes,
  ] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('products').select('*').order('name'),
    supabase.from('featured_collection').select('*').order('name'),
    supabase.from('testimonials').select('*').order('name'),
    supabase.from('instagram_posts').select('*').order('sort_order'),
    supabase.from('site_settings').select('marquee_items').eq('id', 'default').maybeSingle(),
  ]);

  for (const result of [
    categoriesRes,
    productsRes,
    featuredRes,
    testimonialsRes,
    instagramRes,
    settingsRes,
  ]) {
    if (result.error) throw result.error;
  }

  const instagramPosts: InstagramPost[] = ((instagramRes.data ?? []) as InstagramRow[]).map(
    (row) => ({
      id: row.id,
      image: row.image,
      alt: row.alt,
    })
  );

  const settings = settingsRes.data as SettingsRow | null;

  return {
    categories: ((categoriesRes.data ?? []) as CategoryRow[]).map(mapCategory),
    products: ((productsRes.data ?? []) as ProductRow[]).map(mapProduct),
    featuredCollection: ((featuredRes.data ?? []) as FeaturedRow[]).map(mapFeatured),
    testimonials: ((testimonialsRes.data ?? []) as TestimonialRow[]).map(mapTestimonial),
    heroVideos: [],
    instagramPosts,
    marqueeItems: settings?.marquee_items ?? [],
  };
}

export async function saveStoreToSupabase(store: Store): Promise<void> {
  const supabase = getSupabaseAdmin();

  const categoryRows = store.categories.map(toCategoryRow);
  const productRows = store.products.map(toProductRow);
  const featuredRows = store.featuredCollection.map(toFeaturedRow);
  const testimonialRows = store.testimonials.map(toTestimonialRow);
  const instagramRows = store.instagramPosts.map((post, index) => ({
    id: post.id,
    image: post.image,
    alt: post.alt,
    sort_order: index,
  }));

  const categoryIds = categoryRows.map((row) => row.id);
  const productIds = productRows.map((row) => row.id);
  const featuredIds = featuredRows.map((row) => row.id);
  const testimonialIds = testimonialRows.map((row) => row.id);
  const instagramIds = instagramRows.map((row) => row.id);

  if (categoryRows.length > 0) {
    const { error } = await supabase.from('categories').upsert(categoryRows, { onConflict: 'id' });
    if (error) throw error;
  }

  if (productRows.length > 0) {
    const { error } = await supabase.from('products').upsert(productRows, { onConflict: 'id' });
    if (error) throw error;
  }

  if (featuredRows.length > 0) {
    const { error } = await supabase
      .from('featured_collection')
      .upsert(featuredRows, { onConflict: 'id' });
    if (error) throw error;
  }

  if (testimonialRows.length > 0) {
    const { error } = await supabase
      .from('testimonials')
      .upsert(testimonialRows, { onConflict: 'id' });
    if (error) throw error;
  }

  if (instagramRows.length > 0) {
    const { error } = await supabase
      .from('instagram_posts')
      .upsert(instagramRows, { onConflict: 'id' });
    if (error) throw error;
  }

  const { error: settingsError } = await supabase.from('site_settings').upsert(
    {
      id: 'default',
      marquee_items: store.marqueeItems,
    },
    { onConflict: 'id' }
  );
  if (settingsError) throw settingsError;

  await syncIds('categories', categoryIds);
  await syncIds('products', productIds);
  await syncIds('featured_collection', featuredIds);
  await syncIds('testimonials', testimonialIds);
  await syncIds('instagram_posts', instagramIds);
}

async function syncIds(table: string, keepIds: string[]): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data: existing, error: fetchError } = await supabase.from(table).select('id');
  if (fetchError) throw fetchError;

  const orphanIds = (existing ?? [])
    .map((row) => row.id as string)
    .filter((id) => !keepIds.includes(id));

  if (orphanIds.length === 0) return;

  const { error } = await supabase.from(table).delete().in('id', orphanIds);
  if (error) throw error;
}
