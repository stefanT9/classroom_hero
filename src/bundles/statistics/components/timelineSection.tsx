import React from "react";
import classes from "../index.module.scss";
import { Container, Paper, Typography } from "@material-ui/core";
import { Timeline } from "@material-ui/icons";

interface ITimelineSection {
  conferenceMetadata: Array<IConferenceMetadata>;
}
const TimelineSection = (props: ITimelineSection) => {
  const { conferenceMetadata } = props;
  return (
    <Paper style={{ marginTop: "2rem" }}>
      <Container>
        <Typography variant="h3">Timeline</Typography>
        <div className={classes["history-cards-list"]}>
          {[1, 2, 3, 4, 5, 6].map((val) => (
            <div className={classes["history-card"]}>
              <Typography>{`${new Date().toUTCString()}---${val}`}</Typography>
            </div>
          ))}
        </div>
      </Container>
    </Paper>
  );
};

export default TimelineSection;
