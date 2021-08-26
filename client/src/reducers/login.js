/**
 * Login reducer
 *
 *
 */
import { loginTypes as types } from "actions/types";

const initialState = {
  loading: true,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        loading: true,
      };

    case types.loginSuccess:
      return {
        ...state,
        loading: false,
      };

    case types.loginFail:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
