import { useSession } from '@supabase/auth-helpers-react';
import useSwr from 'swr';
import { Database } from '../lib/database.types';
import { useRouter } from 'next/router';
import ImageCard from '../components/ImageCard';
import { NextPage } from 'next';
import { Breadcrumbs, Grid } from '@mui/material';

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

	return (
		<Grid container id='noteGroupView'>
			{/* <Grid item>
				<Breadcrumbs maxItems={3}>
				</Breadcrumbs>
			</Grid> */}
			{data?.noteGroups?.sort((a,b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1).map(n => (
				<Grid key={n.id} item>
					<ImageCard key={n.id} title={n.title} href='/[notegroup_id]' href_as={`/${n.id}`} is_note_group={true}/>
				</Grid>
			))}
			{data?.notes?.sort((a,b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1).map(n => (
				<Grid key={n.id} item>
					<ImageCard key={n.id} title={n.title} href='/[notegroup_id]/[note_id]' href_as={`/${notegroup_id}/${n.id}`} is_note_group={false}/>
				</Grid>
			))}
		</Grid>
	)
};

export default NoteGroup;