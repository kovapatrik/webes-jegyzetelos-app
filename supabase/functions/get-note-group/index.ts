import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { corsHeaders } from "../_shared/cors.ts"
import { Database } from "../../../lib/database.types.ts"

interface GetNoteGroupRequest extends Request {
    note_group?: string
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

        if (data === undefined || title === undefined) {
            return new Response(JSON.stringify({ error: "Note or title is undefined." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
              })
        }

        const note_group_id = note_group === undefined ? null : (await supabaseClient.from('note_group').select().match({ user_id: user!.id, title: note_group }).single()).data?.id

        const noteExistsQuery = await supabaseClient.from('note').select().match({ user_id: user!.id, note_group_id: note_group_id, title: title})
        if (noteExistsQuery.count! > 0) {
            return new Response(JSON.stringify({ error: "Note already exists in this note group." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
              })
        }

        const newNote = await supabaseClient.from("note").insert({
            user_id: user!.id,
            note_group_id: note_group_id,
            title: title,
            data: data
        }).select().single()

        await supabaseClient.from("note_perm").insert({
            user_id: user!.id,
            note_id: newNote.data!.id,
            note_group_id: note_group_id,
            view_perm: true,
            edit_perm: true
        })

        return new Response(JSON.stringify({ note_id: newNote.data?.id }), {
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