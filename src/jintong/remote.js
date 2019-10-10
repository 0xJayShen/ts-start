/**
 * Created by wudan on 2017/7/25.
 */
var Remote  = require('jingtum-lib').Remote;
var remote = new Remote({
		"server":"wss://s.jingtum.com:5020",
		"local_sign":true
	});


remote.connect(function (err, data) {
    if (err) {
        console.log('fail connect jingtum' + err);
    } else {
        console.log('connect to jingtum');

        remote.on('disconnect', function () {
            console.log('disconnect to jingtum');
        });

        remote.on('reconnect', function () {
            console.log('reconnect to jingtum');
        });

        remote.on('transactions', function (tx) {
            //logger.info('remote get transactions:',tx);
        });
    }
});


module.exports = remote;

