import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Fab from '@mui/material/Fab';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useRef, SyntheticEvent, ChangeEvent } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

export default function ShortcutMenuButton() {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [openNewNote, setOpenNewNote] = useState(false);
	const [newNoteTitle, setNewNoteTitle] = useState('');

	const {
		query: { note_id, notegroup_id },
	} = useRouter();
	

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = (event: Event | SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	const handleNewNote = (event: Event | SyntheticEvent) => {
		event.preventDefault();
		setOpenNewNote(true);
	};

	const onTitleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setNewNoteTitle(event.target.value);
	};

	const handleCloseNewNoteDialog = () => {
		setOpenNewNote(false);
		setNewNoteTitle('');
	}

	const handleCreate = async () => {
		const res = await fetch(`/api/note/${notegroup_id}`, {
			method: 'POST',
			body: JSON.stringify({
				title: newNoteTitle,
				note_group_id: notegroup_id
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await res.json();
		setNewNoteTitle('');
		setOpenNewNote(false);	
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
										<MenuItem onClick={handleNewNote}>New note</MenuItem>
									)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<Dialog open={openNewNote} onClose={handleCloseNewNoteDialog}>
				<DialogTitle>New note</DialogTitle>
				<DialogContent>
					<TextField
						value={newNoteTitle}
						autoFocus
						margin='normal'
						id='title'
						label='New note title'
						type='text'
						fullWidth
						variant='outlined'
						onChange={e => onTitleChange(e)}
					/>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center' }}>
					<Button disabled={newNoteTitle === ''} type='button' onClick={handleCreate}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
