/**
 * Helpers for local storage
 *
 * @author Ulrich
 *
 */

function removeTokens() {
  // Remove userId from localStorage
  localStorage.removeItem("userId");
}
export default { removeTokens };
