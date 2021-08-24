export const ROUTER_PATH = {
  home: "/",
  userDetails: "/user_details",
};

export const PERSIST_KEY = "root";

// notification
export const NOTIFICATION_DURATION = 1500;
export const NOTIFICATION_TYPE = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

export const MESSAGE_CODE = {
  1000: "Invalid access token",
  1001: "Invalid refresh token",
  1004: "Invalid confirm token",
  1005: "User already verified",
  1006: "User not verified",
  1007: "Email already used",
  1008: "Invalid credential",
  1009: "Unauthorized to modify",
  1010: "Verification failed",
  1011: "Invalid authentication",
  1012: "Expired access token",
  1013: "Expired refresh token",
  1014: "Requires admin access",
  1015: "Invalid password reset token",
  1016: "Expired password reset token",
  1017: "Invalid cron access",
  1018: "Missing request body",
  1019: "Invalid request",
  1020: "Role not authorized",
  1021: "Entity not found",
  1022: "Missing query params",
  1023: "Invalid enum",
  1024: "Invalid boolean",
  1025: "Missing URL param",
  1026: "Missing body param",
  1027: "Invalid user",
  1028: "Invalid company",
  1029: "Invalid ticket",
  1030: "Failed to create",
  1031: "Failed to edit",
  1032: "Invalid ticket attachment",
  1033: "Invalid csv file",
  1034: "Invalid role",
  1035: "User not found",
  1036: "Company not found",
  1037: "Invalid Ncentral company id",
  1038: "Not an Aula company",
  1039: "Invalid user details",
  1040: "Err: inactivate company",
  1041: "Err: inactivate user",
  1042: "Insufficient user data",
  1043: "Invalid time entry",
  1044: "Forbidden to role",
  1045: "Missing required params",
  1046: "Forbidden company",
  1047: "Unexpected role",
  9000: "Interal middleware error",
  9001: "Failed to save refresh token",
  9002: "Missing required middleware",
  9003: "Failed to validate user creation",
  9004: "Failed to validate user modification",
};
