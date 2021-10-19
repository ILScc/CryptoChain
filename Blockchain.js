const SHA256 = require("crypto-js/sha256");
class CryptoBlock {
  constructor(currentTime, info) {
    this.currentTime = currentTime;
    this.info = info;

    this.index = 0;
    this.prevHash = null;
    this.hash = this.computeHash();
  }
  computeHash() {
    return SHA256(`${this.info}${this.prevHash}${this.currentTime}`);
  }
}

class Blockchain {
  constructor() {
    this.blockChain = [this.initGenesisBlock()];
  }
  initGenesisBlock() {
    return new CryptoBlock(new Date().toString(), "GenesisBlock");
  }
  lastBlock() {
    return this.blockChain[this.blockChain.length - 1];
  }
  addNewBlock(newBlock) {
    try {
      newBlock.index = this.lastBlock().index + 1;
      newBlock.prevHash = this.latestBlock().hash;
      newBlock.hash = newBlock.computeHash();

      this.blockChain.push(newBlock);
      this.checkValidity();
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }
  checkValidity() {
    for (let i = 1; i < this.blockChain.length; i++) {
      const currentBlock = this.blockChain[i];
      const prevBlock = this.blockChain[i - 1];

      if (
        JSON.stringify(currentBlock.hash) !==
        JSON.stringify(currentBlock.computeHash())
      ) {
        console.log(currentBlock.hash, currentBlock.computeHash());
        throw new Error("Invalid current hash");
      }

      if (currentBlock.prevHash !== prevBlock.hash) {
        throw new Error("Invalid prev hash");
      }
      return true;
    }
  }
}

let blockchain = new Blockchain();

blockchain.addNewBlock(
  new CryptoBlock(1, new Date(), {
    sender: "Rabin Yitzack",
    recipient: "Loyd Eve",
    quantity: 20,
  })
);

blockchain.addNewBlock(
  new CryptoBlock(new Date(), {
    sender: "Anita Vyona",
    recipient: "Felix Mush",
    quantity: 349,
  })
);

blockchain.addNewBlock(
  new CryptoBlock(new Date(), {
    sender: "Lolita Antonio",
    recipient: "Billy Harrington",
    quantity: 500,
  })
);

// delete blockchain.blockChain[0].hash;
console.log(JSON.stringify(blockchain, null, 2));
