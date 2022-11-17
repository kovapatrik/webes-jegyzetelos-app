import type { NextPage } from 'next';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Grid, Typography } from '@mui/material';

const Login: NextPage = () => {
	const supaBaseClient = useSupabaseClient();

	return (
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
										email_input_placeholder: 'Email cím',
										password_input_placeholder: 'Írja be jelszavát',
										button_label: 'Bejelentkezés',
										link_text: 'Már van profilja? Jelentkezzen be!',
									},
									forgotten_password: {
										link_text: 'Elfelejtte a jelszavát?',
										button_label: 'Jelszóvisszaállítás',
										email_input_placeholder: 'Email cím',
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
	);
};

export default Login;