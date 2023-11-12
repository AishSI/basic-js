const { NotImplementedError } = require("../extensions/index.js");

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  if (!date) {
    return "Unable to determine the time of year!";
  }

  const seasons = ["winter", "spring", "summer", "autumn"];
  let Month = 0;

  try {
    if (date && date instanceof Date && !isNaN(date)) {
      let dateStr = new Date(date);
      Month = dateStr.getMonth() == 11 ? 0 : dateStr.getMonth() + 1;
      return seasons[Math.trunc(Month / 3)];
    }

    throw new Error(`Invalid date!`);
  } catch {
    throw new Error(`Invalid date!`);
  }
}

module.exports = {
  getSeason,
};
