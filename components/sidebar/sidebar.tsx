import { Grid, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import * as React from 'react';

import MenuList from '@mui/material/MenuList';

import { Close, Folder, Logout, Note } from '@mui/icons-material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { CustomMenuItem } from './customMenuItem';
import BackgroundLetterAvatars from './backgroundLetterAvatar';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

import { deleteCookie } from 'cookies-next';
import { colors } from '../../design/theme/themeColors';

type SidebarProps = {
	onToggle: MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
};

export const Sidebar = (props: SidebarProps) => {
	const { onToggle } = props;

	const theme = useTheme();
	const small = useMediaQuery(theme.breakpoints.down('md'));

	const supabaseClient = useSupabaseClient();
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
								<Grid item>
									<BackgroundLetterAvatars username={'John Doe'} />
								</Grid>
								<Grid item>
									<Typography color={colors.dark.main.m100} id='avatarName' variant={'h4'}>
										John Doe
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
			<Grid item>
				<MenuList sx={{ width: '100%' }}>
					<CustomMenuItem Icon={<Note fontSize='medium' />} label={'My Notes'} position={'left'} />
					<CustomMenuItem Icon={<Folder fontSize='medium' />} label={'Shared With Me'} position={'left'} />
				</MenuList>
			</Grid>
			<Grid item>
				<Grid container>
					<MenuList id='sidebarMenuItems' sx={{ width: '100%' }}>
						<CustomMenuItem Icon={<Logout fontSize='medium' />} label={'Logout'} position={'left'} onClick={async () => await signOut()} />
					</MenuList>
				</Grid>
			</Grid>
		</Grid>
	);
};
