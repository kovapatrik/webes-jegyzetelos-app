import * as React from 'react';
import { IconButton, Toolbar } from '@mui/material/';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import { PanoramaFishEye, ViewSidebarOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import NavButton from './navButton';
import Box from '@mui/material/Box';
import { ToggleContext, ToggleContextType } from '../../context/toggleContext';
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import BlindLogo from '../assets/BlindLogo';

type NavbarProps = {
	onToggle: React.MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
	toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};

const PREFERENCE_COOKIE_NAME = 'theme-preference';

export const Navbar = (props: NavbarProps) => {
	const { onToggle, toggle, toggleTheme } = props;
	const { view, changeTheme } = useContext<ToggleContextType>(ToggleContext);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);

	useEffect(() => {
		if (view === 'weak') {
			setCookieTheme(PREFERENCE_COOKIE_NAME, 'weak');
		} else {
			setCookieTheme(PREFERENCE_COOKIE_NAME, 'light');
		}
	}, [view]);

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
							<NavButton Icon={<ContrastIcon />} disabled={view === 'weak'} onClick={toggleTheme} />
						</Box>
						<Box px={1}>
							<NavButton onClick={() => changeTheme(view === 'normal' ? 'weak' : 'normal')}>
								<BlindLogo />
							</NavButton>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>
	);
};
