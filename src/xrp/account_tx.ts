let RippleAPI = require('ripple-lib').RippleAPI;
let api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});


function accountTx(address, minIndex, maxIndex) {
  return new Promise((resolve, reject) => {
    api.connect().then(() => { // Omit this if you are already connected
      api.request('account_tx', {
        "account": address,
        "binary": false,
        "forward": false,
        "ledger_index_max": maxIndex,
        "ledger_index_min": minIndex,
        "limit": 200
      }).then(response => {
        /* Do something useful with response */
        resolve(response["transactions"]);
      }).then(() => {
            return api.disconnect();
          }
      ).catch(console.error);
    });
  });
}

let fromAddress = "raMNvazjM8pHuQ8ra3YM2EFn5TtswkiURx";
let minIndex = -1;
let maxIndex = -1;

async function main() {
  let cc = await accountTx(fromAddress, minIndex, maxIndex);
  console.log(cc);
}

main();