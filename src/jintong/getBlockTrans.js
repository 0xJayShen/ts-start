var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'wss://s.jingtum.com:5020', local_sign: true});

function getTrans(blockHeight) {
  return new Promise((resolve, reject) => {
    remote.connect(function (err, result) {
      if (err) {
        console.log('err:', err);
      } else {
        var req = remote.requestLedger({
          ledger_index: blockHeight,
          transactions: true
        });
        req.submit(function (err, result) {
          if (err) {
            console.log('err:', err);
          } else if (result) {
            resolve(result['transactions']);
          }
          remote.disconnect()
        });
      }
    });
  });
  
}

async function ccc() {
  let cc = await getTrans(13651277);
  console.log(cc);
}

ccc();