var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'wss://s.jingtum.com:5020', local_sign: true});

function getBalance(address, currency = "SWT", issuer = "") {
  if (currency == "SWT" && issuer == "") {
    return new Promise((resolve, reject) => {
      remote.connect(function (err, result) {
        if (err) {
          return console.log('err:', err);
        }
        var options = {account: address};
        var req = remote.requestAccountInfo(options);
        
        req.submit(function (err, result) {
          if (err) {
            console.log('err:', err);
          } else if (result) {
            // console.log('res:', result);
            resolve(result["account_data"]["Balance"].toString().);
            // return result["account_data"]["Balance"];
          }
          remote.disconnect();
          
        });
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      remote.connect(function (err, result) {
        if (err) {
          reject(err);
          console.log('err:', err);
        }
        var options = {account: address, type: 'trust'};
        var req = remote.requestAccountRelations(options);
        
        req.submit(function (err, result) {
          if (err) {
            reject(err);
          } else if (result) {
            for (let i of result['lines']) {
              if (i["currency"] == currency && i["account"] == issuer) {
                resolve(i["balance"]);
              }
            }
          }
          remote.disconnect();
          
        });
      });
    });
  }
}

async function aaa() {
  let a = await getBalance("jHX4H6XFDp6eMT5jfeo1JYK8fQ847LTdVq", "CSP", "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or");
  console.log(a);
  let b = await getBalance("jHX4H6XFDp6eMT5jfeo1JYK8fQ847LTdVq",);
  console.log(b);
}

aaa();