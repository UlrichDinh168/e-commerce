/**
 * User action creators
 */
import { userTypes as types } from "./types";
const register = (data) => ({
  type: types.register,
  payload: {
    request: {
      method: "POST",
      url: "/auth/register",
      data,
    },
  },
});

const updateUser = (id, data) => {
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

const forgotPassword = (data) => {
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

const setPassword = (data) => {
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

const getUser = () => {
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
const getNewAccessToken = (data) => {
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
export default {
  getUser,
  getNewAccessToken,
  register,
  updateUser,
  forgotPassword,
  setPassword,
};
