import { Navbar } from './components/navbar/navbar';
import { Grid } from '@mui/material';
import Layout from './components/layout';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Sidebar } from './components/sidebar/sidebar';

type HomeProps = {
	toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};

function Home(props: HomeProps) {
	const { toggleTheme } = props;
	const [toggle, setToggle] = useState<boolean>();

	const toggleSidebar = () => {
		setToggle(!toggle);
	};

	return (
		<Box sx={{ height: '100vh' }}>
			<Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
				{toggle && (
					<Grid item md={3} xl={2} display={{ xs: 'none', md: 'block' }}>
						<Sidebar onToggle={toggleSidebar} toggle={toggle} />
					</Grid>
				)}
				<Grid item md={toggle ? 9 : 12} xl={toggle ? 10 : 12}>
					<Grid item>
						<Navbar onToggle={toggleSidebar} toggle={toggle} toggleTheme={toggleTheme} />
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
}

export default Home;
