function rand(m) {
  m = m > 16 ? 16 : m;
  var num = Math.random().toString();
  if (num.substr(num.length - m, 1) === '0') {
    return rand(m);
  }
  return num.substring(num.length - m);
}

console.log(rand(15));