import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Grid, IconButton, SxProps, Theme, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

const imageStyles: Record<string, SxProps<Theme> | undefined> = {
	container: {
		backgroundColor: 'white',
		width: '280px',
	},
	imageContainer: {
		objectFit: 'cover',
	},
};

interface ImageProps {
	title: string;
	href: string;
	href_as: string;
}

export default function ImageCard({ title, href, href_as }: ImageProps) {
	return (
		<Box
			id='imageCard'
			sx={{
				width: '180px',
				'&:hover': {
					backgroundColor: '#4DE599',
					cursor: 'pointer'
				}
			}}
			p={1}
		>
			<Grid container flexDirection={'column'} spacing={1}>
				<Link href={href} as={href_as}>
					<Grid item>
						<ImageListItem key={'1'} sx={imageStyles.imageContainer}>
							<img src={itemData[0].img} loading='lazy' />
						</ImageListItem>
					</Grid>
				</Link>
				<Grid item>
					<Grid container flexDirection={'row'} justifyContent={'space-between'}>
						<Link href={href} as={href_as}>
							<Grid item>
								<Grid container spacing={1} sx={{ paddingTop: '8px' }}>
									<Grid item>
										<PictureAsPdfIcon sx={{ color: '#de5246' }} />
									</Grid>
									<Grid item>
										<Typography
											sx={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												width: '90px',
											}}
										>
											{title}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Link>
						<Grid item>
							<IconButton onClick={() => console.log('implement delete with confirm dialog')}>
								<DeleteIcon id='smallMenuItem' />
							</IconButton>
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
