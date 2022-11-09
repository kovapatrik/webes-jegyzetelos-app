import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Grid, IconButton, SxProps, Theme, Typography } from '@mui/material';
import ThemeContext, { colors } from '../../design/theme/themeColors';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { MoreVert } from '@mui/icons-material';
import { useContext } from 'react';

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
	return <div></div>;
}

const itemData = [
	{
		img: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
		title: 'Breakfast',
		author: '@bkristastucchio',
	},
];
