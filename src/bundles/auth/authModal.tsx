import {
  Dialog,
  DialogProps,
  Paper,
  DialogTitle,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import LoginForm from "./loginForm";
import { AuthContext } from "../../context/authContext";
import classes from "./auth.module.scss";
import ResetPasswordForm from "./resetPasswordForm";
import RegisterForm from "./registerForm";

const LoginModal = (
  props: DialogProps & { formType: "Login" | "Register" | "ResetPassword" }
) => {
  const [formType, setFormType] = useState<
    "Login" | "Register" | "ResetPassword"
  >(props.formType);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dialogProps: DialogProps = props;

  const handleChangeToLogin = () => {
    setIsLoading(true);
    setFormType("Login");
    setIsLoading(false);
  };
  const handleChangeToResetPassword = () => {
    setIsLoading(true);
    setFormType("ResetPassword");
    setIsLoading(false);
  };
  const handleChangeToRegister = () => {
    setIsLoading(true);
    setFormType("Register");

    setIsLoading(false);
  };
  return (
    <AuthContext.Consumer>
      {({ login }) =>
        login && (
          <Dialog
            fullWidth={true}
            maxWidth="xs"
            scroll={"paper"}
            {...dialogProps}
          >
            <Paper className={classes.dialogTopnav}>
              <DialogTitle>{formType}</DialogTitle>
            </Paper>
            {formType === "Login" && <LoginForm login={login} />}
            {formType === "Register" && <RegisterForm />}
            {formType === "ResetPassword" && <ResetPasswordForm />}
            <div style={{ height: "2rem" }} />
            {formType !== "Login" && (
              <Button onClick={handleChangeToLogin}>Sign in</Button>
            )}
            {formType !== "ResetPassword" && (
              <Button onClick={handleChangeToResetPassword}>
                Forgot password?
              </Button>
            )}
            {formType !== "Register" && (
              <Button onClick={handleChangeToRegister}>
                Don't have an account? Sign up !
              </Button>
            )}
          </Dialog>
        )
      }
    </AuthContext.Consumer>
  );
};

export default LoginModal;
