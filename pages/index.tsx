import type {NextPage} from 'next'
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography} from '@mui/material';
import { colors } from '../design/theme/themeColors';

const Home: NextPage = () => {
    return (
        <Grid container direction='column' alignItems='center' spacing={4}>
            <Grid item>
                <Typography variant='h1'>Bejelentkezés</Typography>
            </Grid>
            <Grid item>
                <Typography>Jelentkezz be és kezdődhet a jegyzetelés</Typography>
            </Grid>
            <Grid item>
            <Grid container alignItems='center' direction='column' spacing={4}>   
                <Grid item>
                    <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
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
                <Button size='small' style={{width: '300px', height: '50px', borderRadius: '10px'}}>
                    <Typography variant='h3'>Bejelentkezés</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default Home
