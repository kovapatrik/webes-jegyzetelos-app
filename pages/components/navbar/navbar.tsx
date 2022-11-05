import * as React from 'react';
import { Toolbar } from '@mui/material/';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import { ViewSidebarOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import ThemeContext from '../../../design/theme/themeColors';
import { useContext } from 'react';
import NavButton from './navButton';
import Box from '@mui/material/Box';

type NavbarProps = {
	onToggle: React.MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
};

export const Navbar = (props: NavbarProps) => {
	const { onToggle, toggle } = props;
	const themes = useContext(ThemeContext);

	return (
		<Toolbar sx={{ backgroundColor: themes.main.m100, borderBottom: `0.5px solid ${themes.main.m60}` }}>
			<Grid container justifyContent={'space-between'}>
				<Grid item>
					{!toggle && (
						<NavButton
							Icon={<ViewSidebarOutlined />}
							hoverColor={themes.primary.p120}
							bgColor={themes.primary.p100}
							color={themes.main.white}
							onClick={onToggle}
						/>
					)}
				</Grid>
				<Grid item>
					<Grid container>
						<Box px={1}>
							<NavButton Icon={<SearchIcon />} hoverColor={themes.primary.p120} bgColor={themes.primary.p100} color={themes.main.white} />
						</Box>
						<Box px={1}>
							<NavButton Icon={<ContrastIcon />} hoverColor={themes.primary.p120} bgColor={themes.primary.p100} color={themes.main.white} />
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>
	);
};
