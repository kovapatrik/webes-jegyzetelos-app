import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material';
import { Database, NoteWithPerms } from '../../lib/database.types';
import { ChangeEvent, MouseEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import Showdown from 'showdown';
import { createServerSupabaseClient, Session, User } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { GetNote } from '../../lib/note';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
	ssr: false,
});

const converter = new Showdown.Converter({
	tables: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tasklists: true,
});

interface ParsedUrlQuery {
	[key: string]: string;
	note_id: string;
}

interface NoteProps {
	data: NoteWithPerms;
	user: User;
	initialSession: Session;
}

function Note({ data }: NoteProps) {
	const [value, setValue] = useState(data?.note.data);
	const [isSaveAvailable, setIsSaveAvailable] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [noteTitle, setNoteTitle] = useState(data?.note.title);

	const [openNewNoteSnackbar, setOpenNewNoteSnackbar] = useState(false);

	function handleEditorChange(text: string, event: ChangeEvent<HTMLTextAreaElement> | undefined) {
		event?.preventDefault();
		setValue(text);
		setIsSaveAvailable(true);
	}

	const handleSaveClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setOpenModal(true);
	};

	const handleClose = () => {
		setOpenModal(false);
		setNoteTitle(data.note.title);
	};

	const onTitleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setNoteTitle(event.target.value);
	};

	const handleSave = async () => {
		const res = await fetch(`/api/note/${data.note.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				...data.note,
				title: noteTitle,
				data: value,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		const { data: newNote }: { data: Database['public']['Tables']['note']['Row'] } = await res.json();
		setOpenModal(false);
		setIsSaveAvailable(false);
		setNoteTitle(newNote.title);
		setValue(newNote.data);
		setOpenNewNoteSnackbar(true);
	};

	if (!data?.note || !data?.allPerms || !data?.userPerm) {
		return <CircularProgress />;
	}

	return (
		<>
			<Box sx={{ padding: '40px' }}>
				<Typography variant='h3'>{noteTitle}</Typography>
				<MdEditor
					view={{
						html: true,
						menu: data.userPerm.edit_perm ? true : false,
						md: data.userPerm.edit_perm ? true : false,
					}}
					readOnly={!data.userPerm.edit_perm}
					style={{ height: '500px' }}
					value={value ?? undefined}
					renderHTML={text => Promise.resolve(converter.makeHtml(text))}
					onChange={(data, event) => handleEditorChange(data.text, event)}
				/>
				<Button
					disabled={!data.userPerm.edit_perm || !isSaveAvailable}
					sx={{ marginTop: '10px' }}
					onClick={e => handleSaveClick(e)}
					variant='contained'
				>
					Save changes
				</Button>
			</Box>
			<Dialog open={openModal} disableEscapeKeyDown onClose={handleClose}>
				<DialogTitle>Save note changes</DialogTitle>
				<DialogContent>
					<TextField
						value={noteTitle}
						autoFocus
						margin='normal'
						id='title'
						label='Note title'
						type='text'
						fullWidth
						variant='outlined'
						onChange={e => onTitleChange(e)}
					/>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center' }}>
					<Button type='button' onClick={handleSave}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar open={openNewNoteSnackbar} autoHideDuration={4000} onClose={() => setOpenNewNoteSnackbar(false)}>
				<Alert onClose={() => setOpenNewNoteSnackbar(false)} severity={'success'} sx={{ width: '100%' }}>
					Note successfully updated!
				</Alert>
			</Snackbar>
		</>
	);
}

export default Note;

export const getServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
	const supabase = createServerSupabaseClient(ctx);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	// This is optional, middleware does this in the background
	if (!session)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	const data = await GetNote({ id: ctx.query['note_id'] as string, user: session.user, supabaseServerClient: supabase });

	return {
		props: {
			initialSession: session,
			user: session.user,
			data: data,
		},
	};
};
