import React from "react";
import "fontsource-roboto";
import Topnav from "../../common/components/Topnav";
import MainScreenUnauthenticated from "./MainScreenUnauthenticated";
import { makeStyles } from "@material-ui/core";
import { AuthContext } from "../../../context/authContext";
import { Dashboard } from "@material-ui/icons";

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
      {({ userDetails, isAuth, login, register, logout }) => (
        <div className={classes.root}>
          <Topnav
            userDetails={userDetails}
            isAuth={isAuth}
            login={login}
            logout={logout}
            register={register}
          />
          {isAuth() && <Dashboard />}
          {!isAuth() && <MainScreenUnauthenticated login={login} />}
        </div>
      )}
    </AuthContext.Consumer>
  );
}
