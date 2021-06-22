import { Paper, IconButton, makeStyles } from "@material-ui/core";
import "fontsource-roboto";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import { MicRounded } from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings";
import classes from "./conference.module.scss";
import MediaStreamSingleton from "../api/MediaStreamUtils";

interface StreamSettings {
  audio: Boolean;
  video: Boolean;
}
interface CallSettingsProps {
  disableCamera: Function;
  disableMicrophone: Function;
  enableCamera: Function;
  enableMicrophone: Function;
  streamSettings: StreamSettings;
}
export default function CallSettingsBar(props: CallSettingsProps) {
  const {
    disableCamera,
    disableMicrophone,
    enableCamera,
    enableMicrophone,
    streamSettings,
  } = props;
  return (
    <Paper className={classes.callSettingsWrapper}>
      {streamSettings.audio ? (
        <IconButton
          onClick={() => {
            disableMicrophone();
          }}
        >
          <MicRounded />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            enableMicrophone();
          }}
        >
          <MicOffIcon />
        </IconButton>
      )}
      {streamSettings.video ? (
        <IconButton
          onClick={() => {
            disableCamera();
          }}
        >
          <VideocamIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            enableCamera();
          }}
        >
          <VideocamOffIcon />
        </IconButton>
      )}
      <IconButton
        onClick={() => {
          MediaStreamSingleton.getInstance()
            .then((value) => {
              const caputure = new ImageCapture(value.getVideoTracks()[0]);
              caputure
                .takePhoto()
                .then((photo) => {
                  const base64 = URL.createObjectURL(photo);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <SettingsIcon />
      </IconButton>
    </Paper>
  );
}
