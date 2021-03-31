import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

const defaultUserDetails: UserDetails = {
  token: null,
  id: null,
  username: null,
};

export const AuthContext = createContext({
  userDetails: defaultUserDetails,
  login: (email: string, password: string) => {},
  register: (email: string, password: string) => {},
  logout: () => {},
  softLogin: (username: string) => {},
});

const AuthContextStore = (props: any) => {
  const [userDetails, setUserDetails] = useState<UserDetails>(
    defaultUserDetails
  );

  const softLogin = (username: string) => {
    setUserDetails((userDetails: UserDetails) => ({
      ...userDetails,
      username: username,
      id: `tmp_${uuidV4()}`,
    }));
  };
  const login = (email: string, password: string) => {};
  const register = (email: string, password: string) => {};
  const logout = () => {
    setUserDetails(defaultUserDetails);
  };
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{ userDetails, login, register, logout, softLogin }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextStore;
