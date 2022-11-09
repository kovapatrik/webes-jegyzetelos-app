import * as React from 'react';
import { Toolbar } from '@mui/material/';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import { ViewSidebarOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import ThemeContext, { colors } from '../../../design/theme/themeColors';
import { useContext } from 'react';
import NavButton from './navButton';
import Box from '@mui/material/Box';

type NavbarProps = {
	onToggle: React.MouseEventHandler<HTMLButtonElement>;
	toggle?: boolean;
};

export const Navbar = (props: NavbarProps) => {
	const { onToggle, toggle } = props;
	const themeColor = useContext(ThemeContext);

	function toggleTheme() {
		console.log('toggle');
	}

	return (
		<Toolbar
			sx={{
				backgroundColor: themeColor.main.m100,
				borderBottom: `0.5px solid ${themeColor.main.m60}`,
			}}
		>
			<Grid container justifyContent={'space-between'}>
				<Grid item>
					{!toggle && (
						<NavButton
							Icon={<ViewSidebarOutlined />}
							hoverColor={themeColor.primary.p120}
							bgColor={themeColor.primary.p100}
							color={themeColor.main.white}
							onClick={onToggle}
						/>
					)}
				</Grid>
				<Grid item>
					<Grid container>
						<Box px={1}>
							<NavButton
								Icon={<SearchIcon />}
								hoverColor={themeColor.primary.p120}
								bgColor={themeColor.primary.p100}
								color={themeColor.main.white}
							/>
						</Box>

						<Box px={1}>
							<NavButton
								onClick={toggleTheme}
								Icon={<ContrastIcon />}
								hoverColor={themeColor.primary.p120}
								bgColor={themeColor.primary.p100}
								color={themeColor.main.white}
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>
	);
};
