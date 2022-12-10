import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../lib/database.types";

export default async function NoteIndex(req: NextApiRequest, res: NextApiResponse) {

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

            const { title, data, note_group_id } = req.body as Database['public']['Tables']['note']['Insert']

            if (title === undefined || note_group_id === undefined) {
                return res.status(400).json({
                    error: 'invalid_input',
                    description: 'Title or note_group_id is undefined.',
                })
            }

            const { count } = await supabaseServerClient.from('note')
                                                        .select('*', { count: "exact", head: true })
                                                        .match({
                                                            note_group_id: note_group_id,
                                                            title: title
                                                        })

            if (count !== null && count > 0) {
                return res.status(400).json({
                    error: 'title_exists',
                    description: 'A note with the same title already exists in this note group!',
                })
            }
            const newNote = (await supabaseServerClient.from("note")
                                                        .insert({
                                                            user_id: user.id,
                                                            title: title,
                                                            note_group_id: note_group_id,
                                                            data: data
                                                        })
                                                        .select()
                                                        .single()).data
            res.status(200).json(newNote)
        } else {
            res.status(400).json({ error: 'Not a POST request!' })
        }

    } catch (error) {
        res.status(400).json({ error })
    }
}