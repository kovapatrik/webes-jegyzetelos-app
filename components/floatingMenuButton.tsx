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
import ShareNoteDialog from './ShareNoteDialog';
import DeleteNoteDialog from './DeleteNoteDialog';
import { AllPerms } from '../lib/app.types';
import { useUser } from '@supabase/auth-helpers-react';

interface ShortcutProps {
	allPerms?: AllPerms[];
	ownerId?: string;
}

export interface CrudResponse {
	error: string | null;
	description: string;
}

export default function ShortcutMenuButton({ allPerms, ownerId }: ShortcutProps) {
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
	const user = useUser()

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

	// --- New Note Dialog functions --- //
	const handleNewNote = (event: Event | SyntheticEvent, isGroup: boolean) => {
		event.preventDefault();
		if (isGroup) {
			setGroupNoteModal(true);
		}
		setOpenNewNote(true);

		router.replace(router.asPath)
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
		const res = await fetch(`/api/${groupNoteModal ? 'note-group' : 'note'}/`, {
			method: 'POST',
			body: JSON.stringify(
				groupNoteModal ?
					{
						title: newNoteTitle,
						base_note_group_id: notegroup_id
					}
				:
					{
						title: newNoteTitle,
						note_group_id: notegroup_id,
					}
			),
			headers: { 'Content-Type': 'application/json' },
		});

		const data = await res.json();
		console.log(data)
		setNewNoteResponse(data);
		setOpenNewNoteSnackbar(true);
		setNewNoteTitle('');
		setOpenNewNote(false);
		setGroupNoteModal(false);

		router.replace(router.asPath)
	};
	// ------ //

	// --- Share note Dialog functions --- //
	const handleShareNote = (event: Event | SyntheticEvent) => {
		event.preventDefault();
		setOpenShareNote(true);
	};

	const handleCloseShareNoteDialog = () => {
		setOpenShareNote(false);
	};
	// ------ //

	return (
		(note_id && user?.id === ownerId) || (notegroup_id && !note_id) ?
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
									{ note_id && user?.id === ownerId ? (
										<div>
											<MenuItem key='share' onClick={handleShareNote}>
												Share note
											</MenuItem>
											<MenuItem key='delete' onClick={() => setOpenDeleteNote(true)}>
												Delete
											</MenuItem>
										</div>
									) :
										<div>
											<MenuItem key='new-group' onClick={e => handleNewNote(e, true)}>
												New note group
											</MenuItem>
											<MenuItem key='new' onClick={e => handleNewNote(e, false)}>
												New note
											</MenuItem>
										</div>
									}
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
			<ShareNoteDialog open={openShareNote} setOpen={setOpenShareNote} onClose={handleCloseShareNoteDialog} allPerms={allPerms} note_group_id={notegroup_id as string} note_id={note_id as string} />
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
		:
		null
	);
}
