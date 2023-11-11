const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  //* Variant 1 (forEach)
  // const strNum = [...String(n)];
  // const arr = [];
  // strNum.forEach((element, index) => {
  //   const arr1 = strNum.slice();
  //   arr1.splice(index, 1);
  //   arr.push(Number(arr1.join("")));
  // });
  // return arr.sort((a, b) => b - a)[0];

  //* Variant 2 (reduce)
  const arrStrNum = [...String(n)];
  return arrStrNum.reduce((acc, item, index) => {
    const currArr = arrStrNum.slice();
    currArr.splice(index, 1);
    const currNum = Number(currArr.join(""));
    return currNum > acc ? currNum : acc;
  }, 0);
}

module.exports = {
  deleteDigit,
};
