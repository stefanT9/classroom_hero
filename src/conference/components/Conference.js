import Peer from 'simple-peer'
import {Grid, Icon, Typography, IconButton, Card, Button} from '@material-ui/core'
import 'fontsource-roboto'
import { useEffect, useState } from 'react'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import { MicRounded } from '@material-ui/icons'
import {makeStyles} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    mainScreen:{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))',
        justifyItems:'center',
        gap:'0.5rem'
    },
    participantWrapper:{
    flexShrink:2,
    flexGrow:2,
    minWidth:'300px',
    minHeight:'300px',
    display:'grid',
    gridTemplateRows: '3fr 1fr 1fr',
    gridTemplateColumns: '3fr 1fr 1fr 1fr 3fr',
    justifyItems:'center',
  },
  participantVideo:{
      gridRowStart:1,
      gridRowEnd:4,
      gridColumnStart:1,
      gridColumnEnd:6,
      width:'100%',
      height:'100%'
  },
  muteParticipantButton:{
    gridRow:3,
    gridColumn:2
  },
  stopParticipantVideo:{
      gridRow:3,
      gridColumn:4
  },
  participantNameTypography:{
      gridRow:2,
      gridColumnStart:2,
      gridColumnEnd:5
  },
  callSettingsWrapper :{
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50px',
}
}))

export default function Conference({meetingId}) {
    const classes = useStyles()

    const [streamSettings, updateStreamSettings] = useState({video:false,sound:false})
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    function disableMicrophone(){
        updateStreamSettings(stream=>({video:stream.video, sound:false}))
    }
    function enableMicrophone(){

        updateStreamSettings(stream=>({video:stream.video, sound:true}))
    }
    function disableCamera(){
        updateStreamSettings(stream=>({video:false, sound:stream.sound}))
    }
    function enableCamera(){
        updateStreamSettings(stream=>({video:true, sound:stream.sound}))
    }

  let [peers, updatePeers] = useState([{},{},{},{}])

  useEffect(()=>{
    console.log('establishing connections')
  },[peers])

  return (
    <div style={{display:'grid',gridTemplateRows:'11fr auto', position:'absolute', top:'0px', left:'0px', right:'0px', bottom:'0px'}}>
        <main className={classes.mainScreen}>
        {
          peers.map((val, idx)=>(
                <div className={classes.participantWrapper} style={{backgroundColor:getRandomColor()}}>
                    <video  className={classes.participantVideo} ref={val.ref}/>           
                    <Typography className={classes.participantNameTypography}>
                        {`name ${idx}`}
                    </Typography>
                    <IconButton className={classes.muteParticipantButton}>
                        <Icon>
                            <MicRounded/>
                        </Icon>
                    </IconButton>
                    <IconButton className={classes.stopParticipantVideo}>
                        <Icon>
                            <VideocamIcon/>
                        </Icon>
                    </IconButton>                    
                    <IconButton className={classes.stopParticipantVideo}>
                        <Icon>
                            <VideocamIcon/>
                        </Icon>
                    </IconButton>
                </div>))
        }
        </main>
        <div className={classes.callSettingsWrapper} style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
          <IconButton>
              {
                streamSettings.sound
                ? <MicRounded onClick={()=>{disableMicrophone()}}/>
                : <MicOffIcon onClick={()=>{enableMicrophone()}}/>       
              }
          </IconButton>
          <IconButton onClick={()=>{}}>
              {
                  streamSettings.video
                  ? <VideocamIcon onClick={()=>{disableCamera()}}/>
                  : <VideocamOffIcon onClick={()=>{enableCamera()}}/>
              }
          </IconButton>
          <IconButton>
              <SettingsIcon/>
          </IconButton>
          <Button onClick={()=>{updatePeers(peers=> peers.filter((val,idx)=>idx!=peers.length-1))}}>
              -
          </Button>
          <Button onClick={()=>{updatePeers(peers=> [...peers,{}] )}}>
              +
          </Button>
      </div>
    </div>
  );
}

