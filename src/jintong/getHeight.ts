var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
import TimeUtil from '@pefish/js-util-time';

const WS = require("ws");
var remote = new Remote({server: 'wss://s.jingtum.com:5020', local_sign: true});
// var remote = new Remote({server: 'wss://47.244.37.95:5020', local_sign: true});

var Server = jlib.Server;

function getHeight() {
  return new Promise(async (resolve, reject) => {
    remote.connect(function (err, result) {
      if (err) {
        console.log('err:', err);
      } else {
        TimeUtil.sleep(6000);
        var req = remote.requestLedgerClosed();
        req.submit(function (err, result) {
          if (err) {
            console.log('err:', err);
          } else {
            resolve(result["ledger_index"]);
          }
          // remote.disconnect();

        });
      }
    });
    // TimeUtil.sleep(10000).then(() => {
    //   reject(`_getHeightWithTimeout timeout 10 s`);
    // });

  });

}

async function ccc() {
  // let a = getHeight()
  // console.log(a)
  // await TimeUtil.setIntervalV2(async () => {
  //     try {
  //       let a = await getHeight();
  //       console.log(a)
  //     } catch (err) {
  //       global.logger.error(err);
  //     }
  //
  //   }, 6000);
  let a = await getHeight();
  console.log(a);
}

ccc();
