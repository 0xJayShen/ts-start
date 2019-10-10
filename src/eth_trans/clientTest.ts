import Request from "request-promise";
import '@pefish/js-node-assist';


export default class Remote {
  url: string;

  constructor(url) {
    this.url = url;
  }

  async rpc(method, params = []) {
    // key1,value1 之类是 get 的参数
    let options = {
      method: 'POST',
      uri: this.url,
      json: true,
      timeout: 60000,
      body: {
        "jsonrpc": "2.0",
        "method": method,
        "params": params,
        "id": 1
      },
    };
    let rpbody = await Request(options);
    return rpbody;
  }

  async getBlockNum() {
    let res = await this.rpc("eth_blockNumber");
    return res["result"].hexToNumber_();
  }

  async getTransactionByHash(hash) {
    let res = await this.rpc("eth_getTransactionByHash", [hash,]);
    return res["result"];
  }

  async getBlockByNumber(blockNum) {
    let blockHash = "0x" + blockNum.numberStrToHex_()
    let res = await this.rpc("eth_getBlockByNumber", [blockHash, true]);

    console.log(JSON.stringify(res));
    return res["result"];
  }

  async getBalance(address) {
    let res = await this.rpc("eth_getBalance", [address, "pending"]);
    return res["result"].hexToNumber_();

  }
}
new Remote('https://ethereumclassic.network/').getBlockByNumber(8604937);