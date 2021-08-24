/**
 * Helpers for local storage
 *
 * @author Ulrich
 *
 * @copyright Vertics Oy 2021
 */

function removeTokens() {
  // Remove userId from localStorage
  localStorage.removeItem("userId");
}
export default { removeTokens };
