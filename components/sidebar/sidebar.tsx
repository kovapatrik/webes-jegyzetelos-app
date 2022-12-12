import { Grid, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import React, {useState, useEffect } from 'react';

import MenuList from '@mui/material/MenuList';

import Divider from '@mui/material/Divider';
import { Close, Folder, Logout, Note, Settings } from '@mui/icons-material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { CustomMenuItem } from './customMenuItem';
import BackgroundLetterAvatars from './backgroundLetterAvatar';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

import { deleteCookie } from 'cookies-next';
import { colors } from '../../design/theme/themeColors';
import { Database } from '../../lib/database.types';

type SidebarProps = {
    onToggle: MouseEventHandler<HTMLButtonElement>;
    toggle?: boolean;
};

export const Sidebar = (props: SidebarProps) => {
    const { onToggle } = props;

    const [userName, setUserName] = useState<string>()
    const user = useUser();
    const supabaseClient = useSupabaseClient<Database>()

    useEffect(() => {
        async function getUserName() {
            const { data } = await supabaseClient.from('users')
                                                 .select()
                                                 .eq('id', user?.id)
                                                 .single()
            setUserName(data?.name)
        }

        getUserName()

    }, [])

    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('md'));

    const router = useRouter();

    async function signOut() {
        await supabaseClient.auth.signOut();
        deleteCookie('supabase-auth-token');
        router.push('/');
    }

    return (
        <Grid
            container
            sx={{
                minHeight: small ? '20vh' : '100vh',
                width: '100%',
                position: 'sticky',
                top: '0px',
            }}
            flexDirection={'column'}
            justifyContent={'space-between'}
            id='sidebar'
        >
            <Grid item>
                <Grid container flexDirection={'column'} alignItems={'center'} spacing={4}>
                    <Grid item sx={{ width: '100%' }}>
                        <MenuList sx={{ width: '100%' }}>
                            <CustomMenuItem onClick={onToggle} Icon={<Close fontSize='medium' />} position={'right'} label={'Close'} />
                        </MenuList>
                    </Grid>
                    {!small && (
                        <Grid item>
                            <Grid container flexDirection={'column'} alignItems={'center'} spacing={2}>
                                {/* <Grid item>
                                    <BackgroundLetterAvatars username={user?.user_metadata.name || ''} />
                                </Grid> */}
                                <Grid item>
                                    <Typography color='text.secondary' id='avatarName' variant={'h4'}>
                                        {userName || ''}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <Grid item>
                <MenuList sx={{ width: '100%' }}>
                    <CustomMenuItem Icon={<Note fontSize='medium' />} label={'My Notes'} position={'left'} onClick={() => router.replace('/')}/>
                    <CustomMenuItem Icon={<Folder fontSize='medium' />} label={'Shared With Me'} position={'left'} onClick={() => router.replace('/shared')}/>
                </MenuList>
            </Grid>
            <Grid item>
                <Grid container>
                    <MenuList id='sidebarMenuItems' sx={{ width: '100%' }}>
                        <CustomMenuItem Icon={<Settings fontSize='medium' />} label={'Settings'} position={'left'} />
                        <Divider />
                        <CustomMenuItem Icon={<Logout fontSize='medium' />} label={'Logout'} position={'left'} onClick={async () => await signOut()} />
                    </MenuList>
                </Grid>
            </Grid>
        </Grid>
    );
};