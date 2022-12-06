import { Database } from '../lib/database.types';
import { useRouter } from 'next/router';
import ImageCard from '../components/ImageCard';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient, Session, User } from '@supabase/auth-helpers-nextjs';
import { GetNoteGroup } from '../lib/note_group';

interface GetNoteGroupRes {
	notes: Database['public']['Tables']['note']['Row'][];
	noteGroups: Database['public']['Tables']['note_group']['Row'][];
}

interface NoteGroupProps {
	data: GetNoteGroupRes,
	user: User,
	initialSession: Session
}

interface ParsedUrlQuery {
	[key: string]: string;
	notegroup_id: string;
}

function NoteGroup({ data } : NoteGroupProps) {

	return (
		<>
			{data?.noteGroups?.map(n => (
				<ImageCard key={n.id} title={n.title} href='/[notegroup_id]' href_as={`/${n.id}`}/>
			))}
			{data?.notes?.map(n => (
				<ImageCard key={n.id} title={n.title} href='/[notegroup_id]/[note_id]' href_as={`/${n.note_group_id}/${n.id}`}/>
			))}
		</>
	)
}

export default NoteGroup;


export const getServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
	
	const supabase = createServerSupabaseClient(ctx)

	const {
		data: { session },
	} = await supabase.auth.getSession()
	
	// This is optional, middleware does this in the background
	if (!session)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}

	const data = await GetNoteGroup({id: ctx.query['notegroup_id'] as string, user: session.user, supabaseServerClient: supabase})
  
	return {
		props: {
			initialSession: session,
			user: session.user,
			data: data,
		},
	}
  }