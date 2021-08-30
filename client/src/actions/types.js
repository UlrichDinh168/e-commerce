/**
 * Declare all types and export
 *
 *
 */

// Login
export const loginTypes = {
  changeField: "LOGIN_CHANGE_FIELD",
  login: "LOGIN",
  loginSuccess: "LOGIN_SUCCESS",
  loginFail: "LOGIN_FAIL",
  fbLogin: "FB_LOGIN",
  fbLoginSuccess: "FB_LOGIN_SUCCESS",
  fbLoginFail: "FB_LOGIN_FAIL",
  ggLogin: "GG_LOGIN",
  ggLoginSuccess: "GG_LOGIN_SUCCESS",
  ggLoginFail: "GG_LOGIN_FAIL",
  localLogout: "LOGOUT_LOCAL",
  logout: "LOGOUT",
  logoutSuccess: "LOGOUT_SUCCESS",
  logoutFail: "LOGOUT_FAIL",
  verifySession: "VERIFY_SESSION",
  verifySessionSuccess: "VERIFY_SESSION_SUCCESS",
  verifySessionFail: "VERIFY_SESSION_FAIL",
};

// notification
export const notificationTypes = {
  showNotification: "NOTIFICATION_SHOW_NOTIFICATION",
  resetNotification: "NOTIFICATION_RESET_NOTIFICATION",
};

// User
export const userTypes = {
  register: "USER_REGISTER",
  registerSuccess: "USER_REGISTER_SUCCESS",
  registerFail: "USER_REGISTER_FAIL",
  getUser: "USER_GET_USER",
  getUserSuccess: "USER_GET_USER_SUCCESS",
  getUserFail: "USER_GET_USER_FAIL",
  updateUser: "USER_UPDATE_USER",
  updateUserSuccess: "USER_UPDATE_USER_SUCCESS",
  updateUserFail: "USER_UPDATE_USER_FAIL",
  getNewAccessToken: "USER_GET_NEW_ACCESS_TOKEN",
  getNewAccessTokenSuccess: "USER_GET_NEW_ACCESS_TOKEN_SUCCESS",
  getNewAccessTokenFail: "USER_GET_NEW_ACCESS_TOKEN_FAIL",
  forgotPassword: "USER_FORGOT_PASSWORD",
  forgotPasswordSuccess: "USER_FORGOT_PASSWORD_SUCCESS",
  forgotPasswordFail: "USER_FORGOT_PASSWORD_FAIL",
  setPassword: "USER_SET_PASSWORD",
  setPasswordSuccess: "USER_SET_PASSWORD_SUCCESS",
  setPasswordFail: "USER_SET_PASSWORD_FAIL",
};

// users
export const usersTypes = {
  getAll: "USERS_GET_ALL",
  getAllSuccess: "USERS_GET_ALL_SUCCESS",
  getAllFail: "USERS_GET_ALL_FAIL",
};

export const cartTypes = {
  addProductToCart: "CART_PRODUCT_ADD",
  addProductToCartSuccess: "CART_PRODUCT_ADD_SUCCESS",
  addProductToCartFail: "CART_PRODUCT_ADD_FAIL",

  removeProductFromCart: "CART_PRODUCT_REMOVE",
  removeProductFromCartSuccess: "CART_PRODUCT_REMOVE_SUCCESS",
  removeProductFromCartFail: "CART_PRODUCT_REMOVE_FAIL",
};

export const productTypes = {
  getAllProducts: "PRODUCTS_GET_ALL",
  getAllProductsSuccess: "PRODUCTS_GET_ALL_SUCCESS",
  getAllProductsFail: "PRODUCTS_GET_ALL_FAIL",

  getProductById: "PRODUCT_GET_ALL_BY_ID",
  getProductByIdSuccess: "PRODUCT_GET_ALL_BY_ID_SUCCESS",
  getProductByIdFail: "PRODUCT_GET_ALL_BY_ID_FAIL",
};
