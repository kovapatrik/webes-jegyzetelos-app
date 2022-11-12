import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

export default function CustomBreadCrumbs() {
	const breadcrumbs = [
		<Link underline='hover' key='1' href='/' onClick={handleClick}>
			MUI
		</Link>,
		<Link underline='hover' key='2' href='/material-ui/getting-started/installation/' onClick={handleClick}>
			Core
		</Link>,
		<Typography key='3'>Breadcrumb</Typography>,
	];

	return (
		<Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
			{breadcrumbs}
		</Breadcrumbs>
	);
}
