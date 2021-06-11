import React, { useState, useEffect } from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import HistorySection from "../components/historySection";
import TimelineSection from "../components/timelineSection";
import TransitionsSection from "../components/transitionsSection";

const ConferenceStatisticsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [conference, setConferenc] = useState<IConference>();
  const [conferenceMetadata, setConferenceMetadata] =
    useState<IConferenceMetadata>();

  return (
    <Container>
      <Paper style={{ marginTop: "2rem" }}>
        {!isLoading && <Typography variant="h2">conference name</Typography>}
        {isLoading && <CircularProgress />}
      </Paper>
      <HistorySection />
      <TimelineSection />
      <TransitionsSection />
    </Container>
  );
};

export default ConferenceStatisticsScreen;
