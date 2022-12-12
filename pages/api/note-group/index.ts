import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { NextApiRequest, NextApiResponse } from "next"
import { Database } from "../../../lib/database.types"

export default async function NoteGroupIndex(req: NextApiRequest, res: NextApiResponse) {
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

            const { title, base_note_group_id } = req.body as Database['public']['Tables']['note_group']['Insert']

            if (title === undefined) {
                return res.status(400).json({
                    error: 'invalid_input',
                    description: 'Title is undefined.',
                })
            }

            const { count } = await supabaseServerClient.from('note_group')
                                                        .select('*', { count: "exact", head: true })
                                                        .match({
                                                            base_note_group_id: base_note_group_id || null,
                                                            title: title
                                                        })
            if (count !== null && count > 0) {
                return res.status(400).json({
                    error: 'title_exists',
                    description: 'A note group with the same title already exists in this note group.',
                })
            }

            await supabaseServerClient.from("note_group")
                                      .insert({
                                          user_id: user.id,
                                          title: title,
                                          base_note_group_id: base_note_group_id || null
                                      })
            res.status(201).json({ message: "success" })
        } else {
            res.status(400).json({ error: 'Not a POST request!' })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}