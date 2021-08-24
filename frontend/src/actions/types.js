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

// file
export const fileTypes = {
  getAll: "FILES_GET_ALL",
  getAllSuccess: "FILES_GET_ALL_SUCCESS",
  getAllFail: "FILES_GET_ALL_FAIL",
  uploadFile: "FILE_UPLOAD",
  uploadFileSuccess: "FILE_UPLOAD_SUCCESS",
  uploadFileFail: "FILE_UPLOAD_FAIL",
  updateFile: "FILE_UPDATE",
  updateFileSuccess: "FILE_UPDATE_SUCCESS",
  updateFileFail: "FILE_UPDATE_FAIL",
  deleteFile: "FILE_DELETE",
  deleteFileSuccess: "FILE_DELETE_SUCCESS",
  deleteFileFail: "FILE_DELETE_FAIL",
};

// form
export const formTypes = {
  saveTemplate: "FORM_SAVE_TEMPLATE",
  addInputToTemplate: "FORM_ADD_INPUT_TO_TEMPLATE",
  changeOrder: "FORM_CHANGE_TEMPLATE_ORDER",
  deleteInputFromTemplate: "FORM_DELETE_INPUT_FROM_TEMPLATE",
  createTemplate: "FORM_CREATE_TEMPLATE",
  createTemplateSuccess: "FORM_CREATE_TEMPLATE_SUCCESS",
  createTemplateFail: "FORM_CREATE_TEMPLATE_FAIL",
  getTemplate: "FORM_GET_TEMPLATE",
  getTemplateSuccess: "FORM_GET_TEMPLATE_SUCCESS",
  getTemplateFail: "FORM_GET_TEMPLATE_FAIL",
  getTemplates: "FORM_GET_TEMPLATES",
  getTemplatesSuccess: "FORM_GET_TEMPLATES_SUCCESS",
  getTemplatesFail: "FORM_GET_TEMPLATES_FAIL",
  updateTemplate: "FORM_UPDATE_TEMPLATES",
  updateTemplateSuccess: "FORM_UPDATE_TEMPLATES_SUCCESS",
  updateTemplateFail: "FORM_UPDATE_TEMPLATES_FAIL",
  resetTemplate: "FORM_RESET_TEMPLATE",
  addTemplatePart: "FORM_ADD_TEMPLATE_PART",
  saveTemplateName: "FORM_SAVE_TEMPLATE_NAME",
};

// form
export const formDataTypes = {
  createFormData: "FORM_DATA_CREATE",
  createFormDataSuccess: "FORM_DATA_CREATE_SUCCESS",
  createFormDataFail: "FORM_DATA_CREATE_FAIL",
  getAllById: "FORM_DATA_GET_ALL_BY_ID",
  getAllByIdSuccess: "FORM_DATA_GET_ALL_BY_ID_SUCCESS",
  getAllByIdFail: "FORM_DATA_GET_ALL_BY_ID_FAIL",
  updateFormData: "FORM_DATA_UPDATE_FORM_DATA",
  updateFormDataSuccess: "FORM_DATA_UPDATE_FORM_DATA_SUCCESS",
  updateFormDataFail: "FORM_DATA_UPDATE_FORM_DATA_FAIL",
};

// organization
export const organizationTypes = {
  updateOrganization: "ORGANIZATION_UPDATE",
  updateOrganizationSuccess: "ORGANIZATION_UPDATE_SUCCESS",
  updateOrganizationFail: "ORGANIZATION_UPDATE_FAIL",
  createOrganization: "ORGANIZATION_CREATE",
  createOrganizationSuccess: "ORGANIZATION_CREATE_SUCCESS",
  createOrganizationFail: "ORGANIZATION_CREATE_FAIL",
  getAll: "ORGANIZATION_GET_ALL",
  getAllSuccess: "ORGANIZATION_GET_ALL_SUCCESS",
  getAllFail: "ORGANIZATION_GET_ALL_FAIL",
  initOrganization: "ORGANIZATION_INIT_ORGANIZATION",
  resetOrganization: "ORGANIZATION_RESET_ORGANIZATION",
};

// comment
export const commentTypes = {
  getAllComments: "GET_ALL_COMMENTS",
  getAllCommentsSuccess: "GET_ALL_COMMENTS_SUCCESS",
  createComment: "CREATE_COMMENT",
  createCommentSuccess: "CREATE_COMMENT_SUCCESS",
  approveComment: "APPROVE_COMMENT",
  approveCommentSuccess: "APPROVE_COMMENT_SUCCESS",
};

// thread
export const threadTypes = {
  getAll: "THREAD_GET_ALL",
  getAllSuccess: "THREAD_GET_ALL_SUCCESS",
  getAllFail: "THREAD_GET_ALL_FAIL",
  createThread: "THREAD_CREATE_THREAD",
  createThreadSuccess: "THREAD_CREATE_THREAD_SUCCESS",
  createThreadFail: "THREAD_CREATE_THREAD_FAIL",
  updateThread: "THREAD_UPDATE_THREAD",
  updateThreadSuccess: "THREAD_UPDATE_THREAD_SUCCESS",
  updateThreadFail: "THREAD_UPDATE_THREAD_FAIL",
};

// users
export const usersTypes = {
  getAll: "USERS_GET_ALL",
  getAllSuccess: "USERS_GET_ALL_SUCCESS",
  getAllFail: "USERS_GET_ALL_FAIL",
};

// noti
export const notiTypes = {
  getUnread: "NOTIFICATION_GET_UNREAD",
  getUnreadSuccess: "NOTIFICATION_GET_UNREAD_SUCCESS",
  getUnreadFail: "NOTIFICATION_GET_UNREAD_FAIL",
};
