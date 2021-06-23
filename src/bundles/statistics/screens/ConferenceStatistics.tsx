import React, { useState, useEffect } from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import HistorySection from "../components/historySection";
import TimelineSection from "../components/timelineSection";
import TransitionsSection from "../components/transitionsSection";
import axios from "axios";
import { useParams } from "react-router-dom";
import SummarySection from "../components/summary";

const ConferenceStatisticsScreen = () => {
  const { conferenceId } = useParams<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [conference, setConference] = useState<IConference>();
  const [conferenceMetadata, setConferenceMetadata] = useState<
    Array<IConferenceMetadata>
  >([]);
  const [usersMetadata, setUsersMetadata] = useState<Array<UserMetadata>>([]);

  useEffect(() => {
    const aux: any = {};
    const userIds: Array<string> = [];

    conferenceMetadata.forEach((value, idx) => {
      if (aux[value.userId]) {
        aux[value.userId].push(value);
      } else {
        userIds.push(value.userId);
        aux[value.userId] = [value];
      }
    });
    const newUserMetadata = userIds.map((userId) => {
      const userMetadata: UserMetadata = {
        userId,
        metadata: aux[userId],
      };
      return userMetadata;
    });
    console.log("aux =>", aux);
    setUsersMetadata(newUserMetadata);
  }, [conferenceMetadata]);

  useEffect(() => {
    axios
      .get(`/api/conference/${conferenceId}`)
      .then((res) => {
        console.log("conference =>", res);
        if (res.status === 200) {
          setConference(res.data.conference);
        }
        return res.data.conference;
      })
      .then((_conference) => {
        axios
          .get(`/api/conference/${conferenceId}/metadata`)
          .then((res) => {
            console.log("metadata =>", res);
            if (res.status === 200) {
              setConferenceMetadata(res.data.metadata);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setError("conference does not exist");
            setIsLoading(false);
          });
      })
      .catch((err) => {
        setError("conference does not exist");
      });
  }, []);

  const emotionMetadata = conferenceMetadata.filter(
    (conferenceMetadata) => conferenceMetadata.type === "emotions"
  );
  const absentMetadata = conferenceMetadata.filter(
    (conferenceMetadata) => conferenceMetadata.type === "absent"
  );
  const messageMetadata = conferenceMetadata.filter(
    (conferenceMetadata) => conferenceMetadata.type === "message"
  );

  return (
    <Container>
      <Paper style={{ marginTop: "2rem" }}>
        {!isLoading && <Typography variant="h2">{conference?.name}</Typography>}
        {isLoading && <CircularProgress />}
      </Paper>
      {(isLoading && (
        <Paper>
          <CircularProgress />
        </Paper>
      )) || (
        <div>
          <SummarySection
            usersMetadata={usersMetadata}
            emotionMetadata={emotionMetadata}
            absentMetadata={absentMetadata}
            messageMetadata={messageMetadata}
          />
          <HistorySection
            usersMetadata={usersMetadata}
            emotionMetadata={emotionMetadata}
            absentMetadata={absentMetadata}
            messageMetadata={messageMetadata}
          />
        </div>
      )}
    </Container>
  );
};

export default ConferenceStatisticsScreen;
