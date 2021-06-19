export default class MediaStreamSingleton {
  private static instance: Promise<MediaStream> | null = null;
  public static getInstance = () => {
    if (MediaStreamSingleton.instance) {
      return MediaStreamSingleton.instance;
    } else {
      return navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const cam = devices.find((device) => {
            return device.kind === "videoinput";
          });
          const mic = devices.find((device) => {
            return device.kind === "audioinput";
          });
          const constraints = {
            video: cam && true,
            audio: mic && true,
          };
          MediaStreamSingleton.instance =
            navigator.mediaDevices.getUserMedia(constraints);
          return MediaStreamSingleton.instance;
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  };
  public static linkToVideoTag = () => {
    if (MediaStreamSingleton.instance) {
      MediaStreamSingleton.instance
        .then((value) => {
          const videoElement = document.getElementById("my-video-tag");
          if (videoElement instanceof HTMLVideoElement) {
            videoElement.srcObject = value;
          }
        })
        .catch((err) => {});
    }
  };
  public static mute = () => {
    if (MediaStreamSingleton.instance) {
      MediaStreamSingleton.instance
        .then((value) => {
          value.getAudioTracks()[0].enabled = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  public static unMute = () => {
    if (MediaStreamSingleton.instance) {
      MediaStreamSingleton.instance
        .then((value) => {
          value.getAudioTracks()[0].enabled = true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  public static openCamera = () => {
    console.log("openining camera");
    if (MediaStreamSingleton.instance) {
      MediaStreamSingleton.instance
        .then((value) => {
          value.getVideoTracks()[0].enabled = true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  public static closeCamera = () => {
    console.log("closing camera");

    if (MediaStreamSingleton.instance) {
      MediaStreamSingleton.instance
        .then((value) => {
          console.log(value.getTracks());
          value.getVideoTracks()[0].enabled = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}
