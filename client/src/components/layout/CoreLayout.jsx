import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Snackbar from "shared/Snackbar";
import { useTranslation } from "react-i18next";
// Actions
import { userActions } from "actions";

import Nav from "./Nav";

// Hooks
import { AuthorizationContext, useAuthorization } from "hooks";
//reducer

const CoreLayout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

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
