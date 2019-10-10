var PrivateKey = require('./lib/privatekey');
var HdPrivateKey = require("./lib/hdprivatekey");


var Address = require('./lib/address');
var PrivateKey = require('./lib/privatekey');
var HDPrivateKey = require("./lib/hdprivatekey");

export default class SluWallet {
  getMasterPairBySeed(seed) {

    let masterPair = HDPrivateKey.fromSeed('01234567890abcdef01234567890abcdef');
    return masterPair;
  }

  getXprv(masterPair, path) {
    return masterPair.derive(path).toString();
  }

  getAddress(xprv) {
    let obj = new HDPrivateKey(xprv).toObject();
    let privkey = new PrivateKey(obj['privateKey']);
    return "SL" + privkey.toPublicKey().toAddress("livenet").toString();
  }

  isAddress(address) {
    return Address.isValid(address);
  }

  getAllFromSeedPath(seed, path) {
    let masterPair = this.getMasterPairBySeed(seed);
    let xprv = this.getXprv(masterPair, path);
    let obj = new HDPrivateKey(xprv).toObject();
    let privkey = new PrivateKey(obj['privateKey']);
    console.log({
          "address": "SL" + privkey.toPublicKey().toAddress("livenet").toString(),
          "wif": privkey.toWIF()
        }
    );
    return {
      "address": "SL" + privkey.toPublicKey().toAddress("livenet").toString(),
      "wif": privkey.toWIF()
    };
  }
}

let a  = new SluWallet().getAllFromSeedPath("3af29c97ae94a45788c170d052a7d115cd838d51790aa0b68747af1a53b1b241a6d02a502196e6db10ea7cb9d5ffe510bee2a689e915dc8feeb30d3ad1f4cc0c","m/44'/5920'/0'/0/2/44333334")
console.log(a)