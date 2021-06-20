import React, { useState } from "react";
import classes from "../common.module.scss";
import { Typography, Menu, MenuItem, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface ProfileChipProps {
  userDetails: UserDetails;
  logout: () => void;
}
const ProfileChip = (props: ProfileChipProps) => {
  const history = useHistory();
  const { userDetails, logout } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
      <Button onClick={handleOpen}>
        <Typography className={classes["white-text"]}>
          {userDetails.username}
        </Typography>
      </Button>
      <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem
          onClick={() => {
            history.push("/");
          }}
        >
          <Typography>Dashboard</Typography>
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            history.push("/profile");
          }}
        >
          <Typography>Profile</Typography>
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default ProfileChip;
