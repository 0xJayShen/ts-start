var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'wss://s.jingtum.com:5020', local_sign: true});

function getTransById(txId) {
  return new Promise((resolve, reject) => {
    remote.connect(function (err, result) {
      if (err) {
        console.log('err:', err);
      } else {
        var req =  remote.requestTx({hash: txId});
        req.submit(function (err, result) {
          if (err) {
            console.log('err:', err);
          } else if (result) {
            let _ret = jlib.utils.processTx(result,result.Account)
            _ret.account = result.Account
            _ret.ledger = result.inLedger;
            resolve(_ret)
          }
          remote.disconnect();
        });
      }
    });
  });
  
}

async function ccc() {
  let cc = await getTransById("FD9CD84CA17C6FA5BED1FBEE59B2B8654D148D5B9F9A8F86ABA108C826B72395");
  console.log(cc);
}

ccc();