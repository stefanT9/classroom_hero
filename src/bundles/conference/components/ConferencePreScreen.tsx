import React, { useState, useEffect } from "react";
import SelectUsernameModal from "./SelectUsernameModal";

import { AuthContext } from "../../../context/authContext";
import Conference from "./Conference";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Typography } from "@material-ui/core";
export default function PreConference() {
  const history = useHistory();
  const { conferenceId } = useParams<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const handleGoToDashboard = () => {
    history.push("/");
  };
  useEffect(() => {
    axios
      .get(`/api/conference/${conferenceId}`)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setError("Invalid conference id");
      });
  }, []);
  if (isLoading) return <div>loading</div>;
  if (error)
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography color="error">{error}</Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={handleGoToDashboard}
        >
          Go to dashboard to create a conference
        </Button>
      </div>
    );

  return (
    <AuthContext.Consumer>
      {({ userDetails, softLogin }) => {
        console.log(userDetails);
        if (userDetails?.username) {
          return <Conference userDetails={userDetails} />;
        }
        return (
          softLogin &&
          userDetails &&
          !userDetails.username && (
            <SelectUsernameModal open={true} softLogin={softLogin} />
          )
        );
      }}
    </AuthContext.Consumer>
  );
}
