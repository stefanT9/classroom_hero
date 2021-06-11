import React, { useState } from "react";
import { Paper, Container } from "@material-ui/core";
import "fontsource-roboto";
import LoginForm from "../auth/loginForm";
import { AuthContext } from "../../context/authContext";
import ResetPasswordForm from "../auth/resetPasswordForm";

export default function ForgotPaswordScreen() {
  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <AuthContext.Consumer>
          {({ resetPassword }) =>
            resetPassword && <ResetPasswordForm resetPassword={resetPassword} />
          }
        </AuthContext.Consumer>
      </Paper>
    </Container>
  );
}
