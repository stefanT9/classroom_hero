import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Typography,
  Button,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
} from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { AuthContext } from "../../../context/authContext";

interface IParticipant {
  email: string;
}
interface ICreateConferenceBody {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  participantEmails: Array<string>;
}
interface ICReateConferenceProps {
  onSubmit: (body: ICreateConferenceBody) => Promise<any>;
  onCancel: () => any;
}
export const CreateConferenceForm = ({
  onSubmit,
  onCancel,
}: ICReateConferenceProps) => {
  const [participants, setParticipants] = useState<Array<IParticipant>>([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startTime: new Date(),
      endTime: new Date(),
    },
    onSubmit: (values) => {
      console.log(values);
      onSubmit({
        ...values,
        participantEmails: participants.map((participant) => participant.email),
      })
        .then((res) => {
          console.log(res);
          onCancel();
        })
        .catch((err) => {
          alert("could not schedule conference");
        });
    },
  });
  const addParticipantFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: () => {},
  });
  const addParticipant = (participant: IParticipant) => {
    setParticipants([...participants, participant]);
  };
  const removeParticipantByEmail = (email: string) => {
    setParticipants(participants.filter((val) => val.email !== email));
  };
  const handleAddParticipant = () => {
    addParticipant({ email: addParticipantFormik.values.email });
    addParticipantFormik.resetForm();
  };
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <section style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">Details</Typography>
            <TextField
              name="name"
              label="conference name"
              onChange={formik.handleChange}
            />
            <TextField
              name="description"
              label="conference description"
              onChange={formik.handleChange}
            />
          </section>
          <Divider />
          <section>
            <Typography variant="h6">From</Typography>
            <KeyboardDatePicker
              disablePast={true}
              margin="normal"
              label="date"
              views={["year", "month", "date"]}
              value={formik.values.startTime}
              format="dd/MM/yyyy"
              onChange={(val) => {
                formik.setFieldValue("startTime", val);
                if (val && formik.values.endTime < val) {
                  formik.setFieldValue("endTime", val);
                }
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              ampm={false}
              margin="normal"
              label="time"
              value={formik.values.startTime}
              onChange={(val) => {
                formik.setFieldValue("startTime", val);
                if (val && formik.values.endTime < val) {
                  formik.setFieldValue("endTime", val);
                }
              }}
            />
          </section>
          <Divider />
          <section>
            <Typography variant="h6">Until</Typography>
            <KeyboardDatePicker
              disablePast={true}
              margin="normal"
              label="date"
              views={["year", "month", "date"]}
              value={formik.values.endTime}
              format="dd/MM/yyyy"
              onChange={(val) => {
                formik.setFieldValue("endTime", val);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              ampm={false}
              margin="normal"
              label="time"
              value={formik.values.endTime}
              onChange={(val) => {
                formik.setFieldValue("endTime", val);
              }}
            />
          </section>
          <Divider />
          <section style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">Participants</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                {participants.map((val, idx) => (
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">{val.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <Button
                          onClick={() => removeParticipantByEmail(val.email)}
                        >
                          Remove
                        </Button>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </TableContainer>

            <TextField
              name="email"
              label="email"
              value={addParticipantFormik.values.email}
              onChange={addParticipantFormik.handleChange}
            />
            <Button onClick={handleAddParticipant}>+</Button>
          </section>
          <Divider />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button color="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button color="primary" type={"submit"}>
                Submit
              </Button>
            </div>
          </section>
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );
};
