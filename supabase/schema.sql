-- AG Luxe Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)
-- Hero video is static (public/videos/hero.mp4) — not stored in the database.

create extension if not exists "pgcrypto";

create table if not exists categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  tagline text not null default '',
  image text not null default ''
);

create table if not exists products (
  id text primary key,
  name text not null,
  price numeric(12, 2) not null check (price >= 0),
  original_price numeric(12, 2) check (original_price is null or original_price >= 0),
  category text not null,
  material text not null default '',
  image text not null default '',
  hover_image text not null default '',
  description text not null default '',
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  media jsonb not null default '[]'::jsonb
);

create table if not exists featured_collection (
  id text primary key,
  label text not null default 'Featured',
  name text not null,
  material text not null default '',
  description text not null default '',
  price numeric(12, 2) not null check (price >= 0),
  image text not null default '',
  product_id text
);

create table if not exists testimonials (
  id text primary key,
  name text not null,
  location text not null default '',
  quote text not null,
  rating integer not null default 5 check (rating between 1 and 5)
);

create table if not exists instagram_posts (
  id text primary key,
  image text not null,
  alt text not null default '',
  sort_order integer not null default 0
);

create table if not exists site_settings (
  id text primary key default 'default',
  marquee_items jsonb not null default '[]'::jsonb
);

insert into site_settings (id, marquee_items)
values ('default', '[]'::jsonb)
on conflict (id) do nothing;

alter table categories enable row level security;
alter table products enable row level security;
alter table featured_collection enable row level security;
alter table testimonials enable row level security;
alter table instagram_posts enable row level security;
alter table site_settings enable row level security;

create policy "Public read categories"
  on categories for select
  using (true);

create policy "Public read products"
  on products for select
  using (true);

create policy "Public read featured_collection"
  on featured_collection for select
  using (true);

create policy "Public read testimonials"
  on testimonials for select
  using (true);

create policy "Public read instagram_posts"
  on instagram_posts for select
  using (true);

create policy "Public read site_settings"
  on site_settings for select
  using (true);

-- If you already ran the old schema, run this once to remove the unused hero table:
-- drop table if exists hero_videos cascade;
