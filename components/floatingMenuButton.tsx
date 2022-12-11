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
import NewNoteOrNoteGroupDialog from './NewNoteOrNoteGroupDialog';
import { Snackbar, Alert } from '@mui/material';
import { CrudResponse, Database } from '../lib/database.types';
import ShareNoteDialog from './ShareNoteDialog';
import DeleteNoteDialog from './DeleteNoteDialog';

interface ShortcutProps {
	allPerms?: Database['public']['Tables']['note_perm']['Row'][];
}

export default function ShortcutMenuButton({ allPerms }: ShortcutProps) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [groupNoteModal, setGroupNoteModal] = useState(false);
	// -- New note -- //
	const [openNewNote, setOpenNewNote] = useState(false);
	const [newNoteTitle, setNewNoteTitle] = useState('');
	const [newNoteResponse, setNewNoteResponse] = useState<CrudResponse | null>(null);
	const [openNewNoteSnackbar, setOpenNewNoteSnackbar] = useState(false);
	// ------------- //

	// -- Share note -- //
	const [openShareNote, setOpenShareNote] = useState(false);
	const [email, setEmail] = useState('');
	// ---------------- //

	// -- Delete note -- //
	const [openDeleteNote, setOpenDeleteNote] = useState(false);

	async function handleDeleteConfirm() {
		const res = await fetch(`/api/note/${note_id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});

		setOpenDeleteNote(false);
		if (res.status === 200) {
			router.replace(`/${notegroup_id}`);
		}
	}
	// ---------------- //

	const router = useRouter();

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

	console.log(allPerms);
	// --- New Note Dialog functions --- //
	const handleNewNote = (event: Event | SyntheticEvent, isGroup: boolean) => {
		event.preventDefault();
		if (isGroup) {
			setGroupNoteModal(true);
		}
		setOpenNewNote(true);
	};

	const onTitleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setNewNoteTitle(event.target.value);
	};

	const handleCloseNewNoteDialog = () => {
		setOpenNewNote(false);
		setGroupNoteModal(false);
		setNewNoteTitle('');
	};

	const handleCreate = async () => {
		if (!groupNoteModal) {
			//new note
			const res = await fetch(`/api/note/`, {
				method: 'POST',
				body: JSON.stringify({
					title: newNoteTitle,
					note_group_id: notegroup_id,
				}),
				headers: { 'Content-Type': 'application/json' },
			});

			const data = await res.json();
			setNewNoteResponse(data);
			setOpenNewNoteSnackbar(true);
			setNewNoteTitle('');
			setOpenNewNote(false);

			if (res.status === 200) {
				router.replace(router.asPath);
			}

			// if (data.id) {
			// 	router.push(`/${data.note_group_id}/${data.id}`)
			// }
		} else {
			// new note group
			setNewNoteTitle('');
			setOpenNewNote(false);
			setGroupNoteModal(false);
		}
	};
	// ------ //

	// --- Share note Dialog functions --- //
	const handleShareNote = (event: Event | SyntheticEvent) => {
		event.preventDefault();
		setOpenShareNote(true);
	};

	const onEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleCloseShareNoteDialog = () => {
		setOpenShareNote(false);
		setEmail('');
	};
	// ------ //

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
										<div>
											<MenuItem key='share' onClick={handleShareNote}>
												Share note
											</MenuItem>
											<MenuItem key='delete' onClick={() => setOpenDeleteNote(true)}>
												Delete
											</MenuItem>
										</div>
									) : (
										<div>
											<MenuItem key='new' onClick={e => handleNewNote(e, false)}>
												New note
											</MenuItem>
											<MenuItem key='new-group' onClick={e => handleNewNote(e, true)}>
												New note group
											</MenuItem>
										</div>
									)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<NewNoteOrNoteGroupDialog
				groupNoteModal={groupNoteModal}
				dialogValue={newNoteTitle}
				handleCreate={handleCreate}
				onClose={handleCloseNewNoteDialog}
				onTitleChange={onTitleChange}
				open={openNewNote}
			/>
			<ShareNoteDialog dialogValue={email} onClose={handleCloseShareNoteDialog} onEmailChange={onEmailChange} open={openShareNote} />
			<DeleteNoteDialog open={openDeleteNote} onClose={() => setOpenDeleteNote(false)} onConfirm={handleDeleteConfirm} />
			{newNoteResponse && (
				<Snackbar open={openNewNoteSnackbar} autoHideDuration={4000} onClose={() => setOpenNewNoteSnackbar(false)}>
					<Alert
						onClose={() => setOpenNewNoteSnackbar(false)}
						severity={newNoteResponse.error ? 'error' : 'success'}
						sx={{ width: '100%' }}
					>
						{newNoteResponse.description ?? 'Note successfully created!'}
					</Alert>
				</Snackbar>
			)}
		</div>
	);
}
