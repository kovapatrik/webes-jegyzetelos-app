import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { corsHeaders } from "../_shared/cors.ts"
import { Database } from "../_shared/database.types.ts"

interface GetNoteGroupRequest extends Request {
    note_group_id?: string
}

interface Note {
    id: string;
    title: string;
}

interface NoteWrapper {
    note: Note
}

interface NoteGroup {
    id: string;
    title: string;
    base_note_group_id: string;
}

interface NoteGroupWrapper {
    note_group: NoteGroup
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

        if (note_group_id === undefined) {
            return new Response(JSON.stringify({ error: 'No note_group_id was given.'}), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
              }) 
        }
       
        const notes  = ((await supabaseClient.from("note_perm")
                                            .select('note ( id, title )')
                                            .match({ note_group_id: note_group_id, user_id: user?.id })
                                            .eq('view_perm', true))
                                            .data as NoteWrapper[]).flatMap(elem => elem.note)
        
        const q_noteGroups = ((await supabaseClient.from("note_perm")
                                                 .select("note_group (id, base_note_group_id, title )")
                                                 .eq('note_group.base_note_group_id', note_group_id)
                                                 .eq('view_perm', true))
                                                 .data as NoteGroupWrapper[]).flatMap(elem => elem.note_group).filter(elem => elem !== null && elem !== undefined)
        const noteGroupUnique = new Set();
        const noteGroups = q_noteGroups.filter(el => !noteGroupUnique.has(el.id) && noteGroupUnique.add(el.id));

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