import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { corsHeaders } from "../_shared/cors.ts"
import { Database } from "../_shared/database.types.ts"

interface RemoveNotePermRequest extends Request {
    note_id: string
    user_id: string
}

serve(async (req: Request) => {
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

        const { note_id, user_id } : RemoveNotePermRequest = await req.json()

        await supabaseClient.from("note_perm")
                            .delete()
                            .match({ note_id: note_id, user_id: user_id })

        return new Response(JSON.stringify({ message: "Successfuly removed" }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
            })
    }
    catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }) 
    }
})