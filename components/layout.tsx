import CustomBreadCrumbs from './breadcrumbs';
import { Grid, Box } from '@mui/material';
import TitlebarBelowImageList from './ImageCards';

export default function Layout() {
	return (
		<Box p={4}>
			<Grid container>
				<Grid item>
					<CustomBreadCrumbs />
				</Grid>
				<Grid item>
					<Box pt={3}>
						<Grid container spacing={{ xs: 4, md: 6 }} justifyContent={'center'}>
							{Array.from(Array(8)).map((_, index) => (
								<Grid item xs={8} sm={6} md={5} lg={4} xl={3} key={index}>
									<TitlebarBelowImageList />
								</Grid>
							))}
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
