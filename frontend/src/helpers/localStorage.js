/**
 * Helpers for local storage
 *
 * @author Anh Tu Le <anh.le@vertics.co>
 *
 * @copyright Vertics Oy 2021
 */

function removeTokens() {
	// Remove userId from localStorage
	localStorage.removeItem('userId')
}
export default { removeTokens }
