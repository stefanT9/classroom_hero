import React from "react";
import { Card, Typography } from "@material-ui/core";

export const MetadataCard = ({
  metadata,
}: {
  metadata: IConferenceMetadata;
}) => {
  console.log("card details =>", metadata);
  if (metadata.type === "absent") {
    return (
      <Card>
        <Typography>at: {metadata.timestamp} wasn't present</Typography>
      </Card>
    );
  } else if (metadata.type === "emotions") {
    return (
      <Card>
        <Typography>at: {metadata.timestamp}</Typography>
        <Typography>anger: {metadata.metadata?.anger}</Typography>
        <Typography>joyful: {metadata.metadata?.joy}</Typography>
        <Typography>sorrwful: {metadata.metadata?.sorrow}</Typography>
        <Typography>surprised: {metadata.metadata?.surprise}</Typography>
      </Card>
    );
  } else if (metadata.type === "message") {
    return (
      <Card>
        <Typography>at: {metadata.timestamp}</Typography>
        <Typography>sent message: {metadata.metadata?.message}</Typography>
      </Card>
    );
  }
  return <>unknown metadata type {metadata.type}</>;
};
