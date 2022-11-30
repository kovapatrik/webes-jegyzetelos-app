import { Grid, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import * as React from 'react';
import { colors } from '../../design/theme/themeColors';

import MenuList from '@mui/material/MenuList';

import Divider from '@mui/material/Divider';
import { Close, Folder, Logout, Note } from '@mui/icons-material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { CustomMenuItem } from './customMenuItem';
import BackgroundLetterAvatars from './backgroundLetterAvatar';

type SidebarProps = {
	onToggle: MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
};

export const Sidebar = (props: SidebarProps) => {
	const { onToggle } = props;

	const theme = useTheme();
	const small = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Grid
			container
			sx={{
				backgroundColor: `${colors.dark.primary.p100}`,
				minHeight: small ? '20vh' : '100vh',
				position: 'sticky',
				top: '0px',
			}}
			flexDirection={'column'}
			justifyContent={'space-between'}
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
									<Typography color={colors.dark.main.m100} variant={'h4'}>
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
					<MenuList sx={{ width: '100%' }}>
						<Divider />
						<CustomMenuItem Icon={<Logout fontSize='medium' />} label={'Logout'} position={'left'} />
					</MenuList>
				</Grid>
			</Grid>
		</Grid>
	);
};
