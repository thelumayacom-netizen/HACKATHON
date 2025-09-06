import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // TODO: replace with Supabase query
    // const { data, error } = await supabase.from('leaderboard').select('*').order('return_percentage', { ascending: false });
    
    // Hardcoded leaderboard data
    const leaderboard = [
      { "name": "Aarav", "return": "12%" },
      { "name": "Zara", "return": "15%" },
      { "name": "Kabir", "return": "9%" },
      { "name": "Maya", "return": "20%" },
      { "name": "Ishaan", "return": "7%" }
    ];

    return new Response(
      JSON.stringify(leaderboard),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})