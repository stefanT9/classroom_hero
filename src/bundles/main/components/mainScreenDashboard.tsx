import React, { useState, useEffect } from "react";
import "fontsource-roboto";
import { makeStyles } from "@material-ui/core/styles";

interface MainScreenAuthProps {
  userDetails: UserDetails;
}

interface IConference {}

export default function MainScreenDashboard(props: MainScreenAuthProps) {
  const { userDetails } = props;
  const [conferences, setConferences] = useState<IConference>([]);

  useEffect(() => {
    fetch("/conference/available")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <></>;
}
