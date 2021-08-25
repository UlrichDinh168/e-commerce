/**
 * Collection of simple functions to help with development
 */

export function log(object) {
  if (process.env.NODE_ENV === "development") {
    console.log(object);
  }
}
