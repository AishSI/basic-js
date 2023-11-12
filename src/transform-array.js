const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`'arr' parameter must be an instance of the Array!`);
  }

  const resArr = [];

  for (let i = 0; i < arr.length; i += 1) {
    switch (arr[i]) {
      case `--discard-next`:
        if (i + 1 < arr.length) {
          i += 1;
        }
        break;
      case `--discard-prev`:
        if (resArr.length > 0 && resArr.at(-1) === arr[i - 1]) {
          resArr.pop();
        }
        break;
      case `--double-next`:
        if (i + 1 < arr.length) {
          resArr.push(arr[i + 1]);
        }
        break;
      case `--double-prev`:
        if (arr[i - 1] && arr[i - 2] != "--discard-next") {
          resArr.push(arr[i - 1]);
        }
        break;
      default:
        resArr.push(arr[i]);
    }
  }
  return resArr;
}

module.exports = {
  transform,
};
