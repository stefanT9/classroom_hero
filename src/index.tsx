import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Conference from "./bundles/conference/components/Conference";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthContextStore, { AuthContext } from "./context/authContext";
import MainScreen from "./bundles/main/mainScreen";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ProfilePage from "./bundles/profile/profilePage";
import BaseLayout from "./bundles/common/layout/layout";

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
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

          <Route
            exact
            path="/profile"
            children={
              <AuthContext.Consumer>
                {({ userDetails, isAuth }) =>
                  (userDetails && isAuth && isAuth() && (
                    <ProfilePage userDetails={userDetails} />
                  )) || <div>you need to login</div>
                }
              </AuthContext.Consumer>
            }
          />
        </Router>
      </AuthContextStore>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
