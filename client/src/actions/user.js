/**
 * User action creators
 */
import { userTypes as types } from "./types";
export const register = (data) => ({
  type: types.register,
  payload: {
    request: {
      method: "POST",
      url: "/auth/register",
      data,
    },
  },
});

export const updateUser = (id, data) => {
  return {
    type: types.updateUser,
    payload: {
      request: {
        method: "PATCH",
        url: `/user/${id}`,
        data,
      },
    },
  };
};

export const forgotPassword = (data) => {
  return {
    type: types.forgotPassword,
    payload: {
      request: {
        method: "PATCH",
        url: `/auth/forgotPassword`,
        data,
      },
    },
  };
};

export const setPassword = (data) => {
  return {
    type: types.setPassword,
    payload: {
      request: {
        method: "PATCH",
        url: `/auth/setPassword`,
        data,
      },
    },
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch({
      type: types.getUser,
    });

    setTimeout(() => {
      return dispatch({
        type: types.getUserSuccess,
        payload: {
          data: { name: "Hello world", id: Math.round(Math.random() * 100000) },
        },
      });
    }, 500);
  };
};
export const getNewAccessToken = (data) => {
  return {
    type: types.getNewAccessToken,
    payload: {
      request: {
        method: "POST",
        url: `/auth/token/refresh`,
        data,
      },
    },
  };
};
