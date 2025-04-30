import { createClient } from '@supabase/supabase-js'

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173', // Allow your frontend origin
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', // Standard Supabase headers + content-type
  'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and preflight OPTIONS
};

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Handle actual POST request
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, // Include CORS headers
      status: 405,
    });
  }

  const { access_code } = await req.json();

  if (!access_code) {
    return new Response(JSON.stringify({ error: 'Access code is required' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, // Include CORS headers
      status: 400,
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );

  // Check if the access code exists in the table
  const { data, error } = await supabase
    .from('access_codes') // Assuming table name is 'access_codes'
    .select('id') // Select any column just to check existence
    .eq('code', access_code)
    .maybeSingle(); // Use maybeSingle to handle 0 or 1 result without error

  // Handle potential database errors (excluding 'not found' which is handled by checking 'data')
  if (error) {
    console.error('Supabase query error:', error);
    return new Response(JSON.stringify({ error: 'Database error during verification' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  // If no data is returned, the code is invalid
  if (!data) {
    return new Response(JSON.stringify({ error: 'Invalid access code' }), { // Updated error message
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 404, // Keep 404 for invalid code
    });
  }

  // If data exists, the code is valid. No need to update anything.
  return new Response(JSON.stringify({ message: 'Access code verified successfully' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }, // Include CORS headers
    status: 200,
  });
});