import fs from 'fs/promises';
import path from 'path';
import { createSeedStore } from './seed';
import { isSupabaseConfigured } from './supabase/server';
import { getStoreFromSupabase, saveStoreToSupabase } from './supabase/store';
import { normalizeProduct } from './product-media';
import type { CategoryWithCount, PublicCatalog, Store } from './types';

const STORE_PATH = path.join(process.cwd(), 'data', 'store.json');

async function getStoreFromFile(): Promise<Store> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf-8');
    const store = JSON.parse(raw) as Store;
    return {
      ...store,
      products: store.products.map((product) => normalizeProduct(product)),
    };
  } catch {
    const seeded = createSeedStore();
    await saveStoreToFile(seeded);
    return seeded;
  }
}

async function saveStoreToFile(store: Store): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
}

export async function getStore(): Promise<Store> {
  if (isSupabaseConfigured()) {
    return getStoreFromSupabase();
  }
  return getStoreFromFile();
}

export async function saveStore(store: Store): Promise<void> {
  if (isSupabaseConfigured()) {
    await saveStoreToSupabase(store);
    return;
  }
  await saveStoreToFile(store);
}

export function withCategoryCounts(store: Store): PublicCatalog {
  const categories: CategoryWithCount[] = store.categories.map((cat) => ({
    ...cat,
    count: store.products.filter((p) => p.category === cat.slug).length,
  }));

  return { ...store, categories };
}

export async function getPublicCatalog(): Promise<PublicCatalog> {
  const store = await getStore();
  return withCategoryCounts(store);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function getStorageBackend(): 'supabase' | 'file' {
  return isSupabaseConfigured() ? 'supabase' : 'file';
}
