import * as React from 'react';
import { Box, Grid, IconButton, SxProps, Theme, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderRounded from '@mui/icons-material/FolderRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import { MoreVert } from '@mui/icons-material';
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
	is_note_group: boolean;
}

export default function ImageCard({ title, href, href_as, is_note_group} : ImageProps) {

	return (
		<Box
			className='imageCard'
			sx={{
				width: '180px'
			}}
			p={1}
		>
			<Link href={href} as={href_as}>
				<Grid container flexDirection={'column'} spacing={1}>
					<Grid item>
						{is_note_group ? <FolderRounded className='imageCardIcon'/> : <TextSnippetRoundedIcon className='imageCardIcon'/>}
					</Grid>
					<Grid item className="imageCardTitle">
						<Grid container flexDirection={'row'} justifyContent={'space-between'}>
								<Grid item>
									<Grid container spacing={1} sx={{ paddingTop: '8px' }}>
										<Grid item>
											<Typography sx={{ color: '#ffffff' }}>{title}</Typography>
										</Grid>
									</Grid>
								</Grid>
							<Grid item>
								<Grid container>
									<Grid item>
										<IconButton>
											<MoreVert id='smallMenuItem' />
										</IconButton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Link>
		</Box>
	);
}