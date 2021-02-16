import './MainScreen.css';
import {Grid, InputLabel,Typography, Input, Button, FormControl, TextField} from '@material-ui/core'
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display:'grid',
    gridTemplateRows:'1fr 6fr 3fr',
    width: '100vw',
    height: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}))

export default function MainScreenUnauthenticated(){
    const classes = useStyles()

    return (<Grid container spacing={3} alignItems='center'>
        <Grid item xs={9}>
          <Grid container spacing={3} direction='column' alignItems='center'>
            <Grid item xs={12}>
              <Typography>
                Join via meeting ID
              </Typography>              
             </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor='meeting-id-input'>Meeting id</InputLabel>
                <Input id='meeting-id-input'/>
              </FormControl>         
            </Grid>
            <Grid item xs={12}>
              <Button>
                Join meeting
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
            <Grid container spacing={3} alignItems='center' direction='column'>
              <Grid item xs={12}>
                <FormControl xs={3}>
                  <InputLabel htmlFor='email-input'>Email</InputLabel>
                  <Input id='email-input'/>
                </FormControl>          
              </Grid>
              
              <Grid item xs={12}>
                <FormControl xs={3}>
                  <InputLabel htmlFor="password-input">Password</InputLabel>
                  <Input id="password-input"/>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Button >
                  sign in
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button>
                  register
                </Button>
              </Grid>
            </Grid>
        </Grid>
      </Grid>)
}