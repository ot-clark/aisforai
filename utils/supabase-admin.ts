import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required in production');
  } else {
    console.warn('⚠️  Supabase environment variables not found. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file');
    console.warn('   You can get these from your Supabase project dashboard: https://supabase.com/dashboard');
  }
}

export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceRoleKey || 'placeholder-key'
); 