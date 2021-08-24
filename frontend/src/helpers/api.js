/**
 * Api helpers
 */
import * as Sentry from "@sentry/react";
import { store } from "./../store";
import { MESSAGE_CODE } from "constants";
const apiSentryReport = (code, message, type) => {
  const errorMessage = code ? MESSAGE_CODE[code] : message;
  const user = store.getState().user.user;
  Sentry.withScope(function (scope) {
    scope.setUser({ email: user ? user.email : null });
    scope.setTag("my-tag", "my value");
    scope.setLevel("warning");
    scope.setExtra("errorMessage", errorMessage);
    scope.setExtra("store", store.getState());
    scope.setExtra("actionType", type);
    Sentry.captureException(new Error(`API error:${errorMessage}`));
  });

  // will not be tagged with my-tag
  // Sentry.captureException(new Error('my other error'))
  // Sentry.configureScope(scope =>
  // 	scope
  // 		.setUser({ email: user ? user.email : null })
  // 		.setLevel('warning')
  // 		.setExtra('store', store.getState())
  // 		.setExtra('errorMessage', errorMessage)
  // )
  // return Sentry.captureException(err)
};
var apiWrapper = function (f) {
  return function () {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      customErrorHandler(e);
    }
  };
};

export { apiSentryReport, apiWrapper };
