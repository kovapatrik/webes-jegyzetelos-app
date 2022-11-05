// Creating a new supabase server client object (e.g. in API route):
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '../../../lib/database.types'

export default async function BaseNoteGroup(req: NextApiRequest, res: NextApiResponse) {
    try {
        const supabaseServerClient = createServerSupabaseClient<Database>({
            req,
            res,
          })
        const {
        data: { user },
        } = await supabaseServerClient.auth.getUser()

        const { data } = await supabaseServerClient.auth.getSession()

        if (!data.session) {
            return res.status(401).json({
              error: 'not_authenticated',
              description: 'The user does not have an active session or is not authenticated',
            })
        }
        
        if (req.method === "GET") {

            const baseNoteGroup = (await supabaseServerClient.from("note_group")
                                                            .select("id, note_perm!inner ( owner_user_id )")
                                                            .is("base_note_group_id", null)
                                                            .eq('note_perm.owner_user_id', user?.id) // not showing shared files yet
                                                            .single())
                                                            .data
            const notes  = (await supabaseServerClient.from("note")
                                                    .select('id, title')
                                                    .eq('note_group_id', baseNoteGroup!.id))
                                                    .data
            const noteGroups  = (await supabaseServerClient.from("note_group")
                                                        .select('id, title')
                                                        .eq('base_note_group_id', baseNoteGroup!.id))
                                                        .data
            res.status(200).json({ notes, noteGroups })
        } else {
            res.status(405).json({ error: "Not a GET request"})
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}