const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  //* Variant 1
  // let arr2 = [...s2];
  // [...s1].forEach((item) => {
  //   if (arr2.indexOf(item) != -1) {
  //     arr2.splice(arr2.indexOf(item), 1);
  //   }
  // });
  // return s2.length - arr2.length;

  //* Variant 2
  // const arrS2 = [...s2];
  // return [...s1].reduce((acc, item) => {
  //   if (arrS2.indexOf(item) !== -1) {
  //     arrS2[arrS2.indexOf(item)] = null;
  //     return (acc += 1);
  //   }
  //   return acc;
  // }, 0);

  //* Variant 3
  let count = 0;
  const sieve = [...new Set([...s1])];

  sieve.forEach((letter) => {
    let [countS1, countS2] = [0, 0];
    countS1 = [...s1].filter((item) => item === letter).length;
    countS2 = [...s2].filter((item) => item === letter).length;
    count += Math.min(countS1, countS2);
  });

  return count;
}

module.exports = {
  getCommonCharacterCount,
};
