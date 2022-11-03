import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { corsHeaders } from "../_shared/cors.ts"
import { Database } from "../_shared/database.types.ts"

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

        const { id, title, base_note_group_id } : Database["public"]["Tables"]["note_group"]["Update"] = await req.json()

        const { count } = await supabaseClient.from('note_group').select('*', { count: "exact", head: true }).match({ base_note_group_id: base_note_group_id, title: title})
        if (count! > 0) {
            return new Response(JSON.stringify({ error: "A note group with the same title already exists in this note group." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
              })
        }

        await supabaseClient.from("note_group")
                            .update({ base_note_group_id: base_note_group_id, title: title })
                            .eq('id', id);

        return new Response(JSON.stringify({ note_group_id: id, base_note_group_id: base_note_group_id }), {
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