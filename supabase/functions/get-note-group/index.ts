import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { corsHeaders } from "../_shared/cors.ts"
import { Database } from "../_shared/database.types.ts"

interface GetNoteGroupRequest extends Request {
    note_group_id?: string
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
        
        const { data: { user } } = await supabaseClient.auth.getUser()
        const { note_group_id } : GetNoteGroupRequest = await req.json()
       
        const notes  = (await supabaseClient.from("note")
                                            .select('id, title')
                                            .match({ note_group_id: note_group_id || null, user_id: user?.id }))
                                            .data
        
        const noteGroups = (await supabaseClient.from("note_group")
                                                .select("id, title")
                                                .eq("base_note_group_id", note_group_id || null))
                                                .data

        return new Response(JSON.stringify({ notes, noteGroups }), {
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