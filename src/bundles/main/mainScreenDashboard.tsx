import "fontsource-roboto";
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { ConferenceCard } from "./components/conferenceCard";
import { CreateConferenceFab } from "../common/createConferenceFab";

interface MainScreenAuthProps {
  userDetails: UserDetails;
}

export default function MainScreenDashboard(props: MainScreenAuthProps) {
  const { userDetails } = props;
  const [conferences, setConferences] = useState<Array<IConference>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fabRef: any = useRef(null);

  useEffect(() => {
    fetch("/api/conference/available")
      .then((res) => res.json())
      .then((res) => {
        if (res.conferences) {
          setConferences(res.conferences);
        }
        // todo: handle on error
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    console.log("conferences updated", conferences);
  }, [conferences]);

  return (
    <Container>
      {(() => {
        if (isLoading) {
          return (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <CircularProgress size="5rem" />
            </div>
          );
        }
        if (conferences.length !== 0)
          return (
            <div>
              <Typography variant="h2">Past conferences:</Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {conferences
                  .filter(
                    (conference) => new Date(conference.startTime) < new Date()
                  )
                  .map((conference, idx) => (
                    <ConferenceCard conference={conference} />
                  ))}
              </div>
              <Typography variant="h2">Future conferences:</Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {conferences
                  .filter(
                    (conference) => new Date(conference.startTime) >= new Date()
                  )
                  .map((conference, idx) => (
                    <ConferenceCard conference={conference} />
                  ))}
              </div>
            </div>
          );
        else {
          return (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography variant="h4" align="center">
                I haven't found any conference, maybe you should create one
              </Typography>
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => {
                  try {
                    fabRef.current.children[0].children[0].click();
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                <Typography variant="h5">Create conference</Typography>
              </Button>
            </div>
          );
        }
      })()}
      <div ref={fabRef}>
        <CreateConferenceFab />
      </div>
    </Container>
  );
}
