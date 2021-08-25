/**
 * Login action creator
 *
 *
 */

import { loginTypes as types } from "./types";

export const changeField = (name, value) => {
  return {
    type: types.changeField,
    name,
    value,
  };
};

// Server set session cookie, but also gives us some basic information about user for storage
export const login = (data) => ({
  type: types.login,
  payload: {
    request: {
      method: "POST",
      url: "/auth/login",
      data,
    },
  },
});
export const fbLogin = (fbToken) => ({
  type: types.fbLogin,
  payload: {
    request: {
      method: "POST",
      url: "/auth/facebook/login",
      data: { fbToken },
    },
  },
});
export const ggLogin = (googleToken) => ({
  type: types.ggLogin,
  payload: {
    request: {
      method: "POST",
      url: "/auth/google/login",
      data: { googleToken },
    },
  },
});
export const Logout = () => ({
  type: types.logout,
  payload: {
    request: {
      method: "GET",
      url: "/auth/logout",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  },
});

export const localLogout = () => {
  return {
    type: types.localLogout,
  };
};

export const verifySession = () => ({
  type: types.verifySession,
  payload: {
    request: {
      method: "GET",
      url: "/auth/verifysession",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  },
});
