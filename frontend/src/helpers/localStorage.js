/**
 * Helpers for local storage
 *
 *
 */

function removeTokens() {
  // Remove userId from localStorage
  localStorage.removeItem("userId");
}
export default { removeTokens };
