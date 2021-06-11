import React from "react";
import classes from "../index.module.scss";
import { Container, Paper, Typography } from "@material-ui/core";
import { Chart } from "react-google-charts";

const HistorySection = () => {
  return (
    <Paper style={{ marginTop: "2rem" }}>
      <Container>
        <Typography variant="h3">History</Typography>
        <div className={classes["history-cards-list"]}>
          {[1, 2, 3, 4, 5, 6].map((val) => (
            <div className={classes["history-card"]}>
              <Typography>{`${new Date().toUTCString()}---${val}`}</Typography>
            </div>
          ))}
        </div>
      </Container>
      <Container>
        <Chart
          width={600}
          height={"300px"}
          chartType="Sankey"
          loader={<div>Loading Chart</div>}
          data={[
            ["From", "To", "Weight"],
            ["Sad", "X", 5],
            ["Confused", "Y", 7],
            ["A", "Z", 6],
            ["B", "X", 2],
            ["B", "Y", 9],
            ["B", "Z", 4],
          ]}
          rootProps={{ "data-testid": "1" }}
        />
      </Container>
    </Paper>
  );
};

export default HistorySection;
