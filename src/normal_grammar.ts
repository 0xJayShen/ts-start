import HttpRequestUtil from '@pefish/js-util-httprequest';

import BtcApiHelper from '@pefish/js-coin-btc/lib/api'
async function main() {
   let helper = new BtcApiHelper('https://api.blockcypher.com/v1/btc/main',"e403a4823670493881bcf687888931d2")
 const result = await helper.getBalance('17upV8v3DSEqx8yATcTMUsV3RY6zFZG96k')
  console.log(result)
}
main()