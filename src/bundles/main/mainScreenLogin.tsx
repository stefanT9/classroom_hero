import React from "react";
import { useHistory } from "react-router-dom";

import { Grid, Button, TextField } from "@material-ui/core";
import "fontsource-roboto";
import { useFormik } from "formik";
import * as yup from "yup";
import LoginForm from "../auth/loginForm";

const joinConferenceValidationSchema = yup.object({
  conferenceId: yup.string().required(),
});

const authValidationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});
interface MainScreenLoginProps {
  login(email: string, password: string): Promise<any>;
}
export default function MainScreenLogin(props: MainScreenLoginProps) {
  const { login } = props;
  const history = useHistory();
  const joinConferenceFormik = useFormik({
    initialValues: {
      conferenceId: "",
    },
    validationSchema: joinConferenceValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      history.push(`/conference/${values.conferenceId}`);
    },
  });
  const authFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authValidationSchema,
    onSubmit: (values) => {
      login(values.email, values.password);
      console.log(values);
    },
  });

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={3}>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={joinConferenceFormik.handleSubmit}
        >
          <TextField
            id="conferenceId"
            name="conferenceId"
            value={joinConferenceFormik.values.conferenceId}
            onChange={joinConferenceFormik.handleChange}
          />
          <Button type="submit" disabled={joinConferenceFormik.isSubmitting}>
            join conference
          </Button>
        </form>
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={3}>
        <LoginForm login={login} />
      </Grid>
    </Grid>
  );
}
