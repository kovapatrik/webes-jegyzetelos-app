import CustomBreadCrumbs from './breadcrumbs';
import { Grid, Box } from '@mui/material';
import TitlebarBelowImageList from './ImageCards';
import ShortcutMenuButton from './floatingMenuButton';

type LayoutProps = {
	toggle?: boolean;
};

export default function Layout(props: LayoutProps) {
	const { toggle } = props;

	return (
		<Grid id='mainContainer' container flexDirection={'column'} p={4}>
			<Grid item>
				<CustomBreadCrumbs />
			</Grid>
			<Grid>
				<Box pt={3}>
					<Grid container spacing={3}>
						{Array.from(Array(30)).map((_, index) => (
							<Grid item xs={6} sm={4} md={toggle ? 4 : 3} lg={toggle ? 3 : 2} xl={2} key={index}>
								<TitlebarBelowImageList />
							</Grid>
						))}
					</Grid>
					<Grid container style={{ position: 'relative' }}>
						<Box sx={{ width: '100%', bottom: '2em', right: '2em', position: 'fixed' }} display='flex' justifyContent='flex-end'>
							<ShortcutMenuButton />
						</Box>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}
