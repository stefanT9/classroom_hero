type UserDetails = {
  token: string | null;
  id: string | null;
  username: string | null;
};

type Message = {
  userId: String;
  username: String;
  message: String;
  dateTime: Date;
};

interface IConference {
  _id: string;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  participantEmails: string[];
  hostId: Types.ObjectId;
}

interface IConferenceMetadata {
  username: string;
  userId: string;
  timestamp: Date;
  conferenceRoom: string;
  type: "absent" | "emotions" | "message";
  metadata: {
    joy?: GoogleVisionLikelihood;
    anger?: GoogleVisionLikelihood;
    sorrow?: GoogleVisionLikelihood;
    surprise?: GoogleVisionLikelihood;
    absent?: Boolean;
    message?: string;
  };
}

interface UserMetadata {
  userId: string;
  metadata: Array<IConferenceMetadata>;
}

type GoogleVisionLikelihood =
  | "UNKNOWN"
  | "VERY_UNLIKELY"
  | "UNLIKELY"
  | "POSSIBLE"
  | "LIKELY"
  | "VERY_LIKELY";
