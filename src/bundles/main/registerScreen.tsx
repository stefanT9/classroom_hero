import React, { useState } from "react";
import { Paper, Container } from "@material-ui/core";
import "fontsource-roboto";
import LoginForm from "../auth/loginForm";
import { AuthContext } from "../../context/authContext";
import RegisterForm from "../auth/registerForm";

export default function RegisterScreen() {
  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <AuthContext.Consumer>
          {({ register }) => register && <RegisterForm register={register} />}
        </AuthContext.Consumer>
      </Paper>
    </Container>
  );
}
