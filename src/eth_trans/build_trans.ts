import "@pefish/js-node-assist";
import WalletHelper from '@pefish/js-coin-eth/lib/wallet';
import Tx from 'ethereumjs-tx';

export default class Wallet extends WalletHelper {

  [x: string]: any;

  public constructor() {
    super();
  }

  buildTransaction(privateKey: string, toAddress: string, amount: string, nonce: number, gasPrice: string = null, gasLimit: string = '500000'): object {
    // logger.error(arguments)
    if (privateKey.startsWith('0x')) {
      privateKey = privateKey.substring(2, privateKey.length);
    }
    const privateKeyBuffer = new Buffer(privateKey, 'hex');
    if (!gasPrice) {
      gasPrice = '20000000000';
    }
    const rawTx = {
      nonce: nonce.toString().decimalToHexString_(),
      gasPrice: gasPrice.decimalToHexString_(),
      gasLimit: gasLimit.decimalToHexString_(),
      to: toAddress,
      value: amount.decimalToHexString_(),
      chainId: 99 //101 ddm  99 hdc
    };
    global.logger.debug(`rawTx: ${JSON.stringify(rawTx)}`);
    const tx =  new Tx(rawTx);
    console.log(    tx.getChainId())
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();
    const res = {
      txHex: '0x' + serializedTx.toString('hex'),
      txId: '0x' + tx.hash().toString('hex'),
      dataFee: tx.getDataFee().toString(10).multi_(gasPrice),
      allFee: tx.getBaseFee().toString(10).multi_(gasPrice),
      nonce: tx['nonce'].toDecimalString_().toNumber_(),
      gasPrice: tx['gasPrice'].toDecimalString_(),
      gasLimit: tx['gasLimit'].toDecimalString_(),
      to: tx['to'].toHexString_(),
      value: tx['value'].toDecimalString_(),
      data: tx['data'].toHexString_(),
      from: tx['from'].toHexString_()
    };
    console.log(res);
    return res;

  }


}

const helper = new Wallet();
const gasPrice = "10000000000";
const gasLimit = "150000";


async function main() {
  helper.buildTransaction(
      "0x5a44d96664404946b9aa51e8998f71646601e914dac2d856f34da247e0fdc566",
      "0xcb3173e9b727a56fd9474a32e2a68fef03f56c3e",
      "130000000000000000",
      4,
      gasPrice,
      gasLimit,
  );

}

main();