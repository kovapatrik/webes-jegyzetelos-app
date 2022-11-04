import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Grid, IconButton, SxProps, Theme, Typography } from '@mui/material';
import { colors } from '../../design/theme/themeColors';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { MoreVert } from '@mui/icons-material';

const imageStyles: Record<string, SxProps<Theme> | undefined> = {
	container: {
		backgroundColor: 'white',
		width: '280px',
	},
	imageContainer: {
		objectFit: 'cover',
	},
};

export default function TitlebarBelowImageList() {
	return (
		<Box sx={imageStyles.container} p={1}>
			<Grid container flexDirection={'column'} spacing={1}>
				<Grid item>
					<ImageListItem key={'1'} sx={imageStyles.imageContainer}>
						<img src={itemData[0].img} loading='lazy' />
					</ImageListItem>
				</Grid>
				<Grid item>
					<Grid container flexDirection={'row'} justifyContent={'space-between'}>
						<Grid item>
							<Grid container spacing={1} sx={{ paddingTop: '8px' }}>
								<Grid item>
									<PictureAsPdfIcon sx={{ color: '#de5246' }} />
								</Grid>
								<Grid item>
									<Typography sx={{ color: `${colors.dark.darkGray}` }}>Image title</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container>
								<Grid item>
									<IconButton>
										<MoreVert />
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

const itemData = [
	{
		img: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
		title: 'Breakfast',
		author: '@bkristastucchio',
	},
];
