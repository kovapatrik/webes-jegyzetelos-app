import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { corsHeaders } from "../_shared/cors.ts"
import { Database } from "../../../lib/database.types.ts"

interface UploadNoteRequest extends Request {
    title: string;
    data: string;
    note_group: string;
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
        const { data, note_group, title } : UploadNoteRequest = await req.json()

        if (data === undefined || note_group === undefined || title === undefined) {
            return new Response(JSON.stringify({ error: "Note, note group or title is undefined." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
              })
        }

        const noteGroupQuery = await supabaseClient.from('note_group').select().match({ user_id: user?.id, title: note_group }).single() // throws error, if not exactly one row returns

        const noteExistsQuery = await supabaseClient.from('note').select().match({ user_id: user?.id, notegroup_id: noteGroupQuery.data?.id, title: title})
        if (noteExistsQuery.count! > 0) {
            return new Response(JSON.stringify({ error: "Note already exists in this note group." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
              })
        }

        const dateNow = new Date().toISOString()
        const newNote = await supabaseClient.from("note").insert({
            user_id: user?.id,
            created_at: dateNow,
            title: title,
            data: data,
            last_modify: dateNow
        }).select().single()

        return new Response(JSON.stringify({ note_id:  newNote.data?.id}), {
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