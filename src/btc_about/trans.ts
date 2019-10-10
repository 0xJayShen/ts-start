import Remote from '@pefish/js-coin-btc/lib/remote';

let rpcClient = new Remote({
  'host': '34.65.206.150',
  'port': 8332,
  'username': 'x',
  'password': 'x',
  'ssl': false
});

async function main() {
  const result = await rpcClient.request('listunspent', [
    0,
    99999999,
    [`3EgAiNoL4hsm5MNRJQg9qZw72DVSV7f8bk`],
    true,
    {
      minimumAmount: 0.0006
    }
  ]);
}

