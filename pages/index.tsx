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
		<Box sx={{ backgroundColor: colors.dark.main.m20 }}>
			<Grid container>
				{toggle && (
					<Grid item xs={3} md={2}>
						<Sidebar onToggle={toggleSidebar} toggle={toggle} />
					</Grid>
				)}

				<Grid item xs={toggle ? 9 : 12} md={toggle ? 10 : 12}>
					<Navbar onToggle={toggleSidebar} toggle={toggle} />
					<Layout />
				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;
