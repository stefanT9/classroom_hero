import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AlertContext } from "../../context/alertContext";
import { useHistory } from "react-router-dom";

interface IRegisterFormProps {
  register: (email: string, password: string) => Promise<any>;
}

const registerValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const RegisterForm = (props: IRegisterFormProps) => {
  const history = useHistory();

  const { register } = props;
  const alertContext = useContext(AlertContext);

  const formik = useFormik({
    onSubmit: () => {
      register(formik.values.email, formik.values.password)
        .then((res) => {
          if (res.message) {
            throw new Error("Could not register please try again");
          }
          console.log(res);
          alertContext.openAlert(
            "Check email for confirmation email",
            "success"
          );
          history.push("/");
        })
        .catch((err) => {
          alertContext.openAlert(err.message, "error");
        });
    },
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: registerValidationSchema,
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
        Register
      </Typography>
      <form
        style={{
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          justifyContent: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          variant="outlined"
          label="First name"
          name="firstName"
          value={formik.values.firstName}
          error={Boolean(formik.errors.firstName)}
          onChange={formik.handleChange}
        />
        <TextField
          variant="outlined"
          label="Last name"
          name="lastName"
          value={formik.values.lastName}
          error={Boolean(formik.errors.lastName)}
          onChange={formik.handleChange}
        />
        <TextField
          variant="outlined"
          label="email"
          name="email"
          type="email"
          value={formik.values.email}
          error={Boolean(formik.errors.email)}
          onChange={formik.handleChange}
        />
        <TextField
          variant="outlined"
          label="password"
          name="password"
          type="password"
          value={formik.values.password}
          error={Boolean(formik.errors.password)}
          onChange={formik.handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!formik.isValid}
          type="submit"
        >
          Register
        </Button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            color="primary"
            disabled={!formik.isValid}
            onClick={() => {
              history.push("/login");
            }}
          >
            Sign in
          </Button>

          <Button
            variant="text"
            color="primary"
            disabled={!formik.isValid}
            onClick={() => {
              history.push("/forgot-password");
            }}
          >
            Forgot password
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default RegisterForm;
