/**
 * Utils for language
 *
 *
 */

const translateOptions = (options, t) => {
  if (!options || options.lengh === 0) {
    return [];
  }
  return options.map((item) => ({ ...item, label: t(`${item.label}`) }));
};
export default { translateOptions };
