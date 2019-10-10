import TransactionUtils from './silubiumjs/src/transactionUtils';
// var PrivateKey = require('./lib/privatekey');
// var HdPrivateKey = require("./lib/hdprivatekey");
// var valid = Address.isValid('SLUTnB3xh9JsQkkW4RenE9tgczf8U4QfhuAJ');
//
// console.log(`valid --------- ${valid}`);
//
// let parent_ = HdPrivateKey.fromSeed('3af29c97ae94a45788c170d052a7d115cd838d51790aa0b68747af1a53b1b241a6d02a502196e6db10ea7cb9d5ffe510bee2a689e915dc8feeb30d3ad1f4cc0c');
// let xprv = parent_.derive("m/44'/60'/0'/0/2/21212312").toString();
// let keyPair = new HdPrivateKey(xprv).toObject();

import Silubium from "./silubiumjs/src/silubium";


async function main() {
  Silubium.SetEnvironmental({env: "production"});

  let keyPair = Silubium.RestoreKeypairFromWif("L3XRbRxwaExp3ijbA2toxg9xUmYtbSv71BJpjB6ZZmD2Fhxk9X6Q");

  let a = await TransactionUtils.TransactionToken("56465a84d048dfcaa06ef5bd818ecd257b139cd0", keyPair, "SLUjeGwZ33xzCHVGdXXoZne5GKs72wusR26A", 1,);
  console.log(a);
}

main();