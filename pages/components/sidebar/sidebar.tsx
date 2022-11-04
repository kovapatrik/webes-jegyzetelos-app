import { Button, Grid, SxProps, Theme } from '@mui/material';
import { MouseEventHandler } from 'react';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import BackgroundLetterAvatars from '../backgroundLetterAvatar';
import { colors } from '../../../design/theme/themeColors';

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
		<Grid container sx={sidebarStyles.container} flexDirection={'column'}>
			<Grid item>
				<Box sx={{ padding: '14px 0 0 24px' }}>
					<Button id='fade-button' aria-haspopup='true' onClick={onToggle}>
						<MenuIcon />
					</Button>
				</Box>
			</Grid>
			<Grid item>
				<BackgroundLetterAvatars username={'John Doe'} />
			</Grid>
		</Grid>
	);
};
