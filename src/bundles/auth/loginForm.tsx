import classes from "./auth.module.scss";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

type LoginFormTypes = {
  login: (email: string, password: string) => void;
};
const authValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginForm = (props: LoginFormTypes) => {
  const { login } = props;

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
    <Container>
      <form className={classes.loginForm} onSubmit={authFormik.handleSubmit}>
        <TextField
          label="email"
          name="email"
          type="email"
          value={authFormik.values.email}
          error={Boolean(authFormik.errors.email)}
          onChange={authFormik.handleChange}
        />
        <TextField
          label="password"
          name="password"
          type="password"
          value={authFormik.values.password}
          error={Boolean(authFormik.errors.password)}
          onChange={authFormik.handleChange}
        />
        <Button
          disabled={authFormik.isSubmitting || !authFormik.isValid}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
