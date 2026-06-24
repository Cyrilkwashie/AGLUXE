export type Category = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  image: string;
};

export type ProductMedia = {
  url: string;
  type: 'image' | 'video';
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  category: string;
  material: string;
  media: ProductMedia[];
  image: string;
  hoverImage: string;
  description: string;
  isNew: boolean;
  isBestseller: boolean;
};

export type FeaturedCollectionItem = {
  id: string;
  label: string;
  name: string;
  material: string;
  description: string;
  price: number;
  image: string;
  productId?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
};

export type HeroVideo = {
  src: string;
  poster: string;
};

export type InstagramPost = {
  id: string;
  image: string;
  alt: string;
};

export type Store = {
  categories: Category[];
  products: Product[];
  featuredCollection: FeaturedCollectionItem[];
  testimonials: Testimonial[];
  instagramPosts: InstagramPost[];
  marqueeItems: string[];
  heroVideos: HeroVideo[];
};

export type CategoryWithCount = Category & { count: number };

export type PublicCatalog = Store & {
  categories: CategoryWithCount[];
};
