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
    this.result_crypt = [];
    this.message = [];
    this.key = [];
    this.countCharNoDict = 0;
  }

  start(message, key) {
    this.countCharNoDict = 0;
    this.result_crypt = [];
    this.message = [...message.toUpperCase()];
    this.key = [...key.toUpperCase()];
  }

  hasInDic(char) {
    if (this.alphabet.indexOf(char) === -1) {
      this.countCharNoDict += 1;
      this.result_crypt.push(char);
      return false;
    } else {
      return true;
    }
  }

  print() {
    return this.direct
      ? this.result_crypt.join("")
      : this.result_crypt.reverse().join("");
  }

  encrypt(message, key) {
    try {
      this.start(message, key);

      this.message.forEach((item, index) => {
        if (this.hasInDic(item)) {
          const mesCharIndexInDict = this.alphabet.indexOf(item);
          const keyChar =
            this.key[(index - this.countCharNoDict) % this.key.length];
          const keyCharIndexInDict = this.alphabet.indexOf(keyChar);
          const encrypCharIndex =
            (mesCharIndexInDict + keyCharIndexInDict) % 26;
          const encrypChar = this.alphabet[encrypCharIndex];

          this.result_crypt.push(encrypChar);
        }
      });

      return this.print();
    } catch {
      throw new Error("Incorrect arguments!");
    }
  }

  decrypt(encryptedMessage, key) {
    try {
      this.start(encryptedMessage, key);

      this.message.forEach((item, index) => {
        if (this.hasInDic(item)) {
          // let currCharKey =
          //   this.key[(index - this.countCharNoDict) % this.key.length]; //* буква в ключе по индексу (с учетом сдвига несловарных символов)
          // let currCharKeyIndexInDict = his.alphabet.indexOf(currCharKey); //* индекс буквы из ключа в словаре
          // let currCharMessIndexInDict = this.alphabet.indexOf(item); //* индекс буквы из сообщения в словаре
          // let currCharMess = this.alphabet[currCharMessIndexInDict]; //* буква из сообщения в словаре

          // let currCharCodeIndexInDict =
          //   currCharMessIndexInDict - currCharKeyIndexInDict; //* индекс буквы после доекодирования
          // if (currCharCodeIndexInDict < 0) {
          //   (currCharCodeIndexInDict + 26) % 26;
          // }

          // let currCharCode = this.alphabet[currCharCodeIndexInDict];
          // this.result_crypt.push(currCharCode);

          this.result_crypt.push(
            this.alphabet[
              (this.alphabet.indexOf(item) -
                this.alphabet.indexOf(
                  this.key[(index - this.countCharNoDict) % this.key.length]
                ) >
              0
                ? this.alphabet.indexOf(item) -
                  this.alphabet.indexOf(
                    this.key[(index - this.countCharNoDict) % this.key.length]
                  )
                : this.alphabet.indexOf(item) -
                  this.alphabet.indexOf(
                    this.key[(index - this.countCharNoDict) % this.key.length]
                  ) +
                  26) % 26
            ]
          );
        }
      });
      return this.print();
    } catch {
      throw new Error("Incorrect arguments!");
    }
  }
}

const directMachine = new VigenereCipheringMachine();
console.log(
  `🚀 ~ directMachine.encrypt("attack at dawn!", "alphonse"):`,
  directMachine.encrypt("attack at dawn!", "alphonse")
);

module.exports = {
  VigenereCipheringMachine,
};
