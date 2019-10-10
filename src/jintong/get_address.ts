var Wallet = require('jingtum-base-lib').Wallet;
import CryptUtil from '@pefish/js-util-crypto';

var keyPair = require('jingtum-base-lib/src/keypairs');
var addressCodec = require("swtc-address-codec")();
var wallet2 = Wallet.fromSecret('ssP1fAMEuPn7zdTCkK4BDfHdsjRCW');//get a wallet by secret
console.log(wallet2);
// console.log(Wallet.isValidAddress("jHX4H6XFDp6eMT5jfeo1JYK8fQ847LTdVq"))
// function stringToBytes(str) {
//   var ch, st, re = [];
//   for (var i = 0; i < str.length; i++) {
//     ch = str.charCodeAt(i);  // get char
//     st = [];                 // set up "stack"
//
//     do {
//       st.push(ch & 0xFF);  // push byte to stack
//       ch = ch >> 8;          // shift value down by 1 byte
//     }
//
//     while (ch);
//     // add stack contents to result
//     // done because chars have "wrong" endianness
//     re = re.concat(st.reverse());
//   }
//   // return an array of bytes
//   return re;
// }
//
// function strLengthTrans(str) {
//   //更改长度为 16 位字符串
//   let count = 0;
//   let newStr = "";
//   for (let i = 0; i < str.length; i++) {
//     if (count >= 16) {
//       break;
//     }
//     if ((i % 4) === 0) {
//       newStr += str[i];
//       count += 1;
//     }
//   }
//   if (newStr.length !== 16){
//     throw "string length error"
//   }
//   return newStr;
// }
// keyPair.generateSeed = function (seed, index) {
//   let newStr = CryptUtil.sha256ToHex(seed + index)
//   //翻转后转换为长度为 16 的字符串
//   let useStr = strLengthTrans(newStr);
//   //转换为 bytes
//   let useBytes = stringToBytes(useStr);
//   return addressCodec.encodeSeed(useBytes, "secp256k1");
// };
// let c = keyPair.generateSeed("3af29c97ae94a45788c170d052a7d115cd838d51790aa0b68747af1a53b1b241a6d02a502196e6db10ea7cb9d5ffe510bee2a689e915dc8feeb30d3ad1f4cc0c", "323211");
// console.log(c);