import React, { useState, useEffect } from "react";
import classes from "../index.module.scss";
import {
  Accordion,
  Container,
  Paper,
  Typography,
  Card,
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
import { DoubleEndSlider } from "./doubleEndSlider";

interface IHistorySectionProps {
  usersMetadata: Array<UserMetadata>;
  emotionMetadata: Array<IConferenceMetadata>;
  absentMetadata: Array<IConferenceMetadata>;
  messageMetadata: Array<IConferenceMetadata>;
}

const HistorySection = (props: IHistorySectionProps) => {
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

  console.log(usersMetadata);
  return (
    <Paper style={{ marginTop: "2rem" }}>
      <Container>
        <Typography variant="h3">History of users</Typography>
        <Typography>
          between {after.toLocaleDateString()} {after.toLocaleTimeString()}
        </Typography>
        <Typography>
          and {before.toLocaleDateString()} {before.toLocaleTimeString()}
        </Typography>
        <DoubleEndSlider
          left={after.getTime() / 1000}
          right={before.getTime() / 1000}
          min={minDate.getTime() / 1000}
          max={maxDate.getTime() / 1000}
          setLeft={(event: any) => {
            console.log(event.target.value);
            setAfter(new Date(event.target.value * 1000));
          }}
          setRight={(event: any) => {
            setBefore(new Date(event.target.value * 1000));
          }}
        />
        <div className={classes["history-cards-list"]}>
          {usersMetadata.map((val) => (
            <Accordion>
              <AccordionSummary>
                username: {val.metadata[0].username}
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography>Anger transitions</Typography>
                  <Chart
                    width={600}
                    height={"300px"}
                    chartType="Sankey"
                    loader={<div>Loading Chart</div>}
                    data={[["From", "To", "Weight"], ...getAngerEvolution(val)]}
                    rootProps={{ "data-testid": "1" }}
                  />
                  <Typography>Sorrow transitions</Typography>
                  <Chart
                    width={600}
                    height={"300px"}
                    chartType="Sankey"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["From", "To", "Weight"],
                      ...getSorrowEvolution(val),
                    ]}
                    rootProps={{ "data-testid": "1" }}
                  />
                  <Typography>Surprise transitions</Typography>
                  <Chart
                    width={600}
                    height={"300px"}
                    chartType="Sankey"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["From", "To", "Weight"],
                      ...getSurpriseEvolution(val),
                    ]}
                    rootProps={{ "data-testid": "1" }}
                  />
                  <Typography>Joy transitions</Typography>
                  <Chart
                    options={{ title: "joy transitions" }}
                    width={600}
                    height={"300px"}
                    chartType="Sankey"
                    loader={<div>Loading Chart</div>}
                    data={[["From", "To", "Weight"], ...getJoyEvolution(val)]}
                    rootProps={{ "data-testid": "1" }}
                  />
                  <Typography>Absent transitions</Typography>
                  <Chart
                    width={600}
                    height={"300px"}
                    chartType="Sankey"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["From", "To", "Weight"],
                      ...getAbsentEvolution(val),
                    ]}
                    rootProps={{ "data-testid": "1" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    {val.metadata.map((metadata) => (
                      <MetadataCard metadata={metadata} />
                    ))}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Container>
    </Paper>
  );
};

export default HistorySection;
