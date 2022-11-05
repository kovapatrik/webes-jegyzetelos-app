import CustomBreadCrumbs from './breadcrumbs';
import { Grid, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import TitlebarBelowImageList from './ImageCards';
import { MouseEventHandler, useContext } from 'react';
import ThemeContext from '../../design/theme/themeColors';

type LayoutProps = {
	toggle?: boolean;
};

export default function Layout(props: LayoutProps) {
	const { toggle } = props;
	const themes = useContext(ThemeContext);
	return (
		<Box p={4}>
			<Grid container flexDirection={'column'}>
				<Grid item>
					<CustomBreadCrumbs />
				</Grid>
				<Grid item>
					<Box pt={3}>
						<Grid container spacing={3}>
							{Array.from(Array(8)).map((_, index) => (
								<Grid item xs={6} sm={4} md={toggle ? 4 : 3} lg={toggle ? 3 : 2} xl={2} key={index}>
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
