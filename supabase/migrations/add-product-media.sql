-- Add unlimited product media (images + videos) as JSON
-- Run in Supabase SQL Editor if your products table already exists

alter table products
  add column if not exists media jsonb not null default '[]'::jsonb;

-- Backfill existing rows from image / hover_image columns
update products
set media = (
  case
    when coalesce(hover_image, '') <> '' and hover_image <> image then
      jsonb_build_array(
        jsonb_build_object('url', image, 'type', 'image'),
        jsonb_build_object('url', hover_image, 'type', 'image')
      )
    when coalesce(image, '') <> '' then
      jsonb_build_array(jsonb_build_object('url', image, 'type', 'image'))
    else '[]'::jsonb
  end
)
where media = '[]'::jsonb or media is null;
