// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import {serve} from "https://deno.land/std@0.131.0/http/server.ts"
import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import {corsHeaders} from "../_shared/cors.ts"
import {Database} from "../_shared/database.types.ts"


interface SignUpRequest{
  password:string;
  email:string;
}

serve(async (req) => {

  // This is needed if you're planning to invoke your function from a browser.

if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders })
}

try {
  const supabaseClient = createClient<Database>(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

  const { password , email} : SignUpRequest = await req.json();

  if(password===undefined || email===undefined){
    return new Response(
      JSON.stringify({
        error: "Password or email is undefined."
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" },
      status:400 },
    )
  }

  if(!email.endsWith(".elte.hu")){
    return new Response(
      JSON.stringify({
        error: "Email domain is not supported."
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" },
      status:400 },
    )
  }
  
  const res = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  })

  return new Response(
    JSON.stringify({
      email: res.data.user?.email,
      id: res.data.user?.id
    }),
    { headers: { "Content-Type": "application/json" } },
  )

}
catch (error) {
  return new Response(JSON.stringify({ error: error.message }), {
  headers: { ...corsHeaders, 'Content-Type': 'application/json' },status: 400,}) 
}

})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
