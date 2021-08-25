/**
 * Notification reducer
 *
 *
 */
import { notificationTypes as types } from "actions/types";
import { errorUtils } from "utils";
import { NOTIFICATION_TYPE, NOTIFICATION_DURATION } from "constants";

const initialState = {
  notification: null,
};
/**
 *
 * @param {Object}
 *
 * @return {Array}
 */
const getDuration = (error) => {
  if (error.response && error.response.data && error.response.data.code) {
    switch (error.response.data.code) {
      case 1042:
        return 4000;
      default:
        return NOTIFICATION_DURATION;
    }
  }
  return NOTIFICATION_DURATION;
};
export const notificationReducer = (state = initialState, action) => {
  if (action.type.endsWith("_FAIL")) {
    return {
      ...state,
      notification: {
        type: NOTIFICATION_TYPE.error,
        message: errorUtils.normalizeError(action.error).message,
        duration: getDuration(action.error),
      },
    };
  }
  switch (action.type) {
    case types.showNotification:
      return { ...state, notification: action.notification };
    case types.resetNotification:
      return initialState;
    default:
      return state;
  }
};
