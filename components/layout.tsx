import { Grid, Box } from '@mui/material';
import { ReactNode } from 'react';
import { Sidebar } from './sidebar/sidebar';
import { Navbar } from './navbar/navbar';

type LayoutProps = {
	toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
	children?: ReactNode,
	toggleSidebar: React.MouseEventHandler<HTMLButtonElement>;
	toggle: boolean;
};

export default function Layout({ toggleTheme, children, toggleSidebar, toggle }: LayoutProps) {


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
						{children}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}
