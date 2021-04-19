import React from "react";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export const CreateConferenceForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      date: "18/03/1999",
    },
    onSubmit: () => {},
  });
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            name="name"
            label="conference name"
            onChange={formik.handleChange}
          />

          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            views={["year", "month", "date"]}
            value={formik.values.date}
            format="dd/MM/yyyy"
            onChange={formik.handleChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />

          {/* <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            value={formik.values.date}
            onChange={formik.handleChange}
          /> */}
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );
};
