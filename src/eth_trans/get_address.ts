// import BaseWallet from '@pefish/js-coin-eth/lib/wallet';
// export default class Wallet extends BaseWallet {
//   [x: string]: any;
//   // chain3: Chain3
//   public constructor() {
//     super()
//   }
// }
// let a = new Wallet()
// let b = a.getXprivBySeed("a".repeat(128))
// console.log(b.address)

// var bitcore = require('bitcore-lib');
// console.log(bitcore)
// var EthereumBip44 = require('ethereum-bip44');
// var key = new bitcore.HDPrivateKey();
// var derivedPubKey = key.derive("m/44'/60'/0'/0").hdPublicKey;
// // create the hd wallet
// var wallet = EthereumBip44.fromPublicSeed(derivedPubKey.toString());
// // output the first address
// console.log(wallet.getAddress(0));
// // output the second address
// console.log(wallet.getAddress(1));


import Wallet from '@pefish/js-coin-eth/lib/wallet';

let a = new Wallet();
const xpriv = a.getXprivBySeed('47ce45012752883133bd2a22b2fca73c1780e9ead9c3fe48801832befb75cf5446e3907accf5d3ce3dae0c16172b85030a4bcc8bb7fb69f5820f9682f3be017d');

let b = a.deriveAllByXprivPath(xpriv, `m/44'/5920'/4'/0/12`);
console.log(b)



