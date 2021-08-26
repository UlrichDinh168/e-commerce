import React, { useEffect, useState } from "react";
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
  const [openDrawer, setOpenDrawer] = useState(false);

  const { isAuthenticated } = useAuthorization();
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(userActions.getUser());
    }
  }, []);
  const onToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const isLogin = location.pathname.startsWith("/login");

  return (
    <AuthorizationContext.Provider value={{ user, loading }}>
      <div className="core-layout">
        <Nav openDrawer={openDrawer} onToggleDrawer={onToggleDrawer} />

        <main onClick={onToggleDrawer}>{children}</main>
        <Snackbar />
      </div>
    </AuthorizationContext.Provider>
  );
};

export default CoreLayout;
