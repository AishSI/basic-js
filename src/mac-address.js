const { NotImplementedError } = require("../extensions/index.js");

/**
 * The MAC-48 address is six groups of two hexadecimal digits (0 to 9 or A to F),
 * separated by hyphens.
 *
 * Your task is to check by given string inputString
 * whether it's a MAC-48 address or not.
 *
 * @param {Number} inputString
 * @return {Boolean}
 *
 * @example
 * For 00-1B-63-84-45-E6, the output should be true.
 *
 */
function isMAC48Address(n) {
  // ^ - начало строки, нужны 5 групп из буквенно-цифровых подгрупп в 2 символа,
  // с разделителем после них, и такая же замыкающая буквенно-цифровая группа.
  let regexp = /^([\da-f]{2}[:.-]){5}([\da-f]{2})$/i;
  return regexp.test(n);
}

module.exports = {
  isMAC48Address,
};
