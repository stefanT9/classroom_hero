import React from "react";
import classes from "../index.module.scss";
import { Container, Paper, Typography } from "@material-ui/core";
import { Chart } from "react-google-charts";
import { randomInt } from "d3";

interface ITransitionSection {
  conferenceMetadata: Array<IConferenceMetadata>;
}
const TransitionsSection = (props: ITransitionSection) => {
  const { conferenceMetadata } = props;
  const getData = (from?: Date, until?: Date) => {
    const data: any[] = [["From", "To", "Count"]];
    const emotions = [
      "Absent",
      "Joyful",
      "Angry",
      "Sorrowful",
      "Surprised",
      "Confused",
      "Furstrated",
    ];
    const mat = [{ x: -1, y: -1 }];
    for (let idx = 0; idx < randomInt(20)(); idx++) {
      const idx2 = randomInt(emotions.length)();
      const idx3 = randomInt(emotions.length)();
      const idx4 = randomInt(20)();
      if (!mat.find((val) => val.x === idx2 && val.y === idx3) !== undefined) {
        data.push([emotions[idx2], emotions[idx3], idx4]);
        mat.push({ x: idx2, y: idx3 });
      }
    }
    console.log(data);
    return data;
  };
  return (
    <Paper style={{ marginTop: "2rem" }}>
      <Container>
        <Typography variant="h3">Transitions</Typography>
        <Chart
          width={600}
          height={"300px"}
          chartType="Sankey"
          loader={<div>Loading Chart</div>}
          data={getData()}
          rootProps={{ "data-testid": "1" }}
        />
      </Container>
    </Paper>
  );
};

export default TransitionsSection;
