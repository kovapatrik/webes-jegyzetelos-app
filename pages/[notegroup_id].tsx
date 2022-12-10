import { Database } from '../lib/database.types';
import { useRouter } from 'next/router';
import ImageCard from '../components/ImageCard';
import { NextPage } from 'next';
import { Breadcrumbs, Grid } from '@mui/material';
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