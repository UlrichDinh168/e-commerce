import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Snackbar from "shared/Snackbar";
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
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(userActions.getUser());
    }
  }, []);

  const isLogin = location.pathname.startsWith("/login");

  return (
    <AuthorizationContext.Provider value={{ user, loading }}>
      <div className="core-layout">
        <Nav />
        <main onClick={() => setOpenDrawer(false)}>{children}</main>
        <Snackbar />
      </div>
    </AuthorizationContext.Provider>
  );
};

export default CoreLayout;
