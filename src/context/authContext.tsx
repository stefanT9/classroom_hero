import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { useCookies } from "react-cookie";

const defaultUserDetails: UserDetails = {
  token: null,
  id: null,
  username: null,
};
interface AuthContextInterface {
  userDetails: UserDetails;
  login: (email: string, password: string) => Promise<any>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<any>;
  softLogin: (username: string) => Promise<any>;
  logout: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  isAuth: () => any;
}
export const AuthContext = createContext<Partial<AuthContextInterface>>({});

const AuthContextStore = (props: any) => {
  const [userDetails, setUserDetails] =
    useState<UserDetails>(defaultUserDetails);

  const [cookies, setCookie] = useCookies(["access_token"]);

  const softLogin = async (username: string) => {
    setUserDetails((userDetails: UserDetails) => ({
      ...userDetails,
      username: username,
      id: `tmp_${uuidV4()}`,
    }));
  };
  const login = async (email: string, password: string) => {
    return fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("heres the body", res);
        if (res.token === null) {
          throw new Error(res.message);
        }
        setUserDetails({
          username: res.user.email,
          id: res.user._id,
          token: res.token,
        });
        setCookie("access_token", res.token);
        return res.user;
      })
      .catch((err) => {
        console.log("heres the error", err);
        return {
          status: false,
          message: err.message,
        };
      });
  };
  const register = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    return fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };
  const resetPassword = (email: string) => {
    return Promise.reject({ message: "not implemented yet" });
  };
  const logout = async () => {
    setUserDetails(defaultUserDetails);
    setCookie("access_token", null);
  };
  const isAuth = () => {
    if (!userDetails.id || userDetails.id.startsWith("tmp")) {
      console.log("is not auth");
      return false;
    } else {
      console.log("is auth");
      return true;
    }
  };
  useEffect(() => {
    fetch("/api/auth/verify-token", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        if (res.user) {
          setUserDetails((userDetails) => ({
            ...userDetails,
            username: res.user.email,
            id: res.user._id,
            token: cookies["access_token"],
          }));
        } else {
          console.log(res.error);
          setUserDetails({
            ...defaultUserDetails,
          });
        }
      })
      .catch((err) => {
        setUserDetails({
          ...defaultUserDetails,
        });
        console.error(err);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        isAuth,
        login,
        register,
        logout,
        softLogin,
        resetPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextStore;
