import React, { useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import classes from "./common.module.scss";
import AuthModal from "../../auth/authModal";
interface TopnavProps {
  userDetails: UserDetails;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
  isAuth: () => boolean;
}
export default function Topnav(props: TopnavProps) {
  const { userDetails, isAuth, login, register } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid item xs={12}>
      <div style={{ backgroundColor: "gray", height: "auto" }}>
        <Grid container>
          <div className={classes.topnav}>
            <Button>
              <MenuIcon />
            </Button>
            {!isAuth() && (
              <div>
                <Button onClick={handleOpen}>
                  <Typography>Login</Typography>
                </Button>
                <AuthModal
                  onClose={handleClose}
                  open={open}
                  formType={"Login"}
                />
              </div>
            )}
          </div>
        </Grid>
      </div>
    </Grid>
  );
}
