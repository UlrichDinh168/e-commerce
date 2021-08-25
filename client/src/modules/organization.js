/**
 * hook & utils for organization
 *
 *
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// reducers
import { organizationsSelectors } from "../reducers";
// actions
import { organizationActions } from "../actions";
import { statusModule } from "../modules";
/**
 * hook for getting organizations
 * Fetch organizations from server and save data to the state
 * once the request is resolved
 *
 * @return {Array} a list of organizations fetched from the server
 */
const useOrganizations = (isBackground) => {
  const dispatch = useDispatch();

  const fetchedOrganizations = useSelector((state) => {
    return organizationsSelectors.getAll(state.organizations);
  });
  const status = useSelector((state) =>
    organizationsSelectors.getApiStatus(state.organizations)
  );

  const [organizations, setOrganizations] =
    React.useState(fetchedOrganizations);

  React.useEffect(() => {
    dispatch(organizationActions.getAll(isBackground));
  }, []);

  React.useEffect(() => {
    if (status === statusModule.status.resolved) {
      setOrganizations(fetchedOrganizations);
    }
  }, [status, fetchedOrganizations]);
  return { organizations, status };
};

export default { useOrganizations };
