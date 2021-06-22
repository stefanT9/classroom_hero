import Peer from "peerjs";
import socketIOClient from "socket.io-client";
import MediaStreamSingleton from "./MediaStreamUtils";
const mediaStream = MediaStreamSingleton.getInstance();

export const getPeer = (userDetails: UserDetails) => {
  const changeMediaStream = () => {};

  // if (userDetails.id === null) {
  //   throw new Error("kill me pls");
  // }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const host = 'localhost' || "projects.zicar.info"
  const myPeer = new Peer();
  // , {
  //   host: "localhost",
  //   port: 9001,
  //   path: "/signaling",
  // });
  myPeer.on("connection", (connection) => {
    connection.on("data", (message) => {});
  });

  // myPeer.on("call", function (call) {
  //   mediaStream
  //     .then((stream) => {
  //       call.answer(stream);
  //       call.on("stream", (remoteStream) => {
  //         //
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("failed to get stream", err);
  //     });
  // });
  return { peer: myPeer, changeMediaStream };
};

export const getSocket = (
  peer: any,
  userDetails: UserDetails,
  conferenceId: String,
  setPeers: Function
) => {
  const socket = socketIOClient();
  console.log(peer);
  console.log(socket);
  peer.on("open", (id: any) => {
    console.log("something bad man");
    socket.emit("join-room", {
      id: peer.id,
      username: userDetails.username,
      room: conferenceId,
    });
    peer.on("connection", (dataconnection: any) => {
      console.log("metadata connection =>", dataconnection.metadata);
    });
    peer.on("call", (call: any) => {
      console.log("recieved call => ", call.metadata);
      console.log(call.metadata);
      const { id, username } = call.metadata.user;

      setTimeout(() => {
        setPeers((prev: any) => [...prev, { id, username, ref: undefined }]);

        mediaStream
          .then((stream) => {
            call.answer(stream);
            call.on("stream", (remoteStream: any) => {
              const videoTag: any = document.getElementById(`video${id}`);
              try {
                console.log("added element to stream");
                videoTag.srcObject = remoteStream;
              } catch (err) {
                console.log(err);
              }
            });
            call.on("close", (stream: any) => {
              setPeers((prev: any) => prev.filter((val: any) => val.id !== id));
              call.close();
            });
            call.on("error", (err: any) => {
              setPeers((prev: any) => prev.filter((val: any) => val.id !== id));
              call.close();
            });
          })
          .catch((err) => {
            console.log("failed to get stream", err);
          });
      }, 0);
    });
    //todo fix this type
    socket.on("message", (data: any) => {
      console.log(data);
    });
    socket.on("user-joined", ({ user }: { user: any }) => {
      const { id, username, room } = user;
      setPeers((prev: any) => [...prev, { id, username, ref: undefined }]);
      mediaStream.then((stream) => {
        const peerCall = peer.call(id, stream, {
          metadata: {
            user: {
              id: peer.id,
              username: userDetails.username,
            },
          },
        });
        peerCall.on("stream", (remoteStream: any) => {
          const videoTag: any = document.getElementById(`video${user.id}`);
          try {
            console.log("added element to stream");
            videoTag.srcObject = remoteStream;
          } catch (err) {
            console.log(err);
          }
        });
        peerCall.on("close", (stream: any) => {
          peerCall.close();
        });
        peerCall.on("error", (err: any) => {
          peerCall.close();
        });
      });
    });
    // todo: fix this type
    // socket.on("room-users", ({ users }: any) => {
    //   setPeers(
    //     users
    //       .filter((user: any) => user.id !== id)
    //       .map((user: any) => ({
    //         id: user.id,
    //         username: user.username,
    //         ref: undefined,
    //       }))
    //   );
    //   users
    //     .filter((user: any) => user.id !== id)
    //     .forEach((user: any) => {
    //       const peerDataConnection = peer.connect(user.id);

    //       peerDataConnection.on("open", () => {
    //         peerDataConnection.send("im in");
    //       });

    //       mediaStream
    //         .then((stream) => {
    //           const peerCallConnection = peer.call(user.id, stream);
    //           peerCallConnection.on("stream", (remoteStream: any) => {
    //             // todo: fix type here
    //             const videoTag: any = document.getElementById(
    //               `video${user.id}`
    //             );
    //             try {
    //               console.log("added element to stream");
    //               videoTag.srcObject = remoteStream;
    //             } catch (err) {
    //               console.log(err);
    //             }
    //           });
    //         })
    //         .catch((err) => {
    //           console.log("error getting mediaStream", err);
    //         });
    //     });
    // });
    // socket.on("room-users-joined", ({ userId, username }: any) => {
    //   console.log("user joined", userId, username);
    //   setPeers((peers: any) => [
    //     ...peers,
    //     { id: userId, username: username, ref: undefined },
    //   ]);
    // });
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

      socket.emit("get-image-response", { img: dataUrl, user: userDetails });
      canvas.remove();
    });
  });
  return socket;
};
