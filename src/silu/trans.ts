import BigNumber from './bignumber.js'
async function getUtxo(address){


}
async function sendMain(fromAddress, toAddress,amount,fee,) {
  const amountSat = new BigNumber(amount).times(1e8)
    const feeSat = new BigNumber(fee).times(1e8)
    const pubkeyRes = await ledger.silubium.getWalletPublicKey(path)
    if (pubkeyRes.bitcoinAddress !== from) {
      throw 'Ledger can not restore the source address, please plugin the correct ledger'
    }
    let totalSelectSat = new BigNumber(0)
    const inputs = []
    const paths = []
    const selectUtxo = silubiumJsLib.utils.selectTxs(utxoList, amount, fee)
    const rawTxCache = {}
    for(let i = 0; i < selectUtxo.length; i++) {
      const item = selectUtxo[i]
      if (!rawTxCache[item.hash]) {
        rawTxCache[item.hash] = await rawTxFetchFunc(item.hash)
      }
      paths.push(path)
      totalSelectSat = totalSelectSat.plus(item.value)
      inputs.push([
        await ledger.silubium.splitTransaction(rawTxCache[item.hash]),
        item.pos
      ])
    }
    const outputs = new silubiumJsLib.TransactionBuilder(keyPair.network)
    outputs.addOutput(to, amountSat.toNumber())
    const changeSat = totalSelectSat.minus(amountSat).minus(feeSat)
    outputs.addOutput(from, changeSat.toNumber())
    const outputsScript = outputs.buildIncomplete().toHex().slice(10, -8)
    return await ledger.silubium.createPaymentTransactionNew(inputs, paths, undefined, outputsScript)
}