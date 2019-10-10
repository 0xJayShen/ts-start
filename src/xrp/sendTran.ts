// let RippleAPI = require('ripple-lib').RippleAPI;
// let api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});

function quit(message) {
  console.log(message);
  process.exit(0);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function send(from, fromSecret, to, amount) {
  const instructions = {maxLedgerVersionOffset: 5};
  const payment = {
    source: {
      address: from,
      maxAmount: {
        value: amount,
        currency: 'XRP'
      }
    },
    destination: {
      address: to,
      amount: {
        value: amount,
        currency: 'XRP'
      }
    }
  };
  return new Promise((resolve, reject) => {
        api.connect().then(() => {
          console.log('Connected...');
          api.preparePayment(from, payment, instructions).then(prepared => {
            // console.log('Payment transaction prepared...');
            const {signedTransaction} = api.sign(prepared.txJSON, fromSecret);
            // console.log('Payment transaction signed...');
            api.submit(signedTransaction).then((res) => {
              resolve(res);
            }).then(() => {
              return api.disconnect();
            });

          });

        }).catch(console.error);
      }
  );
}

async function main() {
  let aaa = await send("raMNvazjM8pHuQ8ra3YM2EFn5TtswkiURx", "sswdK7NNqvnRmxJtgrBCsArA47NNg", "r91N3HA3dBdooyK8eF2qEVYF2pbyhWnhqu", "1");
  console.log(aaa);
}

main();