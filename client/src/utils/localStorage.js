/**
 * Utils for local storage
 *
 *
 */

// Helper methods for saving/retrieving data from localStorage
function saveAuthenticationData(key, value) {
  localStorage.setItem(key, value);
}

function getAuthenticationData(key) {
  return localStorage.getItem(key);
}
function removeTokens() {
  // Remove user and authentication tokens from localStorage
  localStorage.removeItem("userId");
  localStorage.removeItem("companyId");
}
export default { saveAuthenticationData, getAuthenticationData, removeTokens };
