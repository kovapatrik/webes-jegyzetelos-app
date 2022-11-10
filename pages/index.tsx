import type { NextPage } from 'next';
import { Navbar } from './components/navbar/navbar';
import { Grid } from '@mui/material';
import Layout from './components/layout';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { colors } from '../design/theme/themeColors';
import { Sidebar } from './components/sidebar/sidebar';

const Home: NextPage = () => {
	const [toggle, setToggle] = useState<boolean>();

	const toggleSidebar = () => {
		setToggle(!toggle);
	};
	console.log(toggle);
	return (
		<Box sx={{ backgroundColor: colors.dark.main.m100, height: '100vh' }}>
			<Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
				{toggle && (
					<Grid item md={3} xl={2} display={{ xs: 'none', md: 'block' }}>
						<Sidebar onToggle={toggleSidebar} toggle={toggle} />
					</Grid>
				)}
				<Grid item md={toggle ? 9 : 12} xl={toggle ? 10 : 12}>
					<Grid item>
						<Navbar onToggle={toggleSidebar} toggle={toggle} />
					</Grid>
					{toggle && (
						<Grid item xs={12} md={2} lg={1} display={{ xs: 'block', md: 'none' }}>
							<Sidebar onToggle={toggleSidebar} toggle={toggle} />
						</Grid>
					)}
					<Grid item>
						<Layout toggle={toggle} />
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;
