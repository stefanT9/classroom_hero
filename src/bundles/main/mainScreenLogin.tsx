import React, { useContext, useState } from "react";
import { Paper, Container } from "@material-ui/core";
import "fontsource-roboto";
import LoginForm from "../auth/loginForm";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";

export default function MainScreenLogin() {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  if (authContext.isAuth && authContext.isAuth()) {
    history.push("/");
  }
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
