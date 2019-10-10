var bitcoinjs = require('bitcoinjs-lib');
import abi from 'ethjs-abi';
import BigNumber from "./bignumber.js";

let OPS = {
  "OP_FALSE": 0,
  "OP_0": 0,
  "OP_PUSHDATA1": 76,
  "OP_PUSHDATA2": 77,
  "OP_PUSHDATA4": 78,
  "OP_1NEGATE": 79,
  "OP_RESERVED": 80,
  "OP_1": 81,
  "OP_TRUE": 81,
  "OP_2": 82,
  "OP_3": 83,
  "OP_4": 84,
  "OP_5": 85,
  "OP_6": 86,
  "OP_7": 87,
  "OP_8": 88,
  "OP_9": 89,
  "OP_10": 90,
  "OP_11": 91,
  "OP_12": 92,
  "OP_13": 93,
  "OP_14": 94,
  "OP_15": 95,
  "OP_16": 96,

  "OP_NOP": 97,
  "OP_VER": 98,
  "OP_IF": 99,
  "OP_NOTIF": 100,
  "OP_VERIF": 101,
  "OP_VERNOTIF": 102,
  "OP_ELSE": 103,
  "OP_ENDIF": 104,
  "OP_VERIFY": 105,
  "OP_RETURN": 106,

  "OP_TOALTSTACK": 107,
  "OP_FROMALTSTACK": 108,
  "OP_2DROP": 109,
  "OP_2DUP": 110,
  "OP_3DUP": 111,
  "OP_2OVER": 112,
  "OP_2ROT": 113,
  "OP_2SWAP": 114,
  "OP_IFDUP": 115,
  "OP_DEPTH": 116,
  "OP_DROP": 117,
  "OP_DUP": 118,
  "OP_NIP": 119,
  "OP_OVER": 120,
  "OP_PICK": 121,
  "OP_ROLL": 122,
  "OP_ROT": 123,
  "OP_SWAP": 124,
  "OP_TUCK": 125,

  "OP_CAT": 126,
  "OP_SUBSTR": 127,
  "OP_LEFT": 128,
  "OP_RIGHT": 129,
  "OP_SIZE": 130,

  "OP_INVERT": 131,
  "OP_AND": 132,
  "OP_OR": 133,
  "OP_XOR": 134,
  "OP_EQUAL": 135,
  "OP_EQUALVERIFY": 136,
  "OP_RESERVED1": 137,
  "OP_RESERVED2": 138,

  "OP_1ADD": 139,
  "OP_1SUB": 140,
  "OP_2MUL": 141,
  "OP_2DIV": 142,
  "OP_NEGATE": 143,
  "OP_ABS": 144,
  "OP_NOT": 145,
  "OP_0NOTEQUAL": 146,
  "OP_ADD": 147,
  "OP_SUB": 148,
  "OP_MUL": 149,
  "OP_DIV": 150,
  "OP_MOD": 151,
  "OP_LSHIFT": 152,
  "OP_RSHIFT": 153,

  "OP_BOOLAND": 154,
  "OP_BOOLOR": 155,
  "OP_NUMEQUAL": 156,
  "OP_NUMEQUALVERIFY": 157,
  "OP_NUMNOTEQUAL": 158,
  "OP_LESSTHAN": 159,
  "OP_GREATERTHAN": 160,
  "OP_LESSTHANOREQUAL": 161,
  "OP_GREATERTHANOREQUAL": 162,
  "OP_MIN": 163,
  "OP_MAX": 164,

  "OP_WITHIN": 165,

  "OP_RIPEMD160": 166,
  "OP_SHA1": 167,
  "OP_SHA256": 168,
  "OP_HASH160": 169,
  "OP_HASH256": 170,
  "OP_CODESEPARATOR": 171,
  "OP_CHECKSIG": 172,
  "OP_CHECKSIGVERIFY": 173,
  "OP_CHECKMULTISIG": 174,
  "OP_CHECKMULTISIGVERIFY": 175,

  "OP_NOP1": 176,
  "OP_NOP2": 177,
  "OP_CHECKLOCKTIMEVERIFY": 177,

  "OP_NOP3": 178,
  "OP_NOP4": 179,
  "OP_NOP5": 180,
  "OP_NOP6": 181,
  "OP_NOP7": 182,
  "OP_NOP8": 183,
  "OP_NOP9": 184,
  "OP_NOP10": 185,

  "OP_CREATE": 193,
  "OP_CALL": 194,
  "OP_SPEND": 195,

  "OP_GAS_PRICE": 245,
  "OP_VERSION": 246,
  "OP_GAS_LIMIT": 247,
  "OP_DATA": 248,
  "OP_SMALLINTEGER": 250,
  "OP_PUBKEYS": 251,
  "OP_PUBKEYHASH": 253,
  "OP_PUBKEY": 254,
  "OP_INVALIDOPCODE": 255
};

