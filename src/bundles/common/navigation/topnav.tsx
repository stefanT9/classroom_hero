import React, { useState } from "react";
import classes from "../common.module.scss";
import { Grid, Button, Typography, Container } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AuthModal from "../../auth/authModal";
import ProfileChip from "./profileChip";

interface TopnavProps {
  userDetails: UserDetails;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
  isAuth: () => boolean;
}
export default function Topnav(props: TopnavProps) {
  const { userDetails, isAuth, login, register, logout } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(isAuth(), userDetails);
  return (
    <Grid item xs={12}>
      <div className={classes["topnav-wrapper"]}>
        <Container>
          <div className={classes["topnav"]}>
            <Button>
              <MenuIcon className={classes["white-text"]} />
            </Button>
            {isAuth() && (
              <ProfileChip userDetails={userDetails} logout={logout} />
            )}
            {!isAuth() && (
              <div>
                <Button onClick={handleOpen}>
                  <Typography className={classes["white-text"]}>
                    Login
                  </Typography>
                </Button>
                <AuthModal
                  onClose={handleClose}
                  open={open}
                  formType={"Login"}
                />
              </div>
            )}
          </div>
        </Container>
      </div>
    </Grid>
  );
}
