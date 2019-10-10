const RippleAPI = require('ripple-keypairs');
import CryptUtil from '@pefish/js-util-crypto';
function strLengthTrans(str) {
  let count = 0;
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (count >= 16) {
      break;
    }
    if ((i % 4) === 0) {
      newStr += str[i];
      count += 1;
    }
  }
  if (newStr.length !== 16) {
    throw "string length error";
  }
  return newStr;
}

function stringToBytes(str) {
  var ch, st, re = [];
  for (var i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i);  // get char
    st = [];                 // set up "stack"
    
    do {
      st.push(ch & 0xFF);  // push byte to stack
      ch = ch >> 8;          // shift value down by 1 byte
    }
    
    while (ch);
    // add stack contents to result
    // done because chars have "wrong" endianness
    re = re.concat(st.reverse());
  }
  return re;
}

function getAllBySeedAndIndex(seed, index) {
  let newStr = CryptUtil.sha256ToHex(seed + index);
  let useStr = strLengthTrans(newStr);
  let useBytes = stringToBytes(useStr);
  let secret = RippleAPI.generateSeed(useBytes);
  const keypair = RippleAPI.deriveKeypair(secret);
  const address = RippleAPI.deriveAddress(keypair.publicKey);
  return {
    secret:secret,
    address:address
  }
}
const seed = "3af29c97ae94a45788c22170d052a7d115cd838d51790aa0b68747af1a53b1b241a6d02a502196e6db10ea7cb9d5ffe510bee2a689e915dc8feeb30d3ad1f4cc0c"
const path = 83264638
let all = getAllBySeedAndIndex(seed,path)
console.log(all)
