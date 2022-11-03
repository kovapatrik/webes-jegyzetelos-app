import type {NextPage} from 'next'
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography} from '@mui/material';
import { colors } from '../design/theme/themeColors';

const Home: NextPage = () => {

    return (
        <Grid container direction='column' alignItems='center' justifyContent='center' spacing={4}>
            <Grid item>
                <Typography variant='h1'>Bejelentkezés</Typography>
            </Grid>
            <Grid item>
                <Typography>Jelentkezz be és kezdődhet a jegyzetelés</Typography>
            </Grid>
            <Grid item>
            <Grid container alignItems='center' direction='column' spacing={4}>   
                <Grid item>
                    <TextField style={{ backgroundColor: '#224957' }} fullWidth id="outlined-basic" label="Felhasználónév" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField style={{ backgroundColor: '#224957' }} fullWidth id="outlined-basic" label="Jelszó" variant="outlined" />
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
                <Button style={{width: '300px', height: '50px', borderRadius: '10px'}}>
                    <Typography>Bejelentkezés</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default Home
