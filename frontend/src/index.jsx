/**
 * Root client file
 */

// WORK INSTRUCTIONS:
// - Please do not remove the above header. It protects the IPR intrests of our company.
// - Please replace the author name with your own full real name.

// React stuffs
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";
import * as Sentry from "@sentry/react";

import { store, persistor } from "./store";

// history from reducer
import { history } from "reducers";

// Styling
import "styles/index.scss";

// Components
import App from "./App";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://4a6bef314cc14c03a24cd10f9992cfcb@o381714.ingest.sentry.io/5661035",
    normalizeDepth: 6,
    beforeSend(event, hint) {
      return event;
    },
  });
}
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app")
);
