/**
 * Utils for language
 *
 *
 */

const sortData = (data, fieldName, value) => {
  if (!data || data.lengh === 0) {
    return [];
  }
  const emptyValues = data.filter((item) => !item[fieldName]);
  const availableValues = data.filter((item) => item[fieldName]);
  availableValues.sort((a, b) => {
    if (typeof a[fieldName] === "number")
      return sortNumber(a[fieldName], b[fieldName], value);
    if (typeof a[fieldName] === "string")
      return sortString(a[fieldName], b[fieldName], value);
  });
  return availableValues.concat(emptyValues);
};
const sortNumber = (a, b, value) => {
  switch (value) {
    case 1:
      return a - b;
    case -1:
      return b - a;
    default:
      return a - b;
  }
};
const sortString = (a, b, value) => {
  switch (value) {
    case 1:
      return a.localeCompare(b, "en", {
        ignorePunctuation: true,
      });
    case -1:
      return b.localeCompare(a, "en", {
        ignorePunctuation: true,
      });
    default:
      return a.localeCompare(b, "en", {
        ignorePunctuation: true,
      });
  }
};
export default { sortData, sortString };
