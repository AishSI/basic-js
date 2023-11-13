const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.resultCrypt = [];
    this.message = [];
    this.key = [];
    this.countCharNoDict = 0;
    this.tempCodeDate = {
      currCharKey: null,
      currCharKeyIndexInDict: null,
      currCharMessIndexInDict: null,
      currCharMess: null,
      currCharCodeIndexInDict: null,
    };
  }

  start(message, key) {
    this.countCharNoDict = 0;
    this.resultCrypt = [];
    this.message = [...message.toUpperCase()];
    this.key = [...key.toUpperCase()];
  }

  hasInDic(char) {
    if (this.alphabet.indexOf(char) === -1) {
      this.countCharNoDict += 1;
      this.resultCrypt.push(char);
      return false;
    } else {
      return true;
    }
  }

  print() {
    return this.direct
      ? this.resultCrypt.join("")
      : this.resultCrypt.reverse().join("");
  }

  encrypt(message, key) {
    try {
      this.start(message, key);
      let flag = "encrypt";

      this.message.forEach((item, index) => {
        if (!this.hasInDic(item)) {
          return;
        }
        this.currCodeItemDate(item, index, flag);
        this.resultCrypt.push(
          this.alphabet[this.tempCodeDate.currCharCodeIndexInDict % 26]
        );
      });

      return this.print();
    } catch {
      throw new Error("Incorrect arguments!");
    }
  }

  decrypt(encryptedMessage, key) {
    try {
      this.start(encryptedMessage, key);
      let flag = "decrypt";

      this.message.forEach((item, index) => {
        if (!this.hasInDic(item)) {
          return;
        }
        this.currCodeItemDate(item, index, flag);
        if (this.tempCodeDate.currCharCodeIndexInDict < 0) {
          this.tempCodeDate.currCharCodeIndexInDict =
            (this.tempCodeDate.currCharCodeIndexInDict + 26) % 26;
        }
        this.resultCrypt.push(
          this.alphabet[this.tempCodeDate.currCharCodeIndexInDict]
        );
      });
      return this.print();
    } catch {
      throw new Error("Incorrect arguments!");
    }
  }

  currCodeItemDate(item, index, flag) {
    //* буква в ключе по индексу (с учетом сдвига несловарных символов)
    this.tempCodeDate.currCharKey =
      this.key[(index - this.countCharNoDict) % this.key.length];

    //* индекс буквы из ключа в словаре
    this.tempCodeDate.currCharKeyIndexInDict = this.alphabet.indexOf(
      this.tempCodeDate.currCharKey
    );

    //* индекс буквы из сообщения в словаре
    this.tempCodeDate.currCharMessIndexInDict = this.alphabet.indexOf(item);

    //* буква из сообщения в словаре
    this.tempCodeDate.currCharMess =
      this.alphabet[this.tempCodeDate.currCharMessIndexInDict];

    //* предварительный индекс буквы после декодирования
    this.tempCodeDate.currCharCodeIndexInDict =
      this.tempCodeDate.currCharMessIndexInDict +
      this.tempCodeDate.currCharKeyIndexInDict * (flag === "encrypt" ? 1 : -1);
  }
}

module.exports = {
  VigenereCipheringMachine,
};
