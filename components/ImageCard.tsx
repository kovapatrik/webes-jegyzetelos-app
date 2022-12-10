import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, SxProps, TextField, Theme, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DeleteNoteDialog from './DeleteNoteDialog';

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
	uid: string;
	title: string;
	href: string;
	href_as: string;
	is_note_group: boolean;
}

export default function ImageCard({ title, href, href_as, uid, is_note_group }: ImageProps) {

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const router = useRouter()

	async function handleDeleteConfirm() {
		const res = await fetch(`/api/${is_note_group ? 'note_group' : 'note'}/${uid}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});

		console.log(res)
		setDeleteDialogOpen(false)
		if (res.status === 200) {
			router.replace(router.asPath)
		}
		
	}

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
							<IconButton onClick={() => setDeleteDialogOpen(true)}>
								<DeleteIcon id='smallMenuItem' />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<DeleteNoteDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm}/>
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
