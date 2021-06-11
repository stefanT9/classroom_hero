import React, { useLayoutEffect } from "react";
import { Paper } from "@material-ui/core";
import { Chart } from "react-google-charts";

const SentimentHexagonSection = () => {
  const getSentimentHexagonForDate = (date?: Date) => {
    const data = {
      axes: [
        { axis: "joy", value: 0.5 },
        { axis: "anger", value: 0.5 },
        { axis: "absent", value: 0.5 },
        { axis: "sorrow", value: 0.5 },
        { axis: "frustration", value: 0.5 },
      ],
    };
    return data;
  };

  useLayoutEffect(() => {
    const data = getSentimentHexagonForDate();
  }, []);
  return (
    <Paper>
      <Chart chartType="DonutChart" />
    </Paper>
  );
};

export default SentimentHexagonSection;
