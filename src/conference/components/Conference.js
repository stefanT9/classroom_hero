import 'fontsource-roboto'
import Peer from 'peerjs'
import { Paper, Typography } from '@material-ui/core'
import { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import ChatWindow from './ChatWindow'
import { useParams } from 'react-router-dom'
import CallSettingsBar from './CallSettingsBar'
import socketIOClient from 'socket.io-client'

const useStyles = makeStyles((theme) => ({
	body: {
		display: 'grid',
		gridTemplateColumns: '10fr 2fr',
		gridTemplateRows: 'fit-content() fit-content() fit-content()',
		height: '100vh',
	},
	mainScreen: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))',
		height: '100%',
		gap: '0.5rem',
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

export default function Conference() {
	const classes = useStyles()
	const [streamSettings, updateStreamSettings] = useState({ video: true, audio: true })
	const { conferenceId, callerId } = useParams()
	const [peers, updatePeers] = useState([])

	let myPeer = useRef(null)
	let socket = useRef(null)

	useEffect(() => {
		myPeer.current = new Peer(callerId, { host: 'localhost', port: 9000, path: '/signaling' })
	}, [callerId])

	useEffect(() => {
		socket.current = socketIOClient()
		console.log('set socket current here', socket)
		myPeer.current.on('open', (id) => {
			console.log(`my id is ${id}`)
			socket.current.emit('join-room', ({ id: callerId, username: callerId, room: conferenceId }))
			socket.current.on('message', (data) => {
				console.log(data)
			})
			socket.current.on('room-users', (data) => {
				updatePeers(data.users.filter(val => val.id !== id).map(val => ({ id: val.id, username: val.username, ref: undefined })))
			})
			socket.current.on('room-users-joined', ({ userId, username }) => {
				updatePeers((peers) => [...peers, { id: userId, username: username, ref: undefined }])
			})
			socket.current.on('room-users-left', ({ userId }) => {
				updatePeers((peers) => [...peers].filter(val => val.id !== userId))
			})
		})

	}, [conferenceId, callerId])

	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	function disableMicrophone() {
		updateStreamSettings(stream => ({ video: stream.video, audio: false }))
	}
	function enableMicrophone() {
		updateStreamSettings(stream => ({ video: stream.video, audio: true }))
	}
	function disableCamera() {
		updateStreamSettings(stream => ({ video: false, audio: stream.audio }))
	}
	function enableCamera() {
		updateStreamSettings(stream => ({ video: true, audio: stream.audio }))
	}

	return (
		<div className={classes.body}>
			<div style={{ gridRow: 1, gridColumnStart: 1, gridColumnEnd: 3, }}>
				<Paper style={{height:'100%', width:'100%', display:'flex',flexDirection:'row'}}>
					cox?
				</Paper>
			</div>
			<Paper className={classes.mainScreen}>
				{
					peers.map((val, idx) => (
						<div className={classes.participantWrapper} style={{ backgroundColor: getRandomColor() }}>
							<video className={classes.participantVideo} ref={val.ref} />
							<Typography className={classes.participantNameTypography}>
								{val.username}
							</Typography>
						</div>))
				}
			</Paper>
			<div style={{ gridRow: 2, gridColumn: 2 }}>
				<ChatWindow socket={socket} />
			</div>
			<div style={{ gridRow: 3, gridColumnStart: 1, gridColumnEnd: 3 }}>
				<CallSettingsBar streamSettings={streamSettings} controlFunctions={{ disableMicrophone, enableMicrophone, disableCamera, enableCamera }} />
			</div>
		</div>)
}
