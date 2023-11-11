const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const guideDNS = {};
  domains.forEach((item) => {
    const arrString = item.split(".").reverse();
    let currDNS = "";
    for (let i of arrString) {
      currDNS += `.${i}`;
      guideDNS[currDNS] ? (guideDNS[currDNS] += 1) : (guideDNS[currDNS] = 1);
    }
  });
  return guideDNS;
}

module.exports = {
  getDNSStats,
};
