import HeroVideo from '@/components/sections/HeroVideo';
import MarqueeBanner from '@/components/sections/MarqueeBanner';
import CategoryGrid from '@/components/sections/CategoryGrid';
import FeaturedCollection from '@/components/sections/FeaturedCollection';
import ProductGrid from '@/components/sections/ProductGrid';
import BrandStory from '@/components/sections/BrandStory';
import CraftsmanshipBlock from '@/components/sections/CraftsmanshipBlock';
import Testimonials from '@/components/sections/Testimonials';
import InstagramGallery from '@/components/sections/InstagramGallery';
import Newsletter from '@/components/sections/Newsletter';

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <MarqueeBanner />
      <CategoryGrid />
      <FeaturedCollection />
      <ProductGrid />
      <BrandStory />
      <CraftsmanshipBlock />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </main>
  );
}
