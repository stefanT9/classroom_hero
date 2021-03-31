import React, { useEffect, useState, useRef } from "react";
import "fontsource-roboto";
import Peer from "peerjs";
import { Paper, Typography, makeStyles } from "@material-ui/core";

import ChatWindow from "./ChatWindow";
import { useParams } from "react-router-dom";
import CallSettingsBar from "./CallSettingsBar";
import socketIOClient, { Socket } from "socket.io-client";
import SelectUsernameModal from "./SelectUsernameModal";

import classes from "./conference.module.scss";
import { AuthContext } from "../../../context/authContext";

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

  const [peer, setPeer] = useState<Peer>();
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const mediaStream = useRef(
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  );
  useEffect(() => {
    setPeer(() => {
      const myPeer = new Peer(userDetails.id || undefined, {
        host: "localhost",
        port: 9000,
        path: "/signaling",
      });
      myPeer.on("connection", (connection) => {
        connection.on("data", (message) => {});
      });

      myPeer.on("call", function (call) {
        mediaStream.current
          .then((stream) => {
            call.answer(stream);
            call.on("stream", (remoteStream) => {
              //
            });
          })
          .catch((err) => {
            console.log("failed to get stream", err);
          });
      });
      return myPeer;
    });
  }, []);
  useEffect(() => {
    setSocket((oldSocket: SocketIOClient.Socket | undefined) => {
      if (peer === undefined) return oldSocket;

      const socket = socketIOClient();
      peer.on("open", (id) => {
        socket.emit("join-room", {
          id: userDetails.id,
          username: userDetails.username,
          room: conferenceId,
        });
        //todo fix this type
        socket.on("message", (data: any) => {
          console.log(data);
        });
        // todo: fix this type
        socket.on("room-users", ({ users }: any) => {
          setPeers(
            users
              .filter((user: any) => user.id !== id)
              .map((user: any) => ({
                id: user.id,
                username: user.username,
                ref: undefined,
              }))
          );
          users
            .filter((user: any) => user.id !== id)
            .forEach((user: any) => {
              const peerDataConnection = peer.connect(user.id);

              peerDataConnection.on("open", () => {
                peerDataConnection.send("im in");
              });

              mediaStream.current
                .then((stream) => {
                  const peerCallConnection = peer.call(user.id, stream);
                  peerCallConnection.on("stream", (remoteStream) => {
                    // todo: fix type here
                    const videoTag: any = document.getElementById(
                      `video${user.id}`
                    );

                    try {
                      videoTag.srcObject = remoteStream;
                    } catch (err) {
                      console.log(err);
                    }
                  });
                })
                .catch((err) => {
                  console.log("error getting mediaStream", err);
                });
            });
        });
        socket.on("room-users-joined", ({ userId, username }: any) => {
          setPeers((peers: any) => [
            ...peers,
            { id: userId, username: username, ref: undefined },
          ]);
        });
        socket.on("room-users-left", ({ userId }: any) => {
          setPeers((peers) => [...peers].filter((val) => val.id !== userId));
        });
      });
      return socket;
    });
  }, [peer]);

  useEffect(() => {}, []);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function disableMicrophone() {
    updateStreamSettings((stream) => ({ video: stream.video, audio: false }));
  }
  function enableMicrophone() {
    updateStreamSettings((stream) => ({ video: stream.video, audio: true }));
  }
  function disableCamera() {
    updateStreamSettings((stream) => ({ video: false, audio: stream.audio }));
  }
  function enableCamera() {
    updateStreamSettings((stream) => ({ video: true, audio: stream.audio }));
  }

  return (
    <>
      <AuthContext.Consumer>
        {({ userDetails, softLogin }) =>
          !!!userDetails.username && (
            <SelectUsernameModal open={true} softLogin={softLogin} />
          )
        }
      </AuthContext.Consumer>
      <div className={classes.body}>
        <div style={{ gridRow: 1, gridColumnStart: 1, gridColumnEnd: 3 }}>
          <Paper
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          ></Paper>
        </div>
        <Paper className={classes.mainScreen}>
          {peers.map((val, idx) => (
            <div
              className={classes.participantWrapper}
              style={{ backgroundColor: getRandomColor() }}
            >
              <video
                id={`video${val.id}`}
                className={classes.participantVideo}
                autoPlay
              />
              <Typography className={classes.participantNameTypography}>
                {val.username}
              </Typography>
            </div>
          ))}
        </Paper>
        <div style={{ gridRow: 2, gridColumn: 2, overflow: "hidden" }}>
          {socket && <ChatWindow socket={socket} userDetails={userDetails} />}
        </div>
        <div style={{ gridRow: 3, gridColumnStart: 1, gridColumnEnd: 3 }}>
          <CallSettingsBar
            streamSettings={streamSettings}
            disableMicrophone={disableMicrophone}
            enableMicrophone={enableMicrophone}
            disableCamera={disableCamera}
            enableCamera={enableCamera}
          />
        </div>
      </div>
    </>
  );
}
