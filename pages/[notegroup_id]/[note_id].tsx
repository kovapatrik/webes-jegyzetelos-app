import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import useSwr from 'swr';
import { Database, NoteWithPerms } from '../../lib/database.types';
import { useRouter } from 'next/router';
import { ChangeEvent, MouseEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import Showdown from 'showdown';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
	ssr: false,
});

const converter = new Showdown.Converter({
	tables: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tasklists: true,
});

const mdOptions = {
	menu: true,
	md: true,
	html: true,
};

function Note() {
	const {
		query: { note_id },
	} = useRouter();

	const { data } = useSwr<NoteWithPerms>(`/api/note/${note_id}`, fetcher);

	const [value, setValue] = useState(data?.note.data);
	const [isSaveAvailable, setIsSaveAvailable] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [noteTitle, setNoteTitle] = useState(data?.note.title);

	function handleEditorChange(text: string, event: ChangeEvent<HTMLTextAreaElement> | undefined) {
		event?.preventDefault();
		setValue(text);
		setIsSaveAvailable(true);
	}

	if (!data?.note.data || !data.perms) {
		return null;
	}

	function setView(perms: Database['public']['Tables']['note_perm']['Row']) {
		if (!perms.edit_perm) {
			return { ...mdOptions, menu: false, md: false };
		} else {
			return mdOptions;
		}
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

	return (
		<>
			<Box sx={{ padding: '40px' }}>
				<Typography variant='h3'>{data.note.title}</Typography>
				<MdEditor
					view={setView(data.perms)}
					readOnly={!data.perms.edit_perm}
					style={{ height: '500px' }}
					value={value ?? data.note.data}
					renderHTML={text => Promise.resolve(converter.makeHtml(text))}
					onChange={(data, event) => handleEditorChange(data.text, event)}
				/>
				<Button
					disabled={!data.perms.edit_perm || !isSaveAvailable}
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
						value={noteTitle ?? data.note.title}
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
				<DialogActions>
					<Button type='button'>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default Note;
