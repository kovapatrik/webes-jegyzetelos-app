import { Grid, Box } from '@mui/material';
import { Sidebar } from './sidebar/sidebar';
import { Navbar } from './navbar/navbar';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import ShortcutMenuButton from './floatingMenuButton';

interface LayoutProps {
	children?: ReactNode;
	toggle: boolean;
	toggleTheme: React.MouseEventHandler<HTMLButtonElement>;
	toggleSidebar: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Layout({ children, toggle, toggleTheme, toggleSidebar } : LayoutProps) {

	const router = useRouter()

	return (
		router.pathname !== '/' && router.pathname !== '/register' && router.pathname !== '/resetpassword' ?
			<Box sx={{ height: '100vh' }}>
				<Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
					{toggle && (
						<Grid item md={3} xl={2} display={{ xs: 'none', md: 'block' }}>
							<Sidebar onToggle={toggleSidebar} toggle={toggle}/>
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
						<Grid id="mainContainer" item>
							{children}
						</Grid>
						<Grid container style={{ position: 'relative' }}>
							<Box sx={{ width: '100%', bottom: '2em', right: '2em', position: 'fixed' }} display='flex' justifyContent='flex-end'>
								<ShortcutMenuButton />
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		:
		<>
		{children}
		</>
	);
}