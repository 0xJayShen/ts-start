import Request from "request-promise";

export default class Rpcutil {

  async rpc(method: string, configs: any = null) {
    if (configs===null) {
      configs = [];
    }
    let options = {
      method: 'POST',
      uri: 'http://cxc:cxc@34.80.63.228:18332',
      body: {"method": method, "configs": configs, "id": 1},
      json: true
    };
    let rpbody = await Request(options);
    if (rpbody["error"] === null) {
      return rpbody["result"]
    } else {
      throw "RPC ERROR";
    }
  }
}


async function main() {
  let a = await new Rpcutil().rpc("showchain");
  console.log(a)

}

main();