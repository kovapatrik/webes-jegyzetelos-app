// Creating a new supabase server client object (e.g. in API route):
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '../../../lib/database.types'
import { GetNote } from '../../../lib/note'

export default async function Note(req: NextApiRequest, res: NextApiResponse) {
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
        
        // Read
        if (req.method === "GET") {
            
            const { id }  = req.query as Database['public']['Tables']['note']['Row']
            
            const { note, userPerm, allPerms } = await GetNote({id, user, supabaseServerClient})
            
            res.status(200).json({ note, userPerm, allPerms })
        // Create in index.ts
        // Update                                                             
        } else if (req.method === 'PATCH') {

            const { id, title, note_group_id, data } = req.body as Database['public']['Tables']['note']['Update']

            if (title === undefined || note_group_id === undefined) {
                return res.status(400).json({
                    error: 'invalid_input',
                    description: 'Title or note_group_id is undefined.',
                  })
            }

    
            const { count } = await supabaseServerClient.from('note')
                                                        .select('*', { count: "exact", head: true })
                                                        .neq('id', id)
                                                        .match({ 
                                                            title: title,
                                                            note_group_id: note_group_id, 
                                                        })

            if (count !== null && count > 0) {
                return res.status(400).json({
                    error: 'title_exists',
                    description: 'A note with the same title already exists in this note group.',
                  })
            }

            const newNote = await supabaseServerClient.from("note")
                                                      .update({
                                                          title: title,
                                                          note_group_id: note_group_id,
                                                          data: data
                                                      })
                                                      .eq('id', id)
                                                      .select()
                                                      .single()

            res.status(200).json(newNote)

        } else if (req.method === 'DELETE') {

            const { id } = req.query as Database['public']['Tables']['note_group']['Row']

            if (!id) {
                return res.status(400).json({
                    error: 'invalid_input',
                    description: 'Id is undefined.',
                  })
            }

            await supabaseServerClient.from("note_perm")
                                      .delete()
                                      .eq('note_id', id)

            await supabaseServerClient.from("note")
                                      .delete()
                                      .eq('id', id)

            res.status(200).json({ message: "success" })

        } else {
            res.status(400).json({error: 'Not a GET, POST, PATCH or DELETE request!'})
        }

    } catch (error) {
        res.status(400).json({ error })
    }
}