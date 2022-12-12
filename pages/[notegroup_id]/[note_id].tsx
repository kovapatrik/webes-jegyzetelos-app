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
import { Database } from '../../lib/database.types';
import { ChangeEvent, MouseEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import { createServerSupabaseClient, Session, User } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { GetNote } from '../../lib/note';
import Layout from '../../components/layout';
import { AllPerms, SharedAppProps } from '../../lib/app.types';

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useRouter } from 'next/router';

const MDEditor = dynamic(
	() => import("@uiw/react-md-editor"),
	{ ssr: false }
);

const Preview = dynamic(
	() => import("@uiw/react-markdown-preview"),
	{ ssr: false }
);

interface ParsedUrlQuery {
	[key: string]: string;
	note_id: string;
}

interface NoteWithPerms {
	note: Database['public']['Tables']['note']['Row'];
	userPerm: Database['public']['Tables']['note_perm']['Row']
	allPerms?: AllPerms[];
}

interface NoteProps extends SharedAppProps {
	data: NoteWithPerms;
	user: User;
	initialSession: Session;
}

function Note({ data, toggle, toggleSidebar, toggleTheme, selectedTheme }: NoteProps) {

	if (!data?.note || !data?.userPerm) {
		return <CircularProgress />;
	}

	const router = useRouter()

	const [value, setValue] = useState<string | undefined>(data?.note.data);
	const [isSaveAvailable, setIsSaveAvailable] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [noteTitle, setNoteTitle] = useState(data?.note.title);

	const [openNewNoteSnackbar, setOpenNewNoteSnackbar] = useState(false);

	function handleEditorChange(text: string | undefined, event: ChangeEvent<HTMLTextAreaElement> | undefined) {
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
	return (
		<Layout toggle={toggle} toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} allPerms={data.allPerms}>
			<Box sx={{ padding: '40px' }} data-color-mode={selectedTheme}>
				<Typography variant='h3'>{noteTitle}</Typography>
				{ data.userPerm.edit_perm ?
					<MDEditor
						value={value}
						onChange={(data, event) => handleEditorChange(data, event)}
						height={500}
					/>
				:
					<Preview
						source={value}
						style={{
							height: 500,
							padding: "10px 15px 15px"
						}}
					/>
				}
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
		</Layout>
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
