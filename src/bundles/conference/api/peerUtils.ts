import Peer from "peerjs";
import socketIOClient from "socket.io-client";
import MediaStreamSingleton from "./MediaStreamUtils";
const mediaStream = MediaStreamSingleton.getInstance();

export const getPeer = (userDetails: UserDetails) => {
  const changeMediaStream = () => {};

  if (userDetails.id === null) {
    throw new Error("kill me pls");
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const host = 'localhost' || "projects.zicar.info"
  const myPeer = new Peer(userDetails.id, {
    host: "projects.zicar.info",
    port: 9000,
    path: "/signaling",
  });
  myPeer.on("connection", (connection) => {
    connection.on("data", (message) => {});
  });

  myPeer.on("call", function (call) {
    mediaStream
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
  return { peer: myPeer, changeMediaStream };
};

export const getSocket = (
  peer: any,
  userDetails: UserDetails,
  conferenceId: String,
  setPeers: Function
) => {
  const socket = socketIOClient();
  peer.on("open", (id: any) => {
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

          mediaStream
            .then((stream) => {
              const peerCallConnection = peer.call(user.id, stream);
              peerCallConnection.on("stream", (remoteStream: any) => {
                // todo: fix type here
                const videoTag: any = document.getElementById(
                  `video${user.id}`
                );
                try {
                  console.log("added element to stream");
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
      console.log("user joined", userId, username);
      setPeers((peers: any) => [
        ...peers,
        { id: userId, username: username, ref: undefined },
      ]);
    });
    socket.on("room-users-left", ({ userId }: any) => {
      console.log("user left", userId);
      setPeers((peers: any) => [...peers].filter((val) => val.id !== userId));
    });
    socket.on("get-image", () => {
      //todo :fix this pls
      const aux: any = document.getElementById("my-video-tag");
      const videoElement: HTMLVideoElement = aux;

      const canvas = document.createElement("canvas");
      canvas.height = 1000;
      canvas.width = 1000;

      canvas.getContext("2d")?.drawImage(videoElement, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");

      console.log(videoElement);
      console.log(canvas);
      // console.log(dataUrl);

      socket.emit("get-image-response", { img: dataUrl, user: userDetails });
      canvas.remove();
    });
  });
  return socket;
};
