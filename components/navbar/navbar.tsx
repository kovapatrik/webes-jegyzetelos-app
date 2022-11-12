import * as React from 'react';
import { Toolbar } from '@mui/material/';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import { ViewSidebarOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import NavButton from './navButton';
import Box from '@mui/material/Box';

type NavbarProps = {
	onToggle: React.MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
	toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Navbar = (props: NavbarProps) => {
	const { onToggle, toggle, toggleTheme } = props;

	return (
		<Toolbar>
			<Grid container justifyContent={'space-between'}>
				<Grid item>{!toggle && <NavButton Icon={<ViewSidebarOutlined />} onClick={onToggle} />}</Grid>
				<Grid item>
					<Grid container>
						<Box px={1}>
							<NavButton Icon={<SearchIcon />} />
						</Box>
						<Box px={1}>
							<NavButton Icon={<ContrastIcon />} onClick={toggleTheme} />
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>
	);
};
