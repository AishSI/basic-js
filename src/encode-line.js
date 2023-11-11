const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  const res = [];
  let sum = 0;

  [...str].forEach((element, index) => {
    if (index > 0 && res[res.length - 1][1] === element) {
      sum++;
      res[res.length - 1] = [sum, element];
    } else {
      sum = 1;
      res.push(["", element]);
    }
  });

  return [].concat(...res).join("");
}

module.exports = {
  encodeLine,
};
