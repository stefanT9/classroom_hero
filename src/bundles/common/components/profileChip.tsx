import { Button, Typography, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";

interface ProfileChipProps {
  userDetails: UserDetails;
  logout: () => void;
}
const ProfileChip = (props: ProfileChipProps) => {
  const { userDetails, logout } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={handleOpen}>
        <Typography>{userDetails.username}</Typography>
      </Button>
      <Menu open={open}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
export default ProfileChip;
