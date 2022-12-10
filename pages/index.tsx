import React, { useEffect, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { GetBaseNoteGroup } from '../lib/note_group';
import { Grid, Typography, TextField, FormControl, Button, InputAdornment, IconButton, Link, Box, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Home: NextPage = () => {
	const supaBaseClient = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

	const [baseId, setBaseId] = useState<string | null | undefined>(null);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	if (baseId) {
		router.push(`/${baseId}`);
	}

	useEffect(() => {
		supaBaseClient.auth.onAuthStateChange(async (event, session) => {
			if (event == 'PASSWORD_RECOVERY') {
				const newPassword = prompt('What would you like your new password to be?');
				if (newPassword) {
					const { data, error } = await supaBaseClient.auth.updateUser({
						password: newPassword,
					});
					if (data) alert('Password updated successfully!');
					if (error) alert('There was an error updating your password.');
				} else {
					alert('Password is empty');
				}
			}
		});

		async function getData() {
			const data = await GetBaseNoteGroup({ user, supabaseServerClient: supaBaseClient });
			setBaseId(data?.id);
		}

		if (user) getData();
	}, [supaBaseClient.auth, user]);

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();

        const { error} = await supaBaseClient.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            alert(JSON.stringify("Hibás e-mail cím vagy jelszó. Próbálja újra, vagy kattintson az Elfelejtett jelszó linkre a jelszó visszaállításához."));
        }
    };

    return (
        !user ?
            <Grid sx={{ minHeight: '100vh' }} container direction='column' alignItems='center' justifyContent='center' spacing={4} >
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
                        <Grid >
                            <FormControl onSubmit={handleSignIn}>
                                <TextField sx={{ padding: '0px', width: '300px', margin: '20px', "& label": { color: '#052029' }}}
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
                                <Button onClick={handleSignIn} sx={{borderRadius: '10px', width: '300px', margin: '20px' , marginTop: '10px'}}>
                                    Bejelentkezés
                                </Button>
                                <Box sx={{ padding: '0px', width: '300px', margin: '20px', marginTop: '0px' }}>
                                    <Link href="/resetpassword" underline="none" sx={{ marginRight: '75px' }} >Elfelejtett jelszó</Link>
                                    <Link href="/register" underline="none" >Fiók létrehozás</Link>
                                </Box>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            :
            <Grid>
                <CircularProgress />
            </Grid>
    )
}


export default Home;
