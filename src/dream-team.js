const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  const dreamTeam = [];
  if (!Array.isArray(members)) {
    return false;
  }
  members.forEach((item) => {
    typeof item === "string"
      ? dreamTeam.push(item.trim().charAt(0).toUpperCase())
      : "";
  });

  return dreamTeam.sort((a, b) => a.localeCompare(b)).join("");
}

module.exports = {
  createDreamTeam,
};
