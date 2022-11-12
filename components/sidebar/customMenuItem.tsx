import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

type CustomMenuItemProps = {
	Icon: JSX.Element;
	label: string;
	position: 'left' | 'right';
	onClick?: React.MouseEventHandler;
};

export const CustomMenuItem = (props: CustomMenuItemProps) => {
	const { Icon, label, position, onClick } = props;
	return (
		<MenuItem onClick={onClick}>
			{position === 'left' && <ListItemIcon>{Icon}</ListItemIcon>}
			<ListItemText color='text.secondary'>
				<Typography variant='body1' color='text.secondary'>
					{label}
				</Typography>
			</ListItemText>
			{position === 'right' && <ListItemIcon>{Icon}</ListItemIcon>}
		</MenuItem>
	);
};
