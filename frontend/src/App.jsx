import React, { lazy, Suspense } from "react";
import {
  Switch,
  Redirect,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ROUTER_PATH, USER_ROLE } from "./constants";
import { Helmet } from "react-helmet";
import Loading from "shared/LoadingIndicator";

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "./pages/Home"));
const App = ({ isAuthenticated }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Helmet titleTemplate="%s" defaultTitle="">
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Router>
        {isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      </Router>
    </Suspense>
  );
};

const AuthenticatedRoutes = () => {
  const useRole = useSelector((state) => state.user.useRole);
  //Redirect Route
  return (
    <CoreLayout>
      <Switch>
        <ProtectedRoute
          exact
          path={ROUTER_PATH.USER_DETAILS}
          component={Home}
        />
        <Redirect to={ROUTER_PATH.USER_DETAILS} />
      </Switch>
    </CoreLayout>
  );
};

const UnauthenticatedRoutes = () => {
  return (
    <Switch>
      <Route exact path={ROUTER_PATH.HOME} component={Home} />
      <Redirect to={ROUTER_PATH.HOME} />
    </Switch>
  );
};
export default App;
