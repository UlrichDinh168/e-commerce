/**
 * Protected route
 * Only let user access the route if user has been authenticated
 * Otherwise redirect user to login page
 *
 * @author Oskari Samiola <oskari@vertics.co>
 *
 * @copyright Vertics Co 2021
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";

import { useAuthorization, authorizedState } from "hooks";
import { userUtils } from "helpers";
// constanst
import { GROUP_VALUES } from "constants";
// reducer
import { userActions } from "actions";

// Wrap title and meta data to Component
const withHelmet = (component, title) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={`Vertics Boilerplate |${title}`} />
    </Helmet>
    {component}
  </>
);

const ProtectedRoute = ({
  component: Component,
  title,
  groups = [GROUP_VALUES.admin],
  unauthorizedRedirect = "/login",
  ...rest
}) => {
  const { isAuthorized, isAuthenticated } = useAuthorization();
  const user = useSelector((state) => userActions.getUser(state.user));

  if (!isAuthenticated) {
    return <Redirect to={unauthorizedRedirect} />;
  }

  switch (isAuthorized) {
    case authorizedState.idle:
      return null;

    case authorizedState.pending:
      return "Loading";

    case authorizedState.rejected:
      return <Redirect to={unauthorizedRedirect} />;
  }

  if (
    groups &&
    groups.length &&
    userUtils.isUserRoleValid(user.groups, groups)
  ) {
    return (
      <Route
        {...rest}
        render={(props) => withHelmet(<Component {...props} />, title)}
      />
    );
  }
  const unAuthorizeRedirect = userUtils.getUnAuthorizeUserRedirect();
  return <Redirect to={unAuthorizeRedirect} />;
};

export default ProtectedRoute;
