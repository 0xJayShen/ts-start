var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'wss://s.jingtum.com:5020', local_sign: true});

function send(sourceAddress, sourceSecret, toAddress, amount, currency, issuer, memos = "",) {
  return new Promise((resolve, reject) => {
    remote.connect(function (err, result) {
      if (err) {
        console.log('err:', err);
      } else {
        var tx = remote.buildPaymentTx({
          account: sourceAddress,
          to: toAddress,
          amount: {
            "value": amount,
            "currency": currency,
            "issuer": issuer
          }
        });
        tx.setSecret(sourceSecret);
        tx.addMemo(memos);//可选
        tx.submit(function (err, result) {
          if (err) {
            console.log('err:', err);
          } else if (result) {
            console.log('res:', result);
          }
          remote.disconnect();
        });
      }
    });
  });
  
}

async function ccc() {
  let cc = await send("jHX4H6XFDp6eMT5jfeo1JYK8fQ847LTdVq","shhoJgaVLWbn4dF7aoTnnTsM9KJP8","j9fy4mhUkFkdr1ShbzDXwDi9ykuNSEDMN4",0.003,"CSP","jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or","999");
  console.log(cc);
}

ccc();