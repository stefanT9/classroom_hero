import react from 'react'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export default function ChatMessage ({ author, message, dateTime }) {
  return (
        <ListItem style={{ width: '100%' }}>
            <Paper style={{ width: '100%', height: '100%' }}>
                <Typography variant='subtitle1'>
                    {message}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Typography variant='subtitle2'>
                        {`${author} 21:31`}
                    </Typography>
                </div>
            </Paper>
        </ListItem>
  )
}
