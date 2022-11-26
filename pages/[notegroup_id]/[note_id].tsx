import type { GetServerSidePropsContext, NextPage } from 'next';
import { Box, Grid } from '@mui/material';
import useSwr from 'swr';
import { Database } from '../../lib/database.types';
import { useRouter } from 'next/router';
import { useSession, useUser } from '@supabase/auth-helpers-react';
import ReactMarkdown from 'react-markdown';
import { ChangeEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
	ssr: false,
});

const Note = ({ data }: {data: any}) => {
	const {
		query: { notegroup_id, note_id },
	} = useRouter();

	console.log(data);
	

	const [value, setValue] = useState(data?.data);

	function handleEditorChange(text: string, event: ChangeEvent<HTMLTextAreaElement> | undefined) {
		event?.preventDefault();
		setValue(text);
	}

	return (
		<Box sx={{ padding: '40px' }}>
			<MdEditor
				style={{ height: '500px' }}
				value={value ?? undefined}
				renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
				onChange={(data, event) => handleEditorChange(data.text, event)}
			/>
		</Box>
	);
};

export default Note;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	// Run queries with RLS on the server
	const { data } = await supabase.from('note').select('title, data, created_at, last_modify').eq('id', session.user.id).single();

	return {
		props: {
			initialSession: session,
			user: session.user,
			data: data ?? [],
		},
	};
};
