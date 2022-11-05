import type {NextPage} from 'next'
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography} from '@mui/material';
import { colors } from '../../design/theme/themeColors';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react';
import useSwr from 'swr'
import { Database } from '../../lib/database.types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Note: NextPage = () => {
    
    const { query : { notegroup_id, note_id } } = useRouter()
    const session = useSession()
    const supabase = useSupabaseClient()

    // const { data, error } = useSwr<Database['public']['Tables']['note']['Row']>('/api/note', fetcher)

    return (
        session?.user ?
            <Grid>
                {session.user.email}
                {/* <p>{data?.data}</p> */}
            </Grid>
        :
            <Auth
                supabaseClient={supabase}
                appearance={{theme: ThemeSupa}}
            />
    )
}

export default Note
