var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'wss://s.jingtum.com:5020', local_sign: true});

function getList() {
  return new Promise((resolve, reject) => {
    remote.connect(function (err, result) {
      if (err) {
        return console.log('err:', err);
      }
      var options = {
        account: 'jHX4H6XFDp6eMT5jfeo1JYK8fQ847LTdVq',
        limit: 500,
        ledger_min: 111111,
        ledger_max: 13668037
      };
      var req = remote.requestAccountTx(options);
      req.submit(function (err, result) {
        if (err) {
          console.log('err:', err);
        } else if (result) {
          let txids =[]
          for (let i of result['transactions']) {
            
            txids.push(i["hash"]);
          }
          resolve(txids.length);
          
        }
        remote.disconnect();
        
      });
    });
    
  });
}

async function vvv() {
  let cc = await getList();
  console.log(cc);
}

vvv();