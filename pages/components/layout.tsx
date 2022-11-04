import CustomBreadCrumbs from './breadcrumbs';
import {Grid, Box} from '@mui/material';

export default function Layout() {
	return (
		<Box p={4}>
			<Grid container>
				<Grid item>
					<CustomBreadCrumbs/>
				</Grid>
			</Grid>

		</Box>
	);
}
