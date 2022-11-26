import type { NextPage } from 'next';
import { Box } from '@mui/material';
import useSwr from 'swr';
import { Database } from '../../lib/database.types';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { ChangeEvent, useState } from 'react';
import dynamic from 'next/dynamic';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
	ssr: false,
});

const Note: NextPage = () => {
	const {
		query: { notegroup_id, note_id },
	} = useRouter();

	const { data } = useSwr<Database['public']['Tables']['note']['Row']>(`/api/note/${note_id}`, fetcher);

	const [value, setValue] = useState(data?.data);

	function handleEditorChange(text: string, event: ChangeEvent<HTMLTextAreaElement> | undefined) {
		event?.preventDefault();
		setValue(text);
	}

	if (!data?.data) {
		return null;
	}

	return (
		<Box sx={{ padding: '40px' }}>
			<MdEditor
				style={{ height: '500px' }}
				value={value ?? data.data}
				renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
				onChange={(data, event) => handleEditorChange(data.text, event)}
			/>
		</Box>
	);
};

export default Note;
