import type {NextPage} from 'next'
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography} from '@mui/material';
import { colors } from '../design/theme/themeColors';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react';
import useSwr from 'swr'
import { Database } from '../lib/database.types';
import Link from 'next/link';


interface GetNoteGroupRes {
    notes: Database['public']['Tables']['note']['Row'][],
    noteGroups: Database['public']['Tables']['note_group']['Row'][]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Test: NextPage = () => {

    const session = useSession()
    const supabase = useSupabaseClient()

    const { data, error } = useSwr<GetNoteGroupRes>('/api/note-group', fetcher)

    useEffect(() => {        
        supabase.auth.onAuthStateChange(async (event, session) => {
        if (event == "PASSWORD_RECOVERY") {
            const newPassword = prompt("What would you like your new password to be?");
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword!,
            })
    
            if (data) alert("Password updated successfully!")
            if (error) alert("There was an error updating your password.")
        }
        })
    }, [supabase.auth])

    return (
        session?.user ?
            <Grid>
                {session.user.email}
                {data?.noteGroups?.map(n => {
                    return (
                        <Link key={n.id} href="/[notegroup_id]" as={`/${n.id}`}>
                            {n.title}
                        </Link>
                    )
                })}
                {data?.notes?.map(n => {
                    return <p key={n.id}>{n.title}</p>
                })}
            </Grid>
        :
            <Auth
                supabaseClient={supabase}
                appearance={{theme: ThemeSupa}}
            />
    )
}

export default Test
