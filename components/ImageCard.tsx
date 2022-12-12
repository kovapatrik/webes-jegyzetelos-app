import * as React from 'react';
import { Box, Grid, IconButton, SxProps, Theme, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DeleteNoteDialog from './DeleteNoteDialog';
import { FolderRounded, TextSnippetRounded } from '@mui/icons-material';

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
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const router = useRouter();

	async function handleDeleteConfirm() {
		const res = await fetch(`/api/${is_note_group ? 'note_group' : 'note'}/${uid}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});

		setDeleteDialogOpen(false);
		if (res.status === 200) {
			router.replace(router.asPath);
		}
	}

	return (
		<Box
			id='imageCard'
			sx={{
				width: '180px',
				'&:hover': {
					backgroundColor: '#4DE599',
					cursor: 'pointer',
				},
			}}
			p={1}
		>
			<Grid container flexDirection={'column'} spacing={1}>
				<Link href={href} as={href_as}>
					<Grid item>
						{is_note_group ? <FolderRounded className='imageCardIcon'/> : <TextSnippetRounded className='imageCardIcon'/>}
					</Grid>
				</Link>
				<Grid item>
					<Grid container flexDirection={'row'} justifyContent={'space-between'}>
						<Link href={href} as={href_as}>
							<Grid item>
								<Grid container spacing={1} sx={{ paddingTop: '8px' }}>
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
			<DeleteNoteDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
		</Box>
	);
}