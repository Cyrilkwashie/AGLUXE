import BrandStory from '@/components/sections/BrandStory';
import CraftsmanshipBlock from '@/components/sections/CraftsmanshipBlock';
import StaticTestimonials from '@/components/about/StaticTestimonials';
import { aboutIntro } from '@/lib/about-content';

export const metadata = {
  title: 'About',
  description:
    'Learn about AG LUXE — a house of quiet luxury, ethical sourcing, and timeless fine jewelry.',
};

export default function AboutPage() {
  return (
    <main className="pt-16 md:pt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-ag-gold mb-4">
          {aboutIntro.eyebrow}
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-light text-ag-black mb-4">
          {aboutIntro.title}
        </h1>
        <p className="font-sans text-sm text-ag-muted max-w-xl leading-relaxed">
          {aboutIntro.description}
        </p>
      </div>
      <BrandStory />
      <CraftsmanshipBlock />
      <StaticTestimonials />
    </main>
  );
}
