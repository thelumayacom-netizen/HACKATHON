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
    // const { data, error } = await supabase.from('user_reminders').select('*').eq('user_id', userId);
    
    // Hardcoded reminders data
    const reminders = {
      "sips": "₹5000 due tomorrow",
      "loan": "Home Loan EMI due in 5 days"
    };

    return new Response(
      JSON.stringify(reminders),
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