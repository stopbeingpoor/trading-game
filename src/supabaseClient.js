import { createClient } from '@supabase/supabase-js'

// Read variables from Vite's environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Basic check to ensure variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing from .env. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.')
  // Optionally throw an error or handle this case appropriately
  // throw new Error("Supabase environment variables are not set.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)