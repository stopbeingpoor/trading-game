// Import directly using the URL from the import map as a workaround
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.2?target=deno'

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://peaceful-truffle-64bea5.netlify.app',
  'https://play.sbpgame.com',
];

// Common headers, Origin added dynamically
const baseCorsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  let responseHeaders = { ...baseCorsHeaders }; // Start with base headers

  // Set Allow-Origin dynamically if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    responseHeaders['Access-Control-Allow-Origin'] = origin;
  } else if (req.method !== 'OPTIONS') {
    // If origin is not allowed for non-preflight, deny early
    // No need to log here in production function
    // console.warn(`Origin not allowed: ${origin}`);
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
        headers: { 'Content-Type': 'application/json' }, // No CORS headers needed
        status: 403,
    });
  }
  // Note: For OPTIONS, if origin isn't allowed, the browser will block based on the lack of matching Allow-Origin header in the response.

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    // Respond to OPTIONS only if origin was allowed and headers were set
    if (responseHeaders['Access-Control-Allow-Origin']) {
        return new Response('ok', { headers: responseHeaders });
    } else {
        // Origin not in allowed list or not provided
        return new Response('Not Allowed', { status: 403 });
    }
  }

  // Handle actual POST request
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      headers: { ...responseHeaders, 'Content-Type': 'application/json' }, // Use dynamic headers
      status: 405,
    });
  }

  const { access_code } = await req.json();

  if (!access_code) {
    return new Response(JSON.stringify({ error: 'Access code is required' }), {
      headers: { ...responseHeaders, 'Content-Type': 'application/json' }, // Use dynamic headers
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
      headers: { ...responseHeaders, 'Content-Type': 'application/json' }, // Use dynamic headers
      status: 500,
    });
  }

  // If no data is returned, the code is invalid
  if (!data) {
    return new Response(JSON.stringify({ error: 'Invalid access code' }), { // Updated error message
      headers: { ...responseHeaders, 'Content-Type': 'application/json' }, // Use dynamic headers
      status: 404, // Keep 404 for invalid code
    });
  }

  // If data exists, the code is valid. No need to update anything.
  return new Response(JSON.stringify({ message: 'Access code verified successfully' }), {
    headers: { ...responseHeaders, 'Content-Type': 'application/json' }, // Use dynamic headers
    status: 200,
  });
});