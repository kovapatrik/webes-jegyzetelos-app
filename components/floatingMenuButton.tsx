import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Fab from '@mui/material/Fab';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';

export default function ShortcutMenuButton() {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);

	const {
		query: { note_id },
	} = useRouter();

	console.log(note_id);

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	return (
		<div>
			<Fab ref={anchorRef} id='composition-button' onClick={handleToggle}>
				<MenuIcon />
			</Fab>
			<Popper open={open} anchorEl={anchorRef.current} placement='left-start' transition>
				{({ TransitionProps }) => (
					<Grow
						id='grow-tab'
						style={{
							marginRight: '12px',
							backgroundColor: '#20DF7F',
							color: '#1e1e1e',
							marginBottom: '5px',
						}}
						{...TransitionProps}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} id='composition-menu' aria-labelledby='composition-button'>
									{note_id ? (
										<>
											<MenuItem onClick={handleClose}>Share note</MenuItem>
											<MenuItem onClick={handleClose}>Delete</MenuItem>
										</>
									) : (
										<MenuItem onClick={handleClose}>New note</MenuItem>
									)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
}
