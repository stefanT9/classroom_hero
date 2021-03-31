import react from "react";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { AuthContext } from "../../../context/authContext";
interface ChatMessageProps {
  author: String;
  message: String;
  dateTime: Date;
  isMine: boolean;
}
export default function ChatMessage(props: ChatMessageProps) {
  const { author, message, dateTime, isMine } = props;
  return (
    <div
      style={{
        width: "90%",
        marginTop: "2rem",
        alignSelf: isMine ? "flex-end" : "flex-start",
      }}
    >
      <Typography variant="subtitle2">{author}</Typography>
      <Paper style={{ width: "100%", height: "100%" }}>
        <Container>
          <Typography variant="subtitle2">{message}</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="subtitle2">{`${dateTime.toLocaleTimeString()}`}</Typography>
          </div>
        </Container>
      </Paper>
    </div>
  );
}
