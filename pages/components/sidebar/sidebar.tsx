import { Button, Grid, SxProps, Theme } from '@mui/material';
import { MouseEventHandler } from 'react';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import BackgroundLetterAvatars from '../backgroundLetterAvatar';
import { colors } from '../../../design/theme/themeColors';

import MenuList from '@mui/material/MenuList';

import Divider from '@mui/material/Divider';
import { Logout, Settings } from '@mui/icons-material';
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
						<Box sx={{ padding: '14px 0 0 24px' }}>
							<Button
								id='fade-button'
								aria-haspopup='true'
								onClick={onToggle}
								sx={{
									backgroundColor: colors.dark.main.m100,
								}}
							>
								<MenuIcon />
							</Button>
						</Box>
					</Grid>
					<Grid item>
						<BackgroundLetterAvatars username={'John Doe'} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item></Grid>
			<Grid item>
				<Grid container>
					<MenuList sx={{ width: '100%' }}>
						<CustomMenuItem Icon={<Settings fontSize='medium' />} label={'Settings'} />
						<Divider />
						<CustomMenuItem Icon={<Logout fontSize='medium' />} label={'Logout'} />
					</MenuList>
				</Grid>
			</Grid>
		</Grid>
	);
};
