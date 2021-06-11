import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AlertContext } from "../../context/alertContext";
import { useHistory } from "react-router-dom";
interface IResetPasswordFormProps {
  resetPassword: (email: string) => Promise<any>;
}
const resetPasswordValidation = yup.object({
  email: yup.string().email().required(),
});

const ResetPasswordForm = (props: IResetPasswordFormProps) => {
  const { resetPassword } = props;
  const history = useHistory();

  const alertContext = useContext(AlertContext);

  const formik = useFormik({
    onSubmit: () => {
      resetPassword(formik.values.email)
        .then((res) => {
          if (res.message) {
            throw new Error(res.message);
          }
          console.log(res);
          alertContext.openAlert(
            "Check email for password reset email",
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
    },
    validationSchema: resetPasswordValidation,
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
        Reset password
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
          label="email"
          name="email"
          type="email"
          value={formik.values.email}
          error={Boolean(formik.errors.email)}
          onChange={formik.handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!formik.isValid}
          type="submit"
        >
          Reset password
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
              history.push("/register");
            }}
          >
            Register
          </Button>
        </div>
      </form>
    </Container>
  );
};
export default ResetPasswordForm;
