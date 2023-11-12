const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },

  addLink(value = " ") {
    this.chain.push(value);
    return this;
  },

  removeLink(position) {
    if (!(position % 1) && position > 0 && position <= this.chain.length) {
      this.chain.splice(position - 1, 1);
      return this;
    } else {
      this.chain = [];
      throw new Error(`You can't remove incorrect link!`);
    }
  },

  reverseChain() {
    this.chain.reverse();
    return this;
  },

  finishChain() {
    const res = this.chain.map((item) => `( ${item} )`).join("~~");
    this.chain = [];
    return res;
  },
};

module.exports = {
  chainMaker,
};
