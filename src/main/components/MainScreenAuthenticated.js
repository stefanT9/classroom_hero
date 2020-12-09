import './MainScreen.css';
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

export default function MainScreenAuthenticated(){
    
    return (<div></div>)
}