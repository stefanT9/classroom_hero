import React from "react";
import SelectUsernameModal from "./SelectUsernameModal";

import { AuthContext } from "../../../context/authContext";
import Conference from "./Conference";

export default function PreConference() {
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
