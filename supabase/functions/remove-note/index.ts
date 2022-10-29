import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { corsHeaders } from "../_shared/cors.ts"
import { Database } from "../_shared/database.types.ts"

interface RemoveNoteRequest extends Request {
    note_id: string
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
        
        const { note_id } : RemoveNoteRequest = await req.json()

        if (note_id === undefined) {
            return new Response(JSON.stringify({ error: 'No note_id was given.'}), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
              }) 
        }
        
        await supabaseClient.from("note")
                            .delete()
                            .eq('id', note_id)
        await supabaseClient.from("note_perm")
                            .delete()
                            .eq('note_id', note_id)

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