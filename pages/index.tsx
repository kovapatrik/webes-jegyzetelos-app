import type {NextPage} from 'next'
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Theme, SxProps, Typography} from '@mui/material';
import { colors } from '../design/theme/themeColors';

const homeStyles: Record<string, SxProps<Theme> | undefined> = {
    container: {
        minHeight: '100vh'
    },
    textField: {
        borderRadius: '10px',
        backgroundColor: '#224957',
        width: '300px',
    },
    loginButton: {
        width: '300px', 
        height: '50px', 
        borderRadius: '10px'
    }
}

const Home: NextPage = () => {

    return (
        <Grid container direction='column' sx={homeStyles.container} alignItems='center' justifyContent='center' spacing={4}>
            <Grid item>
                <Typography variant='h1'>Bejelentkezés</Typography>
            </Grid>
            <Grid item>
                <Typography>Jelentkezz be és kezdődhet a jegyzetelés</Typography>
            </Grid>
            <Grid item>
            <Grid container alignItems='center' direction='column' spacing={4}>   
                <Grid item>
                    <TextField type='text'
                        InputProps={{sx: homeStyles.textField}}
                            fullWidth 
                            id="username" 
                            label="Felhasználónév" 
                            variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField type='password' InputProps={{sx: homeStyles.textField}}
                        fullWidth 
                        id="password" 
                        label="Jelszó" 
                        variant="outlined" 
                    />
                </Grid>
                <Grid item>
                    <Grid container alignItems="center">
                        <Grid item>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Emlékezz rám!" />
                            </FormGroup>
                        </Grid>
                        <Grid item>
                            <a style={{color: colors.dark.primary.p100, textDecoration: 'none'}} href='#'>
                                <Typography>Elfelejtette a jelszavát?</Typography>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
            <Grid item>
                <Button sx={homeStyles.loginButton}>
                    <Typography>Bejelentkezés</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default Home
