// import Api from '@parity/api';
//
// let provider = new Api.Provider.Http("http://localhost:7545");
// let client = new Api(provider);
//
// async function main() {
//   let a = client.eth.blockNumber();
//   console.log(a);
// }
//
// main();
import Web3 from 'web3'

let web3 = new Web3(new Web3.providers.HttpProvider('http://35.234.48.255:7545'));
console.log(web3.eth.getBlockNumber())