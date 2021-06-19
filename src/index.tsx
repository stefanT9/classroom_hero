import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthContextStore, { AuthContext } from "./context/authContext";
import MainScreen from "./bundles/main/mainScreen";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ProfilePage from "./bundles/profile/profilePage";
import BaseLayout from "./bundles/common/layout/layout";
import PreConference from "./bundles/conference/components/ConferencePreScreen";
import ConferenceStatisticsScreen from "./bundles/statistics/screens/ConferenceStatistics";
import { AlertStore } from "./context/alertContext";
import RegisterScreen from "./bundles/main/registerScreen";
import ForgotPaswordScreen from "./bundles/main/forgotPasswordScreen";
import JoinConferenceAnonymousScreen from "./bundles/main/joinConferenceAnonymousScreen";
import MainScreenLogin from "./bundles/main/mainScreenLogin";

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
        <AlertStore>
          <Router>
            <BaseLayout>
              <Route exact path="/" children={<MainScreen />} />
              <Route exact path="/login" children={<MainScreenLogin />} />
              <Route exact path="/register" children={<RegisterScreen />} />
              <Route
                exact
                path="/forgot-password"
                children={<ForgotPaswordScreen />}
              />
              <Route
                exact
                path="/join-conference"
                children={<JoinConferenceAnonymousScreen />}
              />
              <Route
                exact
                path="/conference/:conferenceId"
                children={<PreConference />}
              />
              <Route
                exact
                path="/conference/:conferenceId/stats"
                children={<ConferenceStatisticsScreen />}
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
            </BaseLayout>
          </Router>
        </AlertStore>
      </AuthContextStore>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
