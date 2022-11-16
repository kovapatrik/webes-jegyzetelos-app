import type { GetServerSidePropsContext, NextPage } from 'next';
import { useSession } from '@supabase/auth-helpers-react';
import useSwr from 'swr';
import { Database } from '../lib/database.types';
import { useRouter } from 'next/router';
import { createServerSupabaseClient, Session, User } from '@supabase/auth-helpers-nextjs';
import Layout from '../components/layout';
import { SharedAppProps } from '../lib/app.types';
import ImageCard from '../components/ImageCard';

interface GetNoteGroupRes {
	notes: Database['public']['Tables']['note']['Row'][];
	noteGroups: Database['public']['Tables']['note_group']['Row'][];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface NoteGroupProps extends SharedAppProps {
	user: User;
	session: Session;
}

const NoteGroup: NextPage<NoteGroupProps> = ({ user, toggle, toggleSidebar, toggleTheme }) => {
	const {
		query: { notegroup_id },
	} = useRouter();
	const session = useSession();

	const { data } = useSwr<GetNoteGroupRes>(`/api/note-group/${notegroup_id}`, fetcher);

	return (
		<Layout toggle={toggle} toggleSidebar={toggleSidebar} toggleTheme={toggleTheme}>
			{data?.noteGroups?.map(n => (
					<ImageCard title={n.title} href='/[notegroup_id]' href_as={`/${n.id}`}/>
			))}
			{data?.notes?.map(n => (
				<ImageCard title={n.title} href='/[notegroup_id]/[note_id]' href_as={`/${notegroup_id}/${n.id}`}/>
			))}
		</Layout>
	)
};

export default NoteGroup;
