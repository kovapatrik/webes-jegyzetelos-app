import { Database } from '../lib/database.types';
import ImageCard from '../components/ImageCard';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient, Session, User } from '@supabase/auth-helpers-nextjs';
import { GetNoteGroup } from '../lib/note_group';
import { Grid } from '@mui/material';
import Layout from '../components/layout';
import { SharedAppProps } from "../lib/app.types"

interface GetNoteGroupRes {
	notes: Database['public']['Tables']['note']['Row'][];
	noteGroups: Database['public']['Tables']['note_group']['Row'][];
}

interface NoteGroupProps extends SharedAppProps {
	data: GetNoteGroupRes,
	user: User,
	initialSession: Session
}

interface ParsedUrlQuery {
	notegroup_id: string;

	[key: string]: string;
}

function NoteGroup({ data, toggle, toggleSidebar, toggleTheme } : NoteGroupProps) {

	return (
		<Layout toggle={toggle} toggleSidebar={toggleSidebar} toggleTheme={toggleTheme}>
			<Grid container id='noteGroupView' spacing={2} p={2}>
				{/* <Grid item>
					<Breadcrumbs maxItems={3}>
					</Breadcrumbs>
				</Grid> */}
				{data?.noteGroups
					?.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1))
					.map(n => (
						<Grid key={n.id} item>
							<ImageCard key={n.id} uid={n.id} title={n.title} href='/[notegroup_id]' href_as={`/${n.id}`} is_note_group={true} />
						</Grid>
					))}
				{data?.notes
					?.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1))
					.map(n => (
						<Grid key={n.id} item>
							<ImageCard
								key={n.id}
								uid={n.id}
								title={n.title}
								href='/[notegroup_id]/[note_id]'
								href_as={`/${n.note_group_id}/${n.id}`}
								is_note_group={false}
							/>
						</Grid>
					))}
			</Grid>
		</Layout>
	)
}

export default NoteGroup;

export const getServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
	const supabase = createServerSupabaseClient(ctx);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	// This is optional, middleware does this in the background
	if (!session)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	const data = await GetNoteGroup({
		id: ctx.query['notegroup_id'] as string,
		user: session.user,
		supabaseServerClient: supabase,
	});

	return {
		props: {
			initialSession: session,
			user: session.user,
			data: data,
		},
	};
};
