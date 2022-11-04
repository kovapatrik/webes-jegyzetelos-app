import * as React from 'react';
import { Button, Toolbar } from '@mui/material/';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import { ViewSidebarOutlined } from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material';
import { colors } from '../../../design/theme/themeColors';

type NavbarProps = {
	onToggle: React.MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
};

const navbarStyles: Record<string, SxProps<Theme> | undefined> = {
	container: {
		backgroundColor: `${colors.dark.main.m100}`,
		minHeight: '100vh',
	},
};

export const Navbar = (props: NavbarProps) => {
	const { onToggle, toggle } = props;

	return (
		<Toolbar sx={navbarStyles.container}>
			{!toggle && (
				<Button id='fade-button' aria-haspopup='true' onClick={onToggle} color={'primary'}>
					<ViewSidebarOutlined />
				</Button>
			)}

			<Button sx={{ marginLeft: 'auto' }} variant='contained'>
				<SearchIcon />
			</Button>
			<Button sx={{ marginLeft: '20px' }} variant='contained'>
				<ContrastIcon />
			</Button>
		</Toolbar>
	);
};
