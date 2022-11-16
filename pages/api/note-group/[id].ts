// Creating a new supabase server client object (e.g. in API route):
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '../../../lib/database.types'
import { GetBaseNoteGroup, GetNoteGroup } from '../../../lib/note_group'

export default async function NoteGroup(req: NextApiRequest, res: NextApiResponse) {
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

        if (req.query.id === 'null') {
            
            const baseNoteGroup = await GetBaseNoteGroup({user, supabaseServerClient})
            if (!baseNoteGroup) {
                return res.status(400).json({error: 'Invalid request (getBaseNoteGroup).'})
            }
            return res.status(200).json({ notegroup_id: baseNoteGroup.id })
        }
        
        // Read
        if (req.method === "GET") {
            
            const { id }  = req.query as Database['public']['Tables']['note_group']['Row']
    
            const { notes, noteGroups } = await GetNoteGroup({id, user, supabaseServerClient});

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
            if (count !== null && count > 0) {
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