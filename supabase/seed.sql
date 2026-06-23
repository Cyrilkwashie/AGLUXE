-- AG Luxe seed data
-- Run in Supabase SQL Editor after schema.sql
-- Hero video is static (public/videos/hero.mp4) — not stored here.

-- Optional: clear existing rows before re-seeding
-- truncate categories, products, featured_collection, testimonials, instagram_posts cascade;

insert into categories (id, name, slug, tagline, image) values
  ('cat-rings', 'Rings', 'rings', 'Circles of Devotion', 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=800&q=80'),
  ('cat-necklaces', 'Necklaces', 'necklaces', 'Drape in Elegance', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'),
  ('cat-bracelets', 'Bracelets', 'bracelets', 'Wrist Narratives', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'),
  ('cat-earrings', 'Earrings', 'earrings', 'Frame Your Face', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80')
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  tagline = excluded.tagline,
  image = excluded.image;

insert into products (
  id, name, price, original_price, category, material, image, hover_image, description, is_new, is_bestseller
) values
  (
    '1',
    'Soleil Ring',
    1250,
    null,
    'rings',
    '18K Gold',
    'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80',
    'A ring that captures morning light — set with three brilliant-cut diamonds in a delicate pavé band. Designed for everyday elegance with a luminous finish that catches every glance.',
    true,
    false
  ),
  (
    '2',
    'Luna Pendant',
    890,
    1100,
    'necklaces',
    '18K White Gold',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    'An ethereal crescent pendant suspended on a whisper-thin chain — a celestial emblem for everyday elegance. Finished in 18K white gold with a satin-polished surface.',
    false,
    true
  ),
  (
    '3',
    'Cascade Bracelet',
    1680,
    null,
    'bracelets',
    '18K Yellow Gold + Diamonds',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80',
    'A fluid cascade of interlocking gold links, each segment polished to mirror brilliance. Set with pavé diamonds that catch light with every movement of the wrist.',
    true,
    false
  ),
  (
    '4',
    'Arc Earrings',
    745,
    null,
    'earrings',
    '18K Rose Gold',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
    'Sculptural arcs in warm rose gold, lightweight yet striking. The curved silhouette frames the face with understated drama — perfect from day to evening.',
    false,
    true
  ),
  (
    '5',
    'Dusk Band',
    2100,
    null,
    'rings',
    'Platinum + Sapphire',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=600&q=80',
    'A bold band in platinum featuring a deep blue sapphire center stone. The channel-set side stones create a horizon of light around the vivid centerpiece.',
    false,
    false
  ),
  (
    '6',
    'Veil Necklace',
    3200,
    null,
    'necklaces',
    '18K Gold + Diamonds',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=600&q=80',
    'A cascade of carefully selected diamonds that drapes like silk — each stone chosen for its fire and clarity. A statement piece for moments that matter.',
    true,
    false
  )
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  original_price = excluded.original_price,
  category = excluded.category,
  material = excluded.material,
  image = excluded.image,
  hover_image = excluded.hover_image,
  description = excluded.description,
  is_new = excluded.is_new,
  is_bestseller = excluded.is_bestseller;

insert into featured_collection (
  id, label, name, material, description, price, image, product_id
) values
  (
    '1',
    'New Arrival',
    'The Soleil Ring',
    '18K Yellow Gold',
    'A ring that captures morning light — set with three brilliant-cut diamonds in a delicate pavé band.',
    1250,
    'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=1200&q=80',
    '1'
  ),
  (
    '2',
    'Bestseller',
    'The Luna Pendant',
    '18K White Gold',
    'An ethereal crescent pendant suspended on a whisper-thin chain — a celestial emblem for everyday elegance.',
    890,
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    '2'
  ),
  (
    '3',
    'Limited Edition',
    'The Veil Necklace',
    '18K Gold + Diamonds',
    'A cascade of carefully selected diamonds that drapes like silk — each stone chosen for its fire and clarity.',
    3200,
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    '6'
  )
on conflict (id) do update set
  label = excluded.label,
  name = excluded.name,
  material = excluded.material,
  description = excluded.description,
  price = excluded.price,
  image = excluded.image,
  product_id = excluded.product_id;

insert into testimonials (id, name, location, quote, rating) values
  ('1', 'Isabelle M.', 'Paris', 'My AG LUXE ring is the most exquisite piece I own. The quality is unparalleled.', 5),
  ('2', 'Sofia A.', 'Dubai', 'I gifted the Cascade Bracelet to my sister — she has not taken it off since. Truly timeless.', 5),
  ('3', 'Camille R.', 'New York', 'Packaging was as luxurious as the jewelry itself. An experience from start to finish.', 5)
on conflict (id) do update set
  name = excluded.name,
  location = excluded.location,
  quote = excluded.quote,
  rating = excluded.rating;

insert into instagram_posts (id, image, alt, sort_order) values
  ('1', 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=400&q=80', 'Gold necklace editorial shot', 0),
  ('2', 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=400&q=80', 'Diamond ring close-up', 1),
  ('3', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80', 'Gold bracelet on wrist', 2),
  ('4', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80', 'Pearl earrings detail', 3),
  ('5', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80', 'Engagement ring lifestyle', 4),
  ('6', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80', 'Stacked gold bracelets', 5)
on conflict (id) do update set
  image = excluded.image,
  alt = excluded.alt,
  sort_order = excluded.sort_order;

insert into site_settings (id, marquee_items) values (
  'default',
  '[
    "TIMELESS QUALITY",
    "✦",
    "ETHICALLY SOURCED",
    "✦",
    "FREE GLOBAL SHIPPING",
    "✦",
    "CERTIFIED DIAMONDS",
    "✦",
    "18K GOLD COLLECTION",
    "✦",
    "BESPOKE GIFTING",
    "✦"
  ]'::jsonb
)
on conflict (id) do update set
  marquee_items = excluded.marquee_items;
