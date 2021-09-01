import React from "react";

/**
 * usePrevious hook
 * @param {any} value value that we want to keep track
 * @returns {any}
 */
export const usePrevious = (value) => {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const AuthorizationContext = React.createContext({
  user: null,
  loading: false,
});

export const authorizedState = {
  idle: "idle",
  pending: "pending",
  accepted: "accepted",
  rejected: "rejected",
};

const useAuthorizationContext = () => {
  const context = React.useContext(AuthorizationContext);
  if (!context) {
    throw new Error(
      "Invalid authorization context. This is due to either lack of Provider or bad context value"
    );
  }
  return context;
};

/**
 * Use authorization hook
 * Keep track of user data and loading state to identify if user is:
 * - Authenticated if userId exists in local storage
 * - Authorized if we could actually get user data from server
 *
 * @return {Object} authenticated and authorized state
 */

export const useAuthorization = () => {
  const [isAuthorized, setIsAuthorized] = React.useState(authorizedState.idle);
  const isAuthenticated = !!localStorage.getItem("userId");

  const { user, loading } = useAuthorizationContext();
  const previousAuthorizedState = usePrevious(isAuthorized);

  React.useEffect(() => {
    if (loading) {
      setIsAuthorized(authorizedState.pending);
    } else {
      if (previousAuthorizedState === authorizedState.pending && !user) {
        setIsAuthorized(authorizedState.rejected);
        return;
      }
      setIsAuthorized(authorizedState.idle);
    }
  }, [loading]);

  React.useEffect(() => {
    if (!user) return;
    setAuthorized(authorizedState.accepted);
  }, [user]);

  return {
    isAuthorized,
    isAuthenticated,
  };
};
