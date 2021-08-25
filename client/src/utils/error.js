/**
 * error utils
 *
 *
 */
const defaultError = {
  status: null,
  msg: "Whoops! Something went wrong",
  detail: "Whoops! Something went wrong",
};
/**
 * Format and humanize error message
 * to show specific error message in UI
 *
 * @param {Object} error object from server
 * @return {Object} status code + title + detail
 */
const normalizeError = (error) => {
  const errorData = error.response ? error.response.data : null;

  if (!errorData) {
    return defaultError;
  }
  // const errorObject = errorData.errors[0]
  return errorData;
};

export default { normalizeError };
