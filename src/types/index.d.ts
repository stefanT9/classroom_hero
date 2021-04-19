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
  startTime: Date;
  participantEmails: string[];
  hostId: Types.ObjectId;
}
