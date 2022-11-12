// Creating a new supabase server client object (e.g. in API route):
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '../../../lib/database.types'

export default async function NoteGroup(req: NextApiRequest, res: NextApiResponse) {
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
        
        // Read
        if (req.method === "GET") {
            
            const { id }  = req.query as Database['public']['Tables']['note_group']['Row']
       
            const notes  = (await supabaseServerClient.from("note")
                                                    .select('id, title')
                                                    .match({ note_group_id: id}))
                                                    .data
            
            const noteGroups = (await supabaseServerClient.from("note_group")
                                                        .select("id, title")
                                                        .eq("base_note_group_id", id))
                                                        .data

            res.status(200).json({ notes, noteGroups })
        // Create
        } else if (req.method === "POST") {

            const { title, base_note_group_id } = req.query as Database['public']['Tables']['note_group']['Insert']

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
            if (count! > 0) {
                return res.status(400).json({
                    error: 'title_exists',
                    description: 'A note group with the same title already exists in this note group.',
                  })
            }
    
           await supabaseServerClient.from("note_group")
                                     .insert({
                                             user_id: user!.id,
                                             title: title,
                                             base_note_group_id: base_note_group_id || null
                                         })
            res.status(201)
        // Update                                                             
        } else if (req.method === 'PATCH') {

            const { id, title, base_note_group_id } = req.query as Database['public']['Tables']['note_group']['Update']

            if (title === undefined) {
                return res.status(400).json({
                    error: 'invalid_input',
                    description: 'Title is undefined.',
                  })
            }
    
            const { count } = await supabaseServerClient.from('note_group')
                                                        .select('*', { count: "exact", head: true })
                                                        .match({ 
                                                            title: title,
                                                            base_note_group_id: base_note_group_id || null, 
                                                            })
            if (count! > 0) {
                return res.status(400).json({
                    error: 'title_exists',
                    description: 'A note group with the same title already exists in this note group.',
                  })
            }

            await supabaseServerClient.from("note_group")
                                      .update({
                                          title: title,
                                          base_note_group_id: base_note_group_id || null
                                      })
                                      .eq('id', id)

            res.status(200)

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
                                      .eq('note_group_id', id)

            await supabaseServerClient.from("note")
                                      .delete()
                                      .eq('note_group_id', id)                            
            
            await supabaseServerClient.from("note_group")
                                      .delete()
                                      .eq('id', id)

            res.status(200)

        } else {
            res.status(400).json({error: 'Not a GET, POST, PATCH or DELETE request!'})
        }

    } catch (error) {
        res.status(400).json({ error })
    }
}