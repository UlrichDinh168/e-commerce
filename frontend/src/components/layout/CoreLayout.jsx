import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import Snackbar from "shared/components/Snackbar";
import { useTranslation } from "react-i18next";
// Actions
import { userActions, notificationActions } from "../../../actions";

// Selectors
import { userSelectors } from "../../../reducers";

import Nav from "./Nav";

// Hooks
import { companyModule } from "modules";
import { AuthorizationContext, useAuthorization } from "../../../hooks";
//reducer
import { notificationSelectors } from "reducers";

const CoreLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("fi");
  }, []);

  const dispatch = useDispatch();
  const { company } = companyModule.useCompany();
  const location = useLocation();
  const user = useSelector((state) => userSelectors.getUser(state.user));
  const loading = useSelector((state) => userSelectors.getLoading(state.user));

  const { isAuthenticated } = useAuthorization();
  React.useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(userActions.getUser());
    }
  }, []);

  const isLogin = location.pathname.startsWith("/login");

  return (
    <AuthorizationContext.Provider value={{ user, loading }}>
      <div className="core-layout">
        <Nav />
        <main>{children}</main>
        <Snackbar />
      </div>
    </AuthorizationContext.Provider>
  );
};

export default CoreLayout;
