import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import ErrorBoundary from "shared/ErrorBoundary";
import { useAuthorization, authorizedState } from "hooks";
import { ROUTER_PATH } from "constants";
// Wrap title and meta data to Component
const withHelmet = () => {
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={`${title}`} />
    </Helmet>
  </>;
};

const ProtectedRoute = ({
  component: Component,
  title,
  unAuthenticaredRedirect = ROUTER_PATH.HOME,
  unAuthorizedRedirect = "/no-service",
  protectedRoles,
  ...rest
}) => {
  const userRole = useSelector((state) => userSelectors.getRole(state.user));
  const { isAuthorized, isAuthenticated } = useAuthorization();

  if (
    protectedRoles &&
    protectedRoles.length > 0 &&
    protectedRoles.every((role) => role !== userRole)
  ) {
    const redirectRoute = userModule.getRedirectAuthenticatedRoute(userRole);
    return <Redirect to={redirectRoute} />;
  }

  if (!isAuthenticated) return <Redirect to={unAuthenticaredRedirect} />;

  switch (isAuthorized) {
    case authorizedState.idle:
      return null;

    case authorizedState.pending:
      return <p>Loading...</p>;

    case authorizedState.rejected:
      return <Redirect to={unauthorizedRedirect} />;
  }
  return (
    <ErrorBoundary>
      <Route
        {...rest}
        render={(props) => withHelmet(<Component {...props} />, title)}
      />
    </ErrorBoundary>
  );
};

export default ProtectedRoute;
