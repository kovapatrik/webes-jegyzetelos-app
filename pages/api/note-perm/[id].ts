import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '../../../lib/database.types'

interface DeleteQuery {
    [key: string]: string
    id: Database['public']['Tables']['note_perm']['Row']['id']
}

export default async function NotePerm(req: NextApiRequest, res: NextApiResponse) {
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

        // Update
        if (req.method === 'PATCH') {
            const { id, view_perm, edit_perm } = req.body as Database['public']['Tables']['note_perm']['Update']

            await supabaseServerClient.from('note_perm')
                                      .update({ view_perm: view_perm, edit_perm: edit_perm })
                                      .eq('id', id)

            res.status(200).json({ message: "success" })
        // Delete
        } else if (req.method === 'DELETE') {

            const { id } = req.query as DeleteQuery

            await supabaseServerClient.from('note_perm')
                                      .delete()
                                      .eq('id', id)

            res.status(200).json({ message: "success" })
        } else {
            res.status(400).json({ error: 'Not a PATCH or DELETE request!' })
        }

    } catch (error) {
        res.status(400).json({ error })
    }

}