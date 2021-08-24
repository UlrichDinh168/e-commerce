/**
 * hook & utils for user
 *
 * @author Ulrich
 *
 * @copyright Vertics Oy 2021
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// reducers
import { usersSelectors } from "../reducers";
// actions
import { usersActions } from "../actions";
import { statusModule } from "../modules";

/**
 * hook for getting user list
 * Fetch users from server and save data to the state
 * once the request is resolved
 *
 * @return {Array} a list of users fetched from the server
 */
const useUsers = (isBackground) => {
  const dispatch = useDispatch();

  const fetchedUsers = useSelector((state) => {
    return usersSelectors.getAll(state.users);
  });
  const status = useSelector((state) =>
    usersSelectors.getApiStatus(state.users)
  );

  const [users, setUsers] = React.useState(fetchedUsers);

  React.useEffect(() => {
    dispatch(usersActions.getAll(isBackground));
  }, []);

  React.useEffect(() => {
    if (status === statusModule.status.resolved) {
      setUsers(fetchedUsers);
    }
  }, [status, fetchedUsers]);
  return { users, status };
};

export default { useUsers };
