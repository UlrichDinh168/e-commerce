/**
 * Helpers for user
 *
 * @author Anh Tu Le <anh.le@vertics.co>
 *
 * @copyright Vertics Oy 2021
 */

const isUserRoleValid = (userRoles, reqRoles) => {
	// Not valid when user has no role
	if (!userRoles || !userRoles.length) {
return false
}
	// valid when there is no requireRole
	if (!reqRoles || !reqRoles.length) {
return true
}
	return userRoles.reduce((acc, role) => {
		const roleValid = reqRoles.some(req => req === role)
		return acc || roleValid
	}, false)
}

const getUnAuthorizeUserRedirect = role => {
	return '/home'
}
export default { isUserRoleValid, getUnAuthorizeUserRedirect }
