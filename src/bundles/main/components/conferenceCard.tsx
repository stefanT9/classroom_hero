import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
interface ConferenceCardProps {
  conference: IConference;
}

export const ConferenceCard = (props: ConferenceCardProps) => {
  const { conference } = props;
  const startTime: any = conference.startTime;
  const endTime: any = conference.endTime;
  const history = useHistory();
  const handleJoinConference = () => {
    history.push(`/conference/${conference._id}`);
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">{conference.name}</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Typography variant="h6">
            Description: {conference.description}
          </Typography>
          <Typography variant="h6">
            From {startTime.replace(/T/, " ").replace(/\..+/, "")}
          </Typography>
          <Typography variant="h6">
            Until {endTime && endTime.replace(/T/, " ").replace(/\..+/, "")}
          </Typography>
          <Accordion style={{ width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{`${conference.participantEmails.length} other participants invited`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {conference.participantEmails.map((email) => (
                  <Typography>{email}</Typography>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <Button
            color="primary"
            variant="contained"
            onClick={handleJoinConference}
          >
            Join now
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              history.push(`/conference/${conference._id}/stats`);
            }}
          >
            See the stats
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
