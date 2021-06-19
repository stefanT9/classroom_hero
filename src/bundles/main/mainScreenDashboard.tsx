import "fontsource-roboto";
import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { ConferenceCard } from "./components/conferenceCard";
import { CreateConferenceFab } from "../common/createConferenceFab";

interface MainScreenAuthProps {
  userDetails: UserDetails;
}

export default function MainScreenDashboard(props: MainScreenAuthProps) {
  const { userDetails } = props;
  const [conferences, setConferences] = useState<Array<IConference>>([]);

  useEffect(() => {
    fetch("/api/conference/available")
      .then((res) => res.json())
      .then((res) => {
        if (res.conferences) {
          setConferences(res.conferences);
        }
        // todo: handle on error
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log("conferences updated", conferences);
  }, [conferences]);

  return (
    <Container>
      {conferences.length !== 0 ? (
        <div>
          <Typography variant="h2">Past conferences:</Typography>
          <div>
            {conferences
              .filter(
                (conference) => new Date(conference.startTime) < new Date()
              )
              .map((conference, idx) => (
                <ConferenceCard conference={conference} />
              ))}
          </div>
          <Typography variant="h2">Future conferences:</Typography>
          <div>
            {conferences
              .filter(
                (conference) => new Date(conference.startTime) >= new Date()
              )
              .map((conference, idx) => (
                <ConferenceCard conference={conference} />
              ))}
          </div>
        </div>
      ) : (
        <Typography>You don't seem to have any conference</Typography>
      )}

      <CreateConferenceFab />
    </Container>
  );
}
