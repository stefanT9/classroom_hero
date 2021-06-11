import React, { useEffect, useState, useLayoutEffect } from "react";
import "fontsource-roboto";
import { Paper, Typography, Grid } from "@material-ui/core";

import ChatWindow from "./ChatWindow";
import { useParams } from "react-router-dom";
import CallSettingsBar from "./CallSettingsBar";

import classes from "./conference.module.scss";
import { getPeer, getSocket } from "../api/peerUtils";
import MediaStreamSingleton from "../api/MediaStreamUtils";

interface ConferenceProps {
  userDetails: UserDetails;
}
interface ConferenceParams {
  conferenceId: string;
}
export default function Conference(props: ConferenceProps) {
  const [streamSettings, updateStreamSettings] = useState({
    video: true,
    audio: true,
  });

  const { userDetails } = props;
  //todo:fix type
  const [peers, setPeers] = useState<Array<any>>([]);
  const { conferenceId } = useParams<ConferenceParams>();
  const [socket, setSocket] = useState<any>(null);
  const [peer, setPeer] = useState<any>(null);

  useEffect(() => {
    try {
      const { peer, changeMediaStream } = getPeer(userDetails);
      const socket = getSocket(peer, userDetails, conferenceId, setPeers);
      setSocket(socket);
      setPeer(peer);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    console.log("peers changed", peers);
  }, [peers]);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  useLayoutEffect(() => {
    MediaStreamSingleton.linkToVideoTag();
  });

  function disableMicrophone() {
    updateStreamSettings((stream) => ({ video: stream.video, audio: false }));
    MediaStreamSingleton.mute();
  }
  function enableMicrophone() {
    updateStreamSettings((stream) => ({ video: stream.video, audio: true }));
    MediaStreamSingleton.unMute();
  }
  function disableCamera() {
    updateStreamSettings((stream) => ({ video: false, audio: stream.audio }));
    MediaStreamSingleton.closeCamera();
  }
  function enableCamera() {
    updateStreamSettings((stream) => ({ video: true, audio: stream.audio }));
    MediaStreamSingleton.openCamera();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          maxHeight: "86vh",
        }}
      >
        <div style={{ width: "80%" }}>
          <Paper className={classes.mainScreen}>
            <div
              className={classes.participantWrapper}
              style={{ backgroundColor: "cyan" }}
            >
              <video
                id="my-video-tag"
                autoPlay
                muted
                style={{
                  width: "100%",
                  objectFit: "fill",
                  height: "100%",
                }}
              />
              <Typography className={classes.participantNameTypography}>
                {userDetails.username}
              </Typography>
            </div>
            {peers.map((val, idx) => {
              console.log("peer to interface", val);
              return (
                <div
                  className={classes.participantWrapper}
                  style={{ backgroundColor: getRandomColor() }}
                >
                  <video
                    id={`video${val.id}`}
                    className={classes.participantVideo}
                    autoPlay
                    style={{
                      width: "100%",
                      objectFit: "fill",
                      height: "100%",
                    }}
                  />
                  <Typography className={classes.participantNameTypography}>
                    {val.username}
                  </Typography>
                </div>
              );
            })}
          </Paper>
        </div>
        <div style={{ width: "20%" }}>
          {socket && <ChatWindow socket={socket} userDetails={userDetails} />}
        </div>
      </div>

      <div>
        <CallSettingsBar
          streamSettings={streamSettings}
          disableMicrophone={disableMicrophone}
          enableMicrophone={enableMicrophone}
          disableCamera={disableCamera}
          enableCamera={enableCamera}
        />
      </div>
    </div>
  );
}
