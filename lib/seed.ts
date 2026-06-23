import type { Store } from './types';

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export function createSeedStore(): Store {
  return {
    categories: [
      {
        id: 'cat-rings',
        name: 'Rings',
        slug: 'rings',
        tagline: 'Circles of Devotion',
        image: img('photo-1603561596112-0a132b757442', 800),
      },
      {
        id: 'cat-necklaces',
        name: 'Necklaces',
        slug: 'necklaces',
        tagline: 'Drape in Elegance',
        image: img('photo-1599643478518-a784e5dc4c8f', 800),
      },
      {
        id: 'cat-bracelets',
        name: 'Bracelets',
        slug: 'bracelets',
        tagline: 'Wrist Narratives',
        image: img('photo-1611591437281-460bfbe1220a', 800),
      },
      {
        id: 'cat-earrings',
        name: 'Earrings',
        slug: 'earrings',
        tagline: 'Frame Your Face',
        image: img('photo-1535632066927-ab7c9ab60908', 800),
      },
    ],
    products: [
      {
        id: '1',
        name: 'Soleil Ring',
        price: 1250,
        originalPrice: null,
        category: 'rings',
        material: '18K Gold',
        image: img('photo-1603561596112-0a132b757442', 600),
        hoverImage: img('photo-1602173574767-37ac01994b2a', 600),
        description:
          'A ring that captures morning light — set with three brilliant-cut diamonds in a delicate pavé band. Designed for everyday elegance with a luminous finish that catches every glance.',
        isNew: true,
        isBestseller: false,
      },
      {
        id: '2',
        name: 'Luna Pendant',
        price: 890,
        originalPrice: 1100,
        category: 'necklaces',
        material: '18K White Gold',
        image: img('photo-1599643478518-a784e5dc4c8f', 600),
        hoverImage: img('photo-1515562141207-7a88fb7ce338', 600),
        description:
          'An ethereal crescent pendant suspended on a whisper-thin chain — a celestial emblem for everyday elegance. Finished in 18K white gold with a satin-polished surface.',
        isNew: false,
        isBestseller: true,
      },
      {
        id: '3',
        name: 'Cascade Bracelet',
        price: 1680,
        originalPrice: null,
        category: 'bracelets',
        material: '18K Yellow Gold + Diamonds',
        image: img('photo-1611591437281-460bfbe1220a', 600),
        hoverImage: img('photo-1573408301185-9146fe634ad0', 600),
        description:
          'A fluid cascade of interlocking gold links, each segment polished to mirror brilliance. Set with pavé diamonds that catch light with every movement of the wrist.',
        isNew: true,
        isBestseller: false,
      },
      {
        id: '4',
        name: 'Arc Earrings',
        price: 745,
        originalPrice: null,
        category: 'earrings',
        material: '18K Rose Gold',
        image: img('photo-1535632066927-ab7c9ab60908', 600),
        hoverImage: img('photo-1469334031218-e382a71b716b', 600),
        description:
          'Sculptural arcs in warm rose gold, lightweight yet striking. The curved silhouette frames the face with understated drama — perfect from day to evening.',
        isNew: false,
        isBestseller: true,
      },
      {
        id: '5',
        name: 'Dusk Band',
        price: 2100,
        originalPrice: null,
        category: 'rings',
        material: 'Platinum + Sapphire',
        image: img('photo-1602173574767-37ac01994b2a', 600),
        hoverImage: img('photo-1603561596112-0a132b757442', 600),
        description:
          'A bold band in platinum featuring a deep blue sapphire center stone. The channel-set side stones create a horizon of light around the vivid centerpiece.',
        isNew: false,
        isBestseller: false,
      },
      {
        id: '6',
        name: 'Veil Necklace',
        price: 3200,
        originalPrice: null,
        category: 'necklaces',
        material: '18K Gold + Diamonds',
        image: img('photo-1515562141207-7a88fb7ce338', 600),
        hoverImage: img('photo-1506630448388-4e683c67ddb0', 600),
        description:
          'A cascade of carefully selected diamonds that drapes like silk — each stone chosen for its fire and clarity. A statement piece for moments that matter.',
        isNew: true,
        isBestseller: false,
      },
    ],
    featuredCollection: [
      {
        id: '1',
        label: 'New Arrival',
        name: 'The Soleil Ring',
        material: '18K Yellow Gold',
        description:
          'A ring that captures morning light — set with three brilliant-cut diamonds in a delicate pavé band.',
        price: 1250,
        image: img('photo-1603561596112-0a132b757442', 1200),
        productId: '1',
      },
      {
        id: '2',
        label: 'Bestseller',
        name: 'The Luna Pendant',
        material: '18K White Gold',
        description:
          'An ethereal crescent pendant suspended on a whisper-thin chain — a celestial emblem for everyday elegance.',
        price: 890,
        image: img('photo-1599643478518-a784e5dc4c8f', 1200),
        productId: '2',
      },
      {
        id: '3',
        label: 'Limited Edition',
        name: 'The Veil Necklace',
        material: '18K Gold + Diamonds',
        description:
          'A cascade of carefully selected diamonds that drapes like silk — each stone chosen for its fire and clarity.',
        price: 3200,
        image: img('photo-1515562141207-7a88fb7ce338', 1200),
        productId: '6',
      },
    ],
    testimonials: [
      {
        id: '1',
        name: 'Isabelle M.',
        location: 'Paris',
        quote:
          'My AG LUXE ring is the most exquisite piece I own. The quality is unparalleled.',
        rating: 5,
      },
      {
        id: '2',
        name: 'Sofia A.',
        location: 'Dubai',
        quote:
          'I gifted the Cascade Bracelet to my sister — she has not taken it off since. Truly timeless.',
        rating: 5,
      },
      {
        id: '3',
        name: 'Camille R.',
        location: 'New York',
        quote:
          'Packaging was as luxurious as the jewelry itself. An experience from start to finish.',
        rating: 5,
      },
    ],
    instagramPosts: [
      {
        id: '1',
        image: img('photo-1506630448388-4e683c67ddb0', 400),
        alt: 'Gold necklace editorial shot',
      },
      {
        id: '2',
        image: img('photo-1603561596112-0a132b757442', 400),
        alt: 'Diamond ring close-up',
      },
      {
        id: '3',
        image: img('photo-1573408301185-9146fe634ad0', 400),
        alt: 'Gold bracelet on wrist',
      },
      {
        id: '4',
        image: img('photo-1469334031218-e382a71b716b', 400),
        alt: 'Pearl earrings detail',
      },
      {
        id: '5',
        image: img('photo-1602173574767-37ac01994b2a', 400),
        alt: 'Engagement ring lifestyle',
      },
      {
        id: '6',
        image: img('photo-1611591437281-460bfbe1220a', 400),
        alt: 'Stacked gold bracelets',
      },
    ],
    marqueeItems: [
      'TIMELESS QUALITY',
      '✦',
      'ETHICALLY SOURCED',
      '✦',
      'FREE GLOBAL SHIPPING',
      '✦',
      'CERTIFIED DIAMONDS',
      '✦',
      '18K GOLD COLLECTION',
      '✦',
      'BESPOKE GIFTING',
      '✦',
    ],
    heroVideos: [
      {
        src: 'https://videos.pexels.com/video-files/6943052/6943052-uhd_2560_1440_25fps.mp4',
        poster: img('photo-1603561596112-0a132b757442', 1920),
      },
      {
        src: 'https://videos.pexels.com/video-files/7579562/7579562-uhd_2560_1440_25fps.mp4',
        poster: img('photo-1602173574767-37ac01994b2a', 1920),
      },
      {
        src: 'https://videos.pexels.com/video-files/3710525/3710525-uhd_2560_1440_24fps.mp4',
        poster: img('photo-1599643478518-a784e5dc4c8f', 1920),
      },
    ],
  };
}
