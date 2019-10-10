import Request from "request-promise";

export default class RpcUtil {
  url: string;

  constructor(url) {
    this.url = url;
  }

  async rpc(requestType, key1 = '', value1 = '', key2 = '', value2 = '') {
    // key1,value1 之类是 get 的参数
    let options = {
      method: 'GET',
      uri: this.url,
      qs: {"requestType": requestType, key1: value1, key2: value2},
      json: true
    };
    let rpbody = await Request(options);
    console.log(rpbody["apiProxy"])
    return JSON.stringify(rpbody);
  }
}
let a = new RpcUtil("http://35.236.160.111:2082/wcg");
a.rpc("getBlockchainStatus", "height", "499790");