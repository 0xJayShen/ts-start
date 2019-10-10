import ErrorHelper from '@pefish/js-error';
import BaseBitcoinWallet from '@pefish/js-coin-btc/lib/base/base_bitcoinjs_lib';

export default class Wallet extends BaseBitcoinWallet {
  [x: string]: any;

  decimals: number = 8;
  bitcoinLib: any;

  public constructor() {
    super();
    this.bitcoinLib = require('@pefish/bitcoinjs-lib');
  }

}
let a = new Wallet();
let b = a.getAllFromWif('L5nNnEKwmb1Yxh6neMKn5Srum3NBjTpPtNHFpNPJS3Dqh2yTcsyy', "mainnet");
console.log(b);

// logger.error(result)