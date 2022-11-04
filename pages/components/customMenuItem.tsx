import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

type CustomMenuItemProps = {
	Icon: JSX.Element;
	label: string;
};

export const CustomMenuItem = (props: CustomMenuItemProps) => {
	const { Icon, label } = props;
	return (
		<MenuItem>
			<ListItemIcon>{Icon}</ListItemIcon>
			<ListItemText color='text.secondary'>
				<Typography variant='body1' color='text.secondary'>
					{label}
				</Typography>
			</ListItemText>
		</MenuItem>
	);
};
