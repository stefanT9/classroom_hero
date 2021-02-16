import Peer from 'simple-peer'
import { Typography, Paper, Input, IconButton, Icon, List, ListItem } from '@material-ui/core'
import 'fontsource-roboto'
import { makeStyles } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'

const useStyles = makeStyles((theme) => ({
    sidenavWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }
}))

export default function ChatWindow({ socket }) {
    let classes = useStyles()
    const [messages, setMessages] = useState([])
    let message = ''

    useEffect(() => {
        let socketInitialisedInterval = setInterval(() => {
            if (socket) {
                console.log('updated socket')
                // requests the message history
                socket.current.emit('room-chat-message-history')

                // recives the message history
                socket.current.on('room-chat-message-all', (messages) => {
                    setMessages(messages)
                })

                // recives a new message
                socket.current.on('room-chat-message-post', ({ userId, username, message }) => {
                    console.log('something good here')
                    setMessages(messages => [...messages, { userId, username, message }])
                })
                clearInterval(socketInitialisedInterval)
            }
        }, 100)
    }, [socket])
    return (
        <Paper className={classes.sidenavWrapper}>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
                <div style={{ overflow: 'hidden', flexGrow: 1 }}>
                    <List style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll', height: '100%' }}>
                        {
                            messages.map((val, idx) => <ChatMessage author={'autor'} message={'mesaj blana'} />)
                        }
                    </List>
                </div>

                <div style={{ height: 'auto', display: 'flex', flexDirection: 'row' }}>
                    <Input onChange={(val) => { message = val }}>

                    </Input>
                    <IconButton onClick={() => {
                        if (socket) {
                            socket.current.emit('room-chat-message-post', ({ userId: 'cox', username: 'cox', message: '123' }))
                            console.log('sent message')
                        }
                        else {
                            console.log('curently not working', socket)
                        }
                    }}>
                        <Icon>
                            <SendIcon />
                        </Icon>
                    </IconButton>
                </div>
            </div>

        </Paper>)
}