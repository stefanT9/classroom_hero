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
  const history = useHistory();
  const handleJoinConference = () => {
    history.push(`/conference/${conference._id}`);
  };
  return (
    <div>
      <Typography>{conference.startTime}</Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>{conference.name}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
          <Typography>{conference.startTime}</Typography>
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
            variant="outlined"
            classes={{ root: "primary-button" }}
            onClick={handleJoinConference}
          >
            Join now
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
