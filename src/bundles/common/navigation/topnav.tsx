import React, { useState } from "react";
import classes from "../common.module.scss";
import { Button, Typography, Container } from "@material-ui/core";
import ProfileChip from "./profileChip";
import { useHistory } from "react-router-dom";

interface TopnavProps {
  userDetails: UserDetails;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
  isAuth: () => boolean;
}
export default function Topnav(props: TopnavProps) {
  const history = useHistory();
  const { userDetails, isAuth, login, register, logout } = props;
  console.log(isAuth(), userDetails);
  return (
    <div className={classes["topnav-wrapper"]}>
      <Container>
        <div className={classes["topnav"]}>
          <div>
            <Button
              onClick={() => {
                history.push("/");
              }}
            >
              <Typography className={classes["white-text"]}>
                Classroom Hero
              </Typography>
            </Button>
          </div>
          {isAuth() && (
            <ProfileChip userDetails={userDetails} logout={logout} />
          )}
          {!isAuth() && (
            <div>
              <Button
                onClick={() => {
                  history.push("/login");
                }}
              >
                <Typography className={classes["white-text"]}>Login</Typography>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
