/**
 * User reducer
 */
import { loginTypes, userTypes } from "actions/types";

const initialState = {
  user: null,
  access: null,
  refresh: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.getUser:
      return {
        ...state,
        loading: true,
      };
    case userTypes.getNewAccessTokenSuccess:
      return {
        ...state,
        access: action.payload.data.access,
      };
    case loginTypes.googleLoginSuccess:
      localStorage.setItem("userId", action.payload.data.id);
      localStorage.setItem(
        "companyId",
        action.payload.config.reduxSourceAction.companyId
      );
      return {
        ...state,
        user: action.payload.data,
        loading: false,
        access: action.payload.config.reduxSourceAction.token,
        refresh: action.payload.config.reduxSourceAction.refreshToken,
      };

    case loginTypes.loginSuccess:
      localStorage.setItem("userId", action.payload.data.user.id);
      localStorage.setItem(
        "companyId",
        action.payload.data.user.company.autoTaskId
      );
      return { ...state, ...action.payload.data, loading: false };
    case userTypes.getUserFail:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
