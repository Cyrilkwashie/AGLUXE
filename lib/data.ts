// Editorial image constants for static brand sections
const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  editorial1: img('photo-1506630448388-4e683c67ddb0', 800),
  ring2: img('photo-1602173574767-37ac01994b2a', 800),
};

export type { Product, Category, CategoryWithCount } from './types';
