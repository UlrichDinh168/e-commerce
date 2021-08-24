/**
 * Root reducer
 *
 *
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
import { loginTypes as types } from "actions/types";
import storage from "redux-persist/es/storage";
import { PERSIST_KEY } from "constants";
// Login
import { loginReducer, loginSelectors } from "./login";
import { notificationReducer, notificationSelectors } from "./notification";

// export root reducer
const index = combineReducers({
  router: connectRouter(history),
  login: loginReducer,
  user: userReducer,
  users: usersReducer,
  company: companyReducer,
  companies: companiesReducer,
  serviceRequests: serviceRequestsReducer,
  devices: devicesReducer,
  locations: locationsReducer,
  location: locationReducer,
  serviceRequest: serviceRequestReducer,
  notification: notificationReducer,
  orders: ordersReducer,
  order: orderReducer,
});
export default (state, action) => {
  if (
    action.type === types.logoutSuccess ||
    action.type === types.localLogout
  ) {
    storage.removeItem(PERSIST_KEY);
    state = undefined;
  }
  return index(state, action);
};
// export history
export { history };

// export getters/ selectors
export { loginSelectors, notificationSelectors };
