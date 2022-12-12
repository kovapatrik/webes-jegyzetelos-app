import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '../../../lib/database.types'

export default async function NotePermIndex(req: NextApiRequest, res: NextApiResponse) {
    try {
        const supabaseServerClient = createServerSupabaseClient<Database>({
            req,
            res,
        })
        const {
            data: { user },
        } = await supabaseServerClient.auth.getUser()

        if (!user) {
            return res.status(401).json({
                error: 'not_authenticated',
                description: 'The user does not have an active session or is not authenticated',
            })
        }

        if (req.method === "POST") {

            const { note_group_id, note_id, user_id } = req.body as Database['public']['Tables']['note_perm']['Insert']

            const { count } = await supabaseServerClient.from('note_perm')
                                                        .select('*', { count: "exact", head: true })
                                                        .match({
                                                            note_group_id: note_group_id,
                                                            note_id: note_id,
                                                            user_id: user_id
                                                        })

            if (count !== null && count > 0) {
                return res.status(400).json({
                    error: 'perm_exists',
                    description: 'A note permission for this user already exists!',
                })
            }

           const { data } = await supabaseServerClient.from("note_perm")
                                                      .insert({
                                                             note_id: note_id,
                                                             note_group_id: note_group_id,
                                                             user_id: user_id,
                                                             owner_user_id: user.id
                                                       })
                                                       .select('*, users!note_perm_user_id_fkey (email)')
                                                       .single()
            res.status(200).json({ note_perm: data })
        } else {
            res.status(400).json({ error: 'Not a POST request!' })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}