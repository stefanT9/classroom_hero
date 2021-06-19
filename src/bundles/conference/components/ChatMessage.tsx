import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "@material-ui/core";
interface ChatMessageProps {
  author: String;
  message: String;
  dateTime: Date;
  isMine: boolean;
}

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const isValidURL = (str: string) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

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
          <Typography style={{ textOverflow: "clip" }} variant="subtitle2">
            {message
              .split(" ")
              .map((word) =>
                isValidURL(word) ? (
                  <Link
                    href={
                      word.startsWith("https://") || word.startsWith("https://")
                        ? word
                        : `//${word}`
                    }
                  >
                    {word}{" "}
                  </Link>
                ) : (
                  <span>{word} </span>
                )
              )}
          </Typography>
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
