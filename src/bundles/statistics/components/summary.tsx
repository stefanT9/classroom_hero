import React, { useState, useEffect } from "react";
import classes from "../index.module.scss";
import {
  Accordion,
  Container,
  Paper,
  Typography,
  Card,
  Grid,
} from "@material-ui/core";
import { Chart } from "react-google-charts";

import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {
  getAngerEvolution,
  getSurpriseEvolution,
  getSorrowEvolution,
  getAbsentEvolution,
  getJoyEvolution,
} from "./utils";
import { MetadataCard } from "./metadataCard";
import { PieChart } from "@material-ui/icons";

interface IHistorySectionProps {
  usersMetadata: Array<UserMetadata>;
  emotionMetadata: Array<IConferenceMetadata>;
  absentMetadata: Array<IConferenceMetadata>;
  messageMetadata: Array<IConferenceMetadata>;
}

const SORROW = "sorrow";
const ANGER = "anger";
const JOY = "joy";
const SURPRISE = "surprise";
const NEUTRAL = "neutral";

const SummarySection = (props: IHistorySectionProps) => {
  const { usersMetadata } = props;
  const getMinMaxDates = () => {
    let minDate = new Date(usersMetadata[0].metadata[0].timestamp);
    let maxDate = new Date(usersMetadata[0].metadata[0].timestamp);
    usersMetadata.forEach((userMetadata) => {
      userMetadata.metadata.forEach((metadata) => {
        const date = new Date(metadata.timestamp);
        if (minDate.getTime() > date.getTime()) {
          minDate = date;
        }
        if (maxDate.getTime() < date.getTime()) {
          maxDate = date;
        }
      });
    });
    return { minDate, maxDate };
  };
  const [usedUsersMetadata, setUsedUserMetadata] = useState(usersMetadata);
  const { minDate, maxDate } = getMinMaxDates();
  const [before, setBefore] = useState<Date>(maxDate);
  const [after, setAfter] = useState<Date>(minDate);

  let emotionValues: Array<any> = [ANGER, SORROW, JOY, SURPRISE, NEUTRAL];
  const emotionsCount: any = {
    anger: 0,
    sorrow: 0,
    joy: 0,
    surprise: 0,
    neutral: 0,
  };

  let sorrowValues: Array<any> = [];
  const sorrowCounts: any = {};

  let joyValues: Array<any> = [];
  const joyCounts: any = {};

  let angerValues: Array<any> = [];
  const angerCounts: any = {};

  let surpriseValues: Array<any> = [];
  const surpriseCounts: any = {};

  props.emotionMetadata.forEach((emotion) => {
    let flag = false;
    if (
      emotion.metadata.sorrow &&
      emotion.metadata.sorrow !== "VERY_UNLIKELY"
    ) {
      if (emotion.metadata.sorrow !== "UNLIKELY") {
        if (!emotionsCount[SORROW]) {
          emotionsCount[SORROW] = 0;
        }
        emotionsCount[SORROW] += 1;
        flag = true;
      }
      if (sorrowCounts[emotion.metadata.sorrow]) {
        sorrowCounts[emotion.metadata.sorrow] += 1;
      } else {
        sorrowValues.push(emotion.metadata.sorrow);
        sorrowCounts[emotion.metadata.sorrow] = 1;
        flag = true;
      }
    }
    if (emotion.metadata.joy && emotion.metadata.joy !== "VERY_UNLIKELY") {
      if (emotion.metadata.joy !== "UNLIKELY") {
        if (!emotionsCount[JOY]) {
          emotionsCount[JOY] = 0;
        }
        emotionsCount[JOY] += 1;
        flag = true;
      }
      if (joyCounts[emotion.metadata.joy]) {
        joyCounts[emotion.metadata.joy] += 1;
      } else {
        joyValues.push(emotion.metadata.joy);
        joyCounts[emotion.metadata.joy] = 1;
      }
    }
    if (emotion.metadata.anger && emotion.metadata.anger !== "VERY_UNLIKELY") {
      if (emotion.metadata.anger !== "UNLIKELY") {
        if (!emotionsCount[ANGER]) {
          emotionsCount[ANGER] = 0;
        }
        emotionsCount[ANGER] += 1;
        flag = true;
      }
      if (angerCounts[emotion.metadata.anger]) {
        angerCounts[emotion.metadata.anger] += 1;
      } else {
        angerValues.push(emotion.metadata.anger);
        angerCounts[emotion.metadata.anger] = 1;
      }
    }
    if (
      emotion.metadata.surprise &&
      emotion.metadata.surprise !== "VERY_UNLIKELY"
    ) {
      if (emotion.metadata.surprise !== "UNLIKELY") {
        if (!emotionsCount[SURPRISE]) {
          emotionsCount[SURPRISE] = 0;
        }
        emotionsCount[SURPRISE] += 1;
        flag = true;
      }
      if (surpriseCounts[emotion.metadata.surprise]) {
        surpriseCounts[emotion.metadata.surprise] += 1;
      } else {
        surpriseValues.push(emotion.metadata.surprise);
        surpriseCounts[emotion.metadata.surprise] = 1;
      }
    }
    if (flag === false) {
      emotionsCount[NEUTRAL] += 1;
    }
  });
  sorrowValues = sorrowValues.map((value) => [value, sorrowCounts[value]]);
  joyValues = joyValues.map((value) => [value, joyCounts[value]]);
  angerValues = angerValues.map((value) => [value, angerCounts[value]]);
  surpriseValues = surpriseValues.map((value) => [
    value,
    surpriseCounts[value],
  ]);
  emotionValues = emotionValues.map((value) => [value, emotionsCount[value]]);

  console.log(emotionValues);
  return (
    <div>
      <Paper style={{ marginTop: "2rem" }}>
        <Container>
          <Typography variant="h3">Overall summary</Typography>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Chart
              options={{
                title: "Overall emotions",
              }}
              chartType="PieChart"
              data={[["Task", "Hours per Day"], ...emotionValues]}
            />
          </div>
        </Container>
      </Paper>
      <Paper style={{ marginTop: "2rem" }}>
        <Container>
          <Typography variant="h3">Sumary per emotion</Typography>
          <Grid container>
            <Grid
              style={{ display: "flex", justifyContent: "center" }}
              item
              xs={6}
              alignContent="center"
              alignItems="center"
            >
              {angerValues.length === 0 ? (
                <Typography>
                  Not enough relevent data to display anger summary
                </Typography>
              ) : (
                <Chart
                  options={{
                    title: "Anger levels",
                  }}
                  chartType="PieChart"
                  data={[["Task", "Hours per Day"], ...angerValues]}
                />
              )}
            </Grid>
            <Grid
              style={{ display: "flex", justifyContent: "center" }}
              item
              xs={6}
              alignContent="center"
              alignItems="center"
            >
              {surpriseValues.length === 0 ? (
                <Typography>
                  Not enough relevent data to display surprise summary
                </Typography>
              ) : (
                <Chart
                  options={{
                    title: "Surprise levels",
                  }}
                  chartType="PieChart"
                  data={[["Task", "Hours per Day"], ...surpriseValues]}
                />
              )}
            </Grid>
            <Grid
              style={{ display: "flex", justifyContent: "center" }}
              item
              xs={6}
              alignContent="center"
              alignItems="center"
            >
              {sorrowValues.length === 0 ? (
                <Typography>
                  Not enough relevent data to display sorow summary
                </Typography>
              ) : (
                <Chart
                  options={{
                    title: "Sorrow levels",
                  }}
                  chartType="PieChart"
                  data={[["Task", "Hours per Day"], ...sorrowValues]}
                />
              )}
            </Grid>
            <Grid
              style={{ display: "flex", justifyContent: "center" }}
              item
              xs={6}
              alignContent="center"
              alignItems="center"
            >
              {joyValues.length === 0 ? (
                <Typography>Data is too biased</Typography>
              ) : (
                <Chart
                  options={{
                    title: "Joy levels",
                  }}
                  chartType="PieChart"
                  data={[["Task", "Hours per Day"], ...joyValues]}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};

export default SummarySection;
