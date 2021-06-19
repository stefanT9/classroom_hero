import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";

import React from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
});

interface SelectUsernameModalProps {
  softLogin: (email: string) => Promise<any>;
  open: boolean;
}
const SelectUsernameModal = (props: SelectUsernameModalProps) => {
  const { softLogin, open } = props;
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // TODO: get this xvalues from servers
      if (softLogin) {
        softLogin(formik.values.username);
      } else {
        console.error("something went wrong with auth context");
      }
    },
  });

  return (
    <Dialog open={open}>
      <DialogTitle>Please tell us about you before joining</DialogTitle>
      <DialogContent>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="username"
            name="username"
            label="username"
            variant="outlined"
            onChange={formik.handleChange}
          ></TextField>
          <TextField
            id="email"
            name="email"
            label="email"
            variant="outlined"
            onChange={formik.handleChange}
          ></TextField>
          <Button
            disabled={formik.isSubmitting || !formik.isValid}
            variant="contained"
            color="primary"
            type="submit"
          >
            Join
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SelectUsernameModal;
