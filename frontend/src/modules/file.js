/**
 * hook & utils for files
 *
 * @author Ulrich
 *
 * @copyright Vertics Oy 2021
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// reducers
import { filesSelectors } from "../reducers";
// actions
import { fileActions } from "../actions";
import { statusModule } from "../modules";

/**
 * hook for getting file list
 * Fetch files from server and save data to the state
 * once the request is resolved
 *
 * @return {Array} a list of files fetched from the server
 */
const useFiles = (isBackground) => {
  const dispatch = useDispatch();

  const fetchedFiles = useSelector((state) => {
    return filesSelectors.getAll(state.files);
  });
  const status = useSelector((state) =>
    filesSelectors.getApiStatus(state.files)
  );

  const [files, setFiles] = React.useState(fetchedFiles);

  React.useEffect(() => {
    dispatch(fileActions.getAll(isBackground));
  }, []);

  React.useEffect(() => {
    if (status === statusModule.status.resolved) {
      setFiles(fetchedFiles);
    }
  }, [status, fetchedFiles]);
  return { files, status };
};

export default { useFiles };
