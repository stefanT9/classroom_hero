import { Button, Modal, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";

import React from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
});

interface SelectUsernameModalProps {
  softLogin: Function;
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
      softLogin(formik.values.username);
    },
  });

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
    >
      <Paper>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="username"
            name="username"
            label="username"
            onChange={formik.handleChange}
          ></TextField>
          <TextField
            id="email"
            name="email"
            label="email"
            onChange={formik.handleChange}
          ></TextField>
          <Button
            disabled={formik.isSubmitting || !formik.isValid}
            type="submit"
          >
            set name
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default SelectUsernameModal;
