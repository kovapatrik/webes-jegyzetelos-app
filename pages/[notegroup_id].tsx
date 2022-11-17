import type { NextPage } from 'next';
import { Grid } from '@mui/material';
import { useSession } from '@supabase/auth-helpers-react';
import useSwr from 'swr';
import { Database } from '../lib/database.types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Login from './login';

interface GetNoteGroupRes {
	notes: Database['public']['Tables']['note']['Row'][];
	noteGroups: Database['public']['Tables']['note_group']['Row'][];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const NoteGroup: NextPage = () => {
	const {
		query: { notegroup_id },
	} = useRouter();
	const session = useSession();

	const { data } = useSwr<GetNoteGroupRes>(`/api/note-group/${notegroup_id}`, fetcher);

	return session?.user ? (
		<Grid>
			{session.user.email}
			{data?.noteGroups?.map(n => {
				return (
					<Link key={n.id} href='/[notegroup_id]' as={`/${n.id}`}>
						{n.title}
					</Link>
				);
			})}
			{data?.notes?.map(n => {
				return (
					<Link key={n.id} href='/[notegroup_id]/[note_id]' as={`/${notegroup_id}/${n.id}`}>
						{n.title}
					</Link>
				);
			})}
		</Grid>
	) : (
		<Login />
	);
};

export default NoteGroup;
