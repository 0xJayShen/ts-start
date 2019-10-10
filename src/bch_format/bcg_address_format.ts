import Wallet from "@pefish/js-coin-bch/lib/wallet"
let wallet = new Wallet()
// let res = wallet.getCashAddrFromLegacyAddr("33DcdsKg9uAme8eJZPDjRr8TNB2DcGvJ6u")
// console.log(`${res}`)

let res = wallet.getLegacyAddrFromCashAddr("bitcoincash:qrrx4kx79w8wfvrtxeptgwlhq8v4udxmv5sk4m24zc")
console.log(`${res}`)

