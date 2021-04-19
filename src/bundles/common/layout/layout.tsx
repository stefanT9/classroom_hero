import React from "react";
import { AuthContext } from "../../../context/authContext";
import Topnav from "../navigation/topnav";
const BaseLayout = ({ children }: any) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
              register={register}
              isAuth={isAuth}
            />
          )
        }
      </AuthContext.Consumer>
      <div style={{ display: "flex" }}>{children}</div>
    </div>
  );
};
export default BaseLayout;
