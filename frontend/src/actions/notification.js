/**
 * Notification action creators
 */
import { notificationTypes as types } from "./types";
import { NOTIFICATION_DURATION } from "constants";
const showNotification = (message, type) => {
  const defaultMessage = {
    type: type,
    message: message,
    duration: NOTIFICATION_DURATION,
  };
  return {
    type: types.showNotification,
    notification: { ...defaultMessage, ...message },
  };
};

const resetNotification = (message) => {
  return {
    type: types.resetNotification,
  };
};
export default {
  showNotification,
  resetNotification,
};
