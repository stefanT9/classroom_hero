import React from "react";
import { AuthContext } from "../../../context/authContext";
import Topnav from "../navigation/topnav";
const BaseLayout = ({ children }: any) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AuthContext.Consumer>
        {({ userDetails, login, logout, register, isAuth }) =>
          userDetails &&
          login &&
          logout &&
          register &&
          isAuth && (
            <Topnav
              userDetails={userDetails}
              login={login}
              logout={logout}
              isAuth={isAuth}
            />
          )
        }
      </AuthContext.Consumer>
      <div style={{ display: "flex", flexGrow: 1 }}>{children}</div>
    </div>
  );
};
export default BaseLayout;
