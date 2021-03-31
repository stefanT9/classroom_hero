import React, { createContext, useState, useEffect } from "react";
import { v4 } from "uuid";

const defaultUserDetails = {
  token: null,
  id: null,
  username: null,
};

export const AuthContext = createContext({
  userDetails: defaultUserDetails,
  login: (email, password) => {},
  register: (email, password) => {},
  logout: () => {},
  softLogin: (username) => {},
});

const AuthContextStore = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});

  const softLogin = (username) => {
    setUserDetails((userDetails) => ({
      ...userDetails,
      username: username,
      id: `tmp_${v4()}`,
    }));
  };
  const login = (email, password) => {};
  const register = (email, password) => {};
  const logout = () => {
    setUserDetails(defaultUserDetails);
  };
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{ userDetails, login, register, logout, softLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextStore;
