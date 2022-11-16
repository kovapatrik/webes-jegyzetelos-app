import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import useSwr from 'swr'
import { Database } from '../lib/database.types';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { GetBaseNoteGroup, GetNoteGroup } from '../lib/note_group';

const Home: NextPage = () => {

	const supaBaseClient = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

	const [baseId, setBaseId] = useState<string|null>(null)
	if (baseId) {
		router.push(`/${baseId}`)	
	}
	useEffect(() => {
		supaBaseClient.auth.onAuthStateChange(async (event, session) => {
			if (event == "PASSWORD_RECOVERY") {
				const newPassword = prompt("What would you like your new password to be?");
				const { data, error } = await supaBaseClient.auth.updateUser({
					password: newPassword!,
				})

				if (data) alert("Password updated successfully!")
				if (error) alert("There was an error updating your password.")
			}
		})

		async function getData() {
			const data = await GetBaseNoteGroup({user, supabaseServerClient: supaBaseClient});
			console.log(data)
			setBaseId(data!.id);
		}

		if (user) getData();

	}, [supaBaseClient.auth, user])

	

	return (
		!user ?
			<Grid sx={{ minHeight: '100vh' }} container direction='column' alignItems='center' justifyContent='center' spacing={4}>
				<Grid item>
					<Typography variant='h3' sx={{ color: '#1C5E2E' }}>
						Bejelentkezés
					</Typography>
				</Grid>
				<Grid item>
					<Grid
						container
						spacing={0}
						boxShadow={8}
						justifyContent='center'
						sx={{
							width: '500px',
							paddingBottom: '20px',
							paddingTop: '20px',
							backgroundColor: '#424242',
							borderRadius: '10px',
						}}
					>
						<Grid item sx={{ padding: '0px', width: '300px' }}>
							<Auth
								supabaseClient={supaBaseClient}
								appearance={{
									theme: ThemeSupa,
									style: {
										input: {
											borderRadius: '10px',
											borderColor: '#50d465',
										},
										button: {
											borderRadius: '10px',
										},
										anchor: { color: '#052029', textDecoration: 'none' },
										label: {
											color: '#052029',
										},
										message: {
											color: 'red',
										},
									},
								}}
								localization={{
									variables: {
										sign_in: {
											email_label: 'Email',
											password_label: 'Jelszó',
											// email_input_placeholder: 'Email cím',
											// password_input_placeholder: 'Írja be jelszavát',
											button_label: 'Bejelentkezés',
											link_text: 'Már van profilja? Jelentkezzen be!',
										},
										forgotten_password: {
											link_text: 'Elfelejtte a jelszavát?',
											button_label: 'Jelszóvisszaállítás',
											// email_input_placeholder: 'Email cím',
											email_label: 'Email',
										},
										sign_up: {
											link_text: '',
										},
									},
								}}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		: 
		<Grid>
			PILL
		</Grid>
	)
}


export default Home;