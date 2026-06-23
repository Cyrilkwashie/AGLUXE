import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error('Missing Supabase env vars in .env.local:');
  if (!url) console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  if (!serviceRoleKey) console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const tables = [
  'categories',
  'products',
  'featured_collection',
  'testimonials',
  'instagram_posts',
  'site_settings',
];

async function main() {
  console.log('Testing Supabase connection...\n');

  for (const table of tables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.error(`✗ ${table}: ${error.message}`);
      process.exit(1);
    }
    console.log(`✓ ${table} (${count ?? 0} rows)`);
  }

  console.log('\nSupabase is connected.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
