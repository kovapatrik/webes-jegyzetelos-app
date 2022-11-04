import * as React from 'react';
import { Button, Toolbar } from '@mui/material/';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import { ViewSidebarOutlined } from '@mui/icons-material';

type NavbarProps = {
	onToggle: React.MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
};
export const Navbar = (props: NavbarProps) => {
	const { onToggle, toggle } = props;

	return (
		<React.Fragment>
			<Toolbar>
				{!toggle && (
					<Button id='fade-button' aria-haspopup='true' onClick={onToggle}>
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
		</React.Fragment>
	);
};
