import { Box, Button, Typography } from '@mui/material';
import useSwr from 'swr';
import { Database, NoteWithPerms } from '../../lib/database.types';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
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

	function handleEditorChange(text: string, event: ChangeEvent<HTMLTextAreaElement> | undefined) {
		event?.preventDefault();
		setValue(text);
	}

	if (!data?.note.data || !data.perms) {
		return null;
	}

	function setView(perms: Database['public']['Tables']['note_perm']['Row']) {
		if (!perms.edit_perm) {
			return {...mdOptions, menu: false, md: false};
		} else {
			return mdOptions;
		}
	}

	return (
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
			<Button disabled={!data.perms.edit_perm} sx={{ marginTop: '10px' }} variant='contained'>Save changes</Button>
		</Box>
	);
}

export default Note;
