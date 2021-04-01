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
import { CloseOutlined } from "@material-ui/icons";

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
    setFormType(FormType.Login);
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
      {({ login }) => (
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          scroll={"paper"}
          {...dialogProps}
        >
          <Paper className={classes.dialogTopnav}>
            <DialogTitle>{formType}</DialogTitle>
          </Paper>
          <LoginForm login={login} />
          {formType !== "Login" && (
            <Button onClick={handleChangeToLogin}>Sign in</Button>
          )}
          {formType !== "ResetPassword" && (
            <Button onClick={handleChangeToResetPassword}>
              Resert password
            </Button>
          )}
          {formType !== "Register" && (
            <Button onClick={handleChangeToRegister}>Sign up</Button>
          )}
        </Dialog>
      )}
    </AuthContext.Consumer>
  );
};

export default LoginModal;
