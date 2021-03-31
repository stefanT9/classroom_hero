import React, { useContext, useEffect, useState } from 'react'
import { Paper, IconButton, Icon, List, TextField, makeStyles } from '@material-ui/core'
import 'fontsource-roboto'

import SendIcon from '@material-ui/icons/Send'

import ChatMessage from './ChatMessage'
import { useFormik } from 'formik'
import { AuthContext } from '../../../context/authContext'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
  sidenavWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
}))

const validationSchema = yup.object({
  message: yup
    .string('Any questions?')
    .required('')
})

export default function ChatWindow ({ socket }) {
  const classes = useStyles()
  const [messages, setMessages] = useState([])
  const [authContext, dispatch] = useContext(AuthContext)
  const formik = useFormik({
    initialValues: {
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (socket) {
        console.log('message sent')
        socket.current.emit('room-chat-message-post', ({ userId: authContext.userDetails.userId, username: authContext.userDetails.username, message: values.message }))
      } else {
        console.log('curently not working', socket)
      }
    }
  })

  useEffect(() => {
    const socketInitialisedInterval = setInterval(() => {
      if (socket) {
        console.log('updated socket')
        // requests the message history
        socket.current.emit('room-chat-message-history')

        // recives the message history
        socket.current.on('room-chat-message-all', (messages) => {
          console.log(messages)
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
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flexGrow: 1, overflow: 'scroll' }}>
                    <List style={{ display: 'flex', flexDirection: 'column' }}>
                        {
                            messages.map((val, idx) => {
                              console.log(val)
                              return <ChatMessage author={val.username} message={val.message}/>
                            }
                            )
                        }
                    </List>
                </div>

                <form
                    style={{ height: 'auto', display: 'flex', flexDirection: 'row' }}
                    onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="message"
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}/>
                    <IconButton type='submit'>
                        <Icon>
                            <SendIcon />
                        </Icon>
                    </IconButton>
                </form>
            </div>

        </Paper>)
}
