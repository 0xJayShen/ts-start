import Request from "request-promise";

export default class SwtcRemoteHelper {

  url: string;

  constructor(url) {
    this.url = url;
  }

  async baseJsonRpc(method, params = []) {

    let options = {
      method: 'POST',
      uri: `${this.url}`,
      body: {"jsonrpc": "2.0", "method": method, "params": params, "id": 1},
      json: true
    };
    let rpbody = await Request(options);
    return rpbody;
  }

  async getTransByHeight(blockHeight) {

    let res = await this.baseJsonRpc("ddm_getBlockByNumber", [blockHeight]);
    return res;
  }

  async getInfoByHash(txId) {
    let res = await this.baseJsonRpc("ddm_getTxByHash", [txId]);
    return res;
  }

  async sign(from, to, value, gas, gasLimit, wif, nonce) {
    let res = await this.baseJsonRpc("ddm_signTxWithPassword", [{
      "from": from,
      "to": to,
      "value": value,
      "gas": gasLimit,
      "gasPrice": gas,
      "nonce": nonce
    }, wif]);
    return res;
  }
  async sendRaw(raw){
    let res = await this.baseJsonRpc("ddm_sendRawTx", [raw]);
    return res;
  }
  async getAccountInfo(address){
    let res = await this.baseJsonRpc("ddm_getAccountInfo", [address]);
    return res;
  }
}

