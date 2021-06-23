import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { CreateConferenceForm } from "./forms/createConferenceForm";
import { useHistory } from "react-router";

export const CreateConferenceFab = (props: any) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values: any) => {
    return fetch("/api/conference", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.conference) throw new Error("Could not schedule conference");
        history.go(0);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  return (
    <div
      style={{
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
      }}
    >
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Schedule a conference</DialogTitle>
        <DialogContent>
          <CreateConferenceForm
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
