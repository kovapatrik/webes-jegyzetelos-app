import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient} from '@supabase/auth-helpers-react';
import { Grid, Typography, TextField, FormControl, Button, Link } from '@mui/material';


const ResetPassword = () => {
    const supaBaseClient = useSupabaseClient();
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleNewPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try
        {
            const { error } = await supaBaseClient.auth.resetPasswordForEmail(email);
            if (error) {
                alert(JSON.stringify("Az e-mail cím nem ellenőrizhető: érvénytelen formátum"));
            } else {
                router.push('/');
            }
        }
        catch (error)
        {
            alert(JSON.stringify("Az e-mail címre való értesítőt nem tudtuk kiküldeni. Kérem próbálja meg újra."));
        }
    };

    return (
        <Grid sx={{ minHeight: '100vh' }} container direction='column' alignItems='center' justifyContent='center' spacing={4}>
            <Grid item>
                <Typography variant='h3' sx={{ color: '#1C5E2E' }}>
                    Elfelejtett jelszó
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
                        <FormControl onSubmit={handleNewPassword}>
                            <TextField sx={{ padding: '0px', width: '300px', margin: '20px', "& label": { color: '#052029' } }}
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
                            <Button onClick={handleNewPassword} sx={{borderRadius: '10px', width: '300px', margin: '20px' , marginTop: '10px'}}>
                                Új jelszó igénylése
                            </Button>
                            <Link href="/" underline="none" sx={{ padding: '0px', width: '300px', margin: '20px', marginTop: '10px' }} >Vissza a bejelentkezésre</Link>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResetPassword;