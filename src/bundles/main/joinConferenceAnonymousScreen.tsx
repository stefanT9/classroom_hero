import React, { useState } from "react";
import { Paper, Container } from "@material-ui/core";
import "fontsource-roboto";
import LoginForm from "../auth/loginForm";
import { AuthContext } from "../../context/authContext";

export default function JoinConferenceAnonymousScreen() {
  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <AuthContext.Consumer>
          {({ login }) => login && <LoginForm login={login} />}
        </AuthContext.Consumer>
      </Paper>
    </Container>
  );
}