export function selectTxs(unspentTransactions, amount, fee) {
  //sort the utxo
  var matureList = [];
  var immatureList = [];
  for (var i = 0; i < unspentTransactions.length; i++) {
    if (unspentTransactions[i].confirmations >= 500 || unspentTransactions[i].isStake === false) {
      matureList[matureList.length] = unspentTransactions[i];
    } else {
      immatureList[immatureList.length] = unspentTransactions[i];
    }
  }
  matureList.sort(function (a, b) {
    return a.value - b.value;
  });
  immatureList.sort(function (a, b) {
    return b.confirmations - a.confirmations;
  });
  unspentTransactions = matureList.concat(immatureList);

  var value = new BigNumber(amount).plus(fee).times(1e8);
  var find = [];
  var findTotal = new BigNumber(0);
  for (var i = 0; i < unspentTransactions.length; i++) {
    var tx = unspentTransactions[i];
    findTotal = findTotal.plus(tx.value);
    find[find.length] = tx;
    if (findTotal.greaterThanOrEqualTo(value)) break;
  }
  if (value.greaterThan(findTotal)) {
    throw new Error('You do not have enough SILUBIUM to send');
  }
  return find;
}

async function buildPubKeyHashTransaction(keyPair, to, amount, fee, utxoList) {
  //发送主网币
  var from = keyPair.getAddress();
  var inputs = selectTxs(utxoList, amount, fee);
  var tx = new bitcoinjs.TransactionBuilder(keyPair.network);
  var totalValue = new BigNumber(0);
  var value = new BigNumber(amount).times(1e8);
  var sendFee = new BigNumber(fee).times(1e8);
  for (var i = 0; i < inputs.length; i++) {
    tx.addInput(inputs[i].hash, inputs[i].pos);
    totalValue = totalValue.plus(inputs[i].value);
  }
  tx.addOutput(to, new BigNumber(value).toNumber());
  if (totalValue.minus(value).minus(sendFee).toNumber() > 0) {
    tx.addOutput(from, totalValue.minus(value).minus(sendFee).toNumber());
  }
  for (var i = 0; i < inputs.length; i++) {
    tx.sign(i, keyPair);
  }
  return tx.build().toHex();
}

// async function sendTrans() {
//   调用api 方法
// }

async function encodeSendData(toAddress, amount) {
  return 'a9059cbb' + abi.encodeParams(['address', 'uint256'], ['0x' + bitcoinjs.address.fromBase58Check(toAddress)['hash'].toString('hex'), amount * Math.pow(10, 8)]).substr(2);
}

async function buildSendToContractTransaction(keyPair, contractAddress, encodedData, gasLimit, gasPrice, fee, utxoList) {
  //发送代币
  var from = keyPair.getAddress();
  var amount = 0;
  fee = new BigNumber(gasLimit).times(gasPrice).div(1e8).add(fee).toNumber();
  var inputs = selectTxs(utxoList, amount, fee);
  var tx = new bitcoinjs.TransactionBuilder(keyPair.network);
  var totalValue = new BigNumber(0);
  var sendFee = new BigNumber(fee).times(1e8);
  for (var i = 0; i < inputs.length; i++) {
    tx.addInput(inputs[i].hash, inputs[i].pos);
    totalValue = totalValue.plus(inputs[i].value);
  }
  var contract = bitcoinjs.script.compile([
    OPS.OP_4,
    number2Buffer(gasLimit),
    number2Buffer(gasPrice),
    hex2Buffer(encodedData),
    hex2Buffer(contractAddress),
    OPS.OP_CALL
  ]);
  tx.addOutput(contract, 0);
  if (totalValue.minus(sendFee).toNumber() > 0) {
    tx.addOutput(from, totalValue.minus(sendFee).toNumber());
  }
  for (var i = 0; i < inputs.length; i++) {
  }
  tx.sign(i, keyPair);
  return tx.build().toHex();

}


function number2Buffer(num) {
  var buffer = [];
  var neg = (num < 0);
  num = Math.abs(num);
  while (num) {
    buffer[buffer.length] = num & 0xff;
    num = num >> 8;
  }

  var top = buffer[buffer.length - 1];
  if (top & 0x80) {
    buffer[buffer.length] = neg ? 0x80 : 0x00;
  } else if (neg) {
    buffer[buffer.length - 1] = top | 0x80;
  }
  return Buffer.from(buffer);
}

function hex2Buffer(hexString) {
  var buffer = [];
  for (var i = 0; i < hexString.length; i += 2) {
    buffer[buffer.length] = (parseInt(hexString[i], 16) << 4) | parseInt(hexString[i + 1], 16);
  }
  return Buffer.from(buffer);
}
