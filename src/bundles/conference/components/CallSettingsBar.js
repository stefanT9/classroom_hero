import Peer from 'simple-peer'
import { Paper, Typography, IconButton, Button } from '@material-ui/core'
import 'fontsource-roboto'
import { useEffect, useState } from 'react'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import { MicRounded } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles((theme) => ({
	body: {
		display: 'grid',
		gridTemplateColumns: '10fr 2fr',
		gridTemplateRows: '11fr 1fr',
		height: '100vh'
	},
	mainScreen: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))',
		height: '100%',
		gap: '0.5rem',
		maxHeight: '90vh',
		overflow: 'scroll',
		'&::-webkit-scrollbar': {
			width: '0.4em'
		},
	},
	participantWrapper: {
		flexShrink: 'auto',
		flexGrow: 'auto',
		minWidth: '300px',
		minHeight: '300px',
		display: 'grid',
		gridTemplateRows: '3fr 1fr 1fr',
		gridTemplateColumns: '3fr 1fr 1fr 1fr 3fr',
		justifyItems: 'center',
	},
	participantVideo: {
		gridRowStart: 1,
		gridRowEnd: 4,
		gridColumnStart: 1,
		gridColumnEnd: 6,
		width: '100%',
		height: '100%'
	},
	muteParticipantButton: {
		gridRow: 3,
		gridColumn: 2
	},
	stopParticipantVideo: {
		gridRow: 3,
		gridColumn: 4
	},
	participantNameTypography: {
		gridRow: 3,
		gridColumnStart: 2,
		gridColumnEnd: 5
	},
	sidenavWrapper: {
		display: 'flex',
		backgroundColor: 'gray',
		height: '100%'
	},
	callSettingsWrapper: {
		display: 'flex',
		gridColumnStart: '1',
		gridColumnEnd: '3',
		flexDirection: 'row',
		justifyContent: 'center',
	}
}))

export default function CallSettingsBar({controlFunctions,streamSettings}){
    const classes = useStyles()
    const {disableCamera,disableMicrophone,enableCamera,enableMicrophone} = controlFunctions
    return(
        <Paper className={classes.callSettingsWrapper}>
        {
		streamSettings.audio?(
		<IconButton  onClick={() => { disableMicrophone() }}>
			<MicRounded/>
		</IconButton>):(
		<IconButton onClick={()=>{enableMicrophone()}}> 
			<MicOffIcon/>
		</IconButton>)
		}
		{
			streamSettings.video?(
			<IconButton onClick={()=>{disableCamera()}}> 
				<VideocamIcon/>
			</IconButton>):(
			<IconButton onClick={()=>{enableCamera()}}>
				<VideocamOffIcon/>
			</IconButton>)
		}
        <IconButton>
            <SettingsIcon />
        </IconButton>
    </Paper>
    )

}