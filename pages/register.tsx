import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient} from '@supabase/auth-helpers-react';
import { Grid, Typography, TextField, FormControl, Button, InputAdornment, IconButton, Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Register = () => {
	const supaBaseClient = useSupabaseClient();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');


	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);


	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();

		const { error } = await supaBaseClient.auth.signUp({
			email,
			password,
			options: {
				data: {
					name,
				}
			}
		});

		if (error) {
			if (error.message == "Password should be at least 6 characters")
			{
				alert(JSON.stringify("A jelszónak legalább 6 karakterből kell állnia"));
			}
			else 
			{
				alert(JSON.stringify("Az e-mail cím nem ellenőrizhető: érvénytelen formátum"));
			}
		} else {
			router.push('/');
		}
	};

	return (
		<Grid sx={{ minHeight: '100vh' }} container direction='column' alignItems='center' justifyContent='center' spacing={4}>
			<Grid item>
				<Typography variant='h3' sx={{ color: '#1C5E2E' }}>
					Regisztráció
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
					<Grid >
						<FormControl onSubmit={handleSignUp}>
							<TextField sx={{ padding: '0px', width: '300px', margin: '20px', "& label": { color: '#052029' } }}
								id="name"
								label="Név"
								onChange={(e) => setName(e.target.value)} 
								InputProps={{
									style: {
										borderRadius: '10px',
										borderColor: '#50d465',
									}
								}}
							/>
							<TextField sx={{ padding: '0px', width: '300px', margin: '20px', "& label": { color: '#052029' }, marginTop: '10px' }}
								id="email"
								label="E-mail cím"
								onChange={(e) => setEmail(e.target.value)} 
								InputProps={{
									style: {
										borderRadius: '10px',
										borderColor: '#50d465',
									}
								}}
							/>
							<TextField sx={{ padding: '0px', width: '300px', margin: '20px', "& label": { color: '#052029' }, marginTop: '10px' }}
								id="password"
								label="Jelszó"
								type={showPassword ? "text" : "password"}
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									style: {
										borderRadius: '10px',
										borderColor: '#50d465',
									},
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
							<Button onClick={handleSignUp} sx={{borderRadius: '10px', width: '300px', margin: '20px', marginTop: '10px' }}>
								Regisztráció
							</Button>
                            <Link href="/" underline="none" sx={{ padding: '0px', width: '300px', margin: '20px',  marginTop: '0px'  }} >Van már fiókom</Link>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Register;