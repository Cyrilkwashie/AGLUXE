import { getStore } from './store';
import type { Product } from './types';

export async function getProductById(id: string): Promise<Product | undefined> {
  const store = await getStore();
  return store.products.find((p) => p.id === id);
}

export async function getAllProducts(): Promise<Product[]> {
  const store = await getStore();
  return store.products;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const store = await getStore();
  return store.products.filter((p) => p.category === category);
}

export async function getCategoryName(slug: string): Promise<string> {
  const store = await getStore();
  return store.categories.find((c) => c.slug === slug)?.name ?? slug;
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const store = await getStore();
  return store.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
