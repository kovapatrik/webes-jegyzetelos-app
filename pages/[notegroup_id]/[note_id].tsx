import type { NextPage } from 'next';
import { Grid } from '@mui/material';
import { useSession } from '@supabase/auth-helpers-react';
import useSwr from 'swr';
import { Database } from '../../lib/database.types';
import { useRouter } from 'next/router';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Note: NextPage = () => {
	const {
		query: { notegroup_id, note_id },
	} = useRouter();
	const session = useSession();

	const { data } = useSwr<Database['public']['Tables']['note']['Row']>(`/api/note/${note_id}`, fetcher);
	console.log(data);
	return (
		<Grid>
			{session!.user.email}
			<p>{data?.title}</p>
			<p>{data?.data}</p>
		</Grid>
	);
};

export default Note;
