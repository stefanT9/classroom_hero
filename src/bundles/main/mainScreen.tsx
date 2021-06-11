import React from "react";
import "fontsource-roboto";
import Topnav from "../common/navigation/topnav";
import { makeStyles } from "@material-ui/core";
import { AuthContext } from "../../context/authContext";

import MainScreenLogin from "./mainScreenLogin";
import MainScreenDashboard from "./mainScreenDashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto auto",
    width: "100vw",
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function MainScreen() {
  const classes = useStyles();

  return (
    <AuthContext.Consumer>
      {({ isAuth, userDetails, login }) => (
        <main style={{ width: "100%", height: "100%" }}>
          {userDetails && isAuth && isAuth() && (
            <MainScreenDashboard userDetails={userDetails} />
          )}
          {isAuth && !isAuth() && <MainScreenLogin />}
        </main>
      )}
    </AuthContext.Consumer>
  );
}
