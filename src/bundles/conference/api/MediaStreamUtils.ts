export default class MediaStreamSingleton {
  private static instance: Promise<MediaStream> | null = null;
  public static getInstance = () => {
    if (MediaStreamSingleton.instance) {
      return MediaStreamSingleton.instance;
    } else {
      MediaStreamSingleton.instance = navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      return MediaStreamSingleton.instance;
    }
  };
  public static linkToVideoTag = () => {
    if (MediaStreamSingleton.instance) {
      MediaStreamSingleton.instance
        .then((value) => {
          const videoElement = document.getElementById("my-video-tag");
          console.log("here i am nigrio");
          if (videoElement instanceof HTMLVideoElement) {
            console.log("here i am nigger");
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
          console.log("here i am negros", value.getTracks());
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
