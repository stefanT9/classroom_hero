import classes from "./auth.module.scss";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { AlertContext } from "../../context/alertContext";
import { useHistory } from "react-router-dom";

type LoginFormInterface = {
  login: (email: string, password: string) => Promise<any>;
};
const authValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginForm = (props: LoginFormInterface) => {
  const history = useHistory();
  const { login } = props;
  const alertContext = useContext(AlertContext);
  const authFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authValidationSchema,
    onSubmit: (values) => {
      login(values.email, values.password).then((res) => {
        if (res.status === false) {
          return alertContext.openAlert(`${res.message}`, "warning");
        }
        return alertContext.openAlert(`Welcome back ${res.email}`, "success");
      });
    },
  });
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <Typography align="center" variant="h5">
        Sign in
      </Typography>
      <form className={classes.loginForm} onSubmit={authFormik.handleSubmit}>
        <TextField
          variant="outlined"
          label="email"
          name="email"
          type="email"
          value={authFormik.values.email}
          error={Boolean(authFormik.errors.email)}
          onChange={authFormik.handleChange}
        />
        <TextField
          variant="outlined"
          label="password"
          name="password"
          type="password"
          value={authFormik.values.password}
          error={Boolean(authFormik.errors.password)}
          onChange={authFormik.handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!authFormik.isValid}
          type="submit"
        >
          Login
        </Button>
        <Button
          variant="text"
          color="primary"
          disabled={!authFormik.isValid}
          onClick={() => {
            history.push("/register");
          }}
        >
          Register
        </Button>
        <Button
          variant="text"
          color="primary"
          disabled={!authFormik.isValid}
          onClick={() => {
            history.push("/forgot-password");
          }}
        >
          Forgot password
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
