import React from "react";
import "fontsource-roboto";
import Topnav from "../../common/components/Topnav";
import Footer from "../../common/components/Footer";
import MainScreenUnauthenticated from "./MainScreenUnauthenticated";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "1fr 6fr 3fr",
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
    <div className={classes.root}>
      <Topnav />
      <MainScreenUnauthenticated />
      <Footer />
    </div>
  );
}
