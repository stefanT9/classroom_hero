import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Conference from "./bundles/conference/components/Conference";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthContextStore, { AuthContext } from "./context/authContext";
import MainScreen from "./bundles/main/components/mainScreen";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextStore>
      <Router>
        <Route exact path="/" children={<MainScreen />} />
        <Route
          exact
          path="/conference/:conferenceId"
          children={
            <AuthContext.Consumer>
              {({ userDetails }) =>
                userDetails && <Conference userDetails={userDetails} />
              }
            </AuthContext.Consumer>
          }
        />
      </Router>
    </AuthContextStore>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
