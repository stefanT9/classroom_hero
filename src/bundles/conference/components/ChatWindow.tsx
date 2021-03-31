import React, { useEffect, useState } from "react";
import {
  Paper,
  IconButton,
  Icon,
  List,
  TextField,
  makeStyles,
} from "@material-ui/core";
import "fontsource-roboto";

import SendIcon from "@material-ui/icons/Send";

import ChatMessage from "./ChatMessage";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/authContext";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  sidenavWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
}));

const validationSchema = yup.object({
  message: yup.string().required(),
});
interface ChatWindowProps {
  socket: SocketIOClient.Socket;
  userDetails: UserDetails;
}
export default function ChatWindow(props: ChatWindowProps) {
  const { socket, userDetails } = props;
  const classes = useStyles();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (socket) {
        console.log("message sent");
        socket.emit("room-chat-message-post", {
          userId: userDetails.id,
          username: userDetails.username,
          message: values.message,
        });
      } else {
        console.log("curently not working", socket);
      }
    },
  });

  useEffect(() => {
    const socketInitialisedInterval = setInterval(() => {
      if (socket) {
        console.log("updated socket");
        // requests the message history
        socket.emit("room-chat-message-history");

        // recives the message history
        socket.on("room-chat-message-all", (messages: Array<Message>) => {
          console.log(messages);
          setMessages(messages);
        });

        // recives a new message
        socket.on("room-chat-message-post", (message: Message) => {
          console.log("something good here");
          setMessages((messages) => [...messages, message]);
        });
        clearInterval(socketInitialisedInterval);
      }
    }, 100);
  }, [socket]);
  return (
    <Paper className={classes.sidenavWrapper}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ flexGrow: 1, overflow: "scroll" }}>
          <List style={{ display: "flex", flexDirection: "column" }}>
            {messages.map((val: Message) => {
              console.log(val);
              return (
                <ChatMessage
                  author={val.username}
                  message={val.message}
                  dateTime={val.dateTime}
                />
              );
            })}
          </List>
        </div>

        <form
          style={{ height: "auto", display: "flex", flexDirection: "row" }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            fullWidth
            id="message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
          />
          <IconButton type="submit">
            <Icon>
              <SendIcon />
            </Icon>
          </IconButton>
        </form>
      </div>
    </Paper>
  );
}
