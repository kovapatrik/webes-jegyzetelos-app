import { useSession } from '@supabase/auth-helpers-react';
import useSwr from 'swr';
import { Database } from '../lib/database.types';
import { useRouter } from 'next/router';
import ImageCard from '../components/ImageCard';
import { NextPage } from 'next';

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
		<>
			{data?.noteGroups?.map(n => (
					<ImageCard key={n.id} title={n.title} href='/[notegroup_id]' href_as={`/${n.id}`}/>
			))}
			{data?.notes?.map(n => (
				<ImageCard key={n.id} title={n.title} href='/[notegroup_id]/[note_id]' href_as={`/${notegroup_id}/${n.id}`}/>
			))}
		</>
	)
};

export default NoteGroup;