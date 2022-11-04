import { Grid, SxProps, Theme, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import * as React from 'react';
import BackgroundLetterAvatars from '../backgroundLetterAvatar';
import { colors } from '../../../design/theme/themeColors';

import MenuList from '@mui/material/MenuList';

import Divider from '@mui/material/Divider';
import { Close, Folder, Groups2, Logout, Note, Settings } from '@mui/icons-material';
import { CustomMenuItem } from '../customMenuItem';

const sidebarStyles: Record<string, SxProps<Theme> | undefined> = {
	container: {
		backgroundColor: `${colors.dark.primary.p100}`,
		minHeight: '100vh',
	},
};

type SidebarProps = {
	onToggle: MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
};

export const Sidebar = (props: SidebarProps) => {
	const { onToggle } = props;
	return (
		<Grid container sx={sidebarStyles.container} flexDirection={'column'} justifyContent={'space-between'}>
			<Grid item>
				<Grid container flexDirection={'column'} alignItems={'center'} spacing={4}>
					<Grid item sx={{ width: '100%' }}>
						<MenuList sx={{ width: '100%' }}>
							<CustomMenuItem onClick={onToggle} Icon={<Close fontSize='medium' />} position={'right'} label={'Close'} />
						</MenuList>
					</Grid>
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
				</Grid>
			</Grid>
			<Grid item>
				<MenuList sx={{ width: '100%' }}>
					<CustomMenuItem Icon={<Note fontSize='medium' />} label={'Notes'} position={'left'} />
					<CustomMenuItem Icon={<Folder fontSize='medium' />} label={'Files'} position={'left'} />
					<CustomMenuItem Icon={<Groups2 fontSize='medium' />} label={'Groups'} position={'left'} />
				</MenuList>
			</Grid>
			<Grid item>
				<Grid container>
					<MenuList sx={{ width: '100%' }}>
						<CustomMenuItem Icon={<Settings fontSize='medium' />} label={'Settings'} position={'left'} />
						<Divider />
						<CustomMenuItem Icon={<Logout fontSize='medium' />} label={'Logout'} position={'left'} />
					</MenuList>
				</Grid>
			</Grid>
		</Grid>
	);
};
