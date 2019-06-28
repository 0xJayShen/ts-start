

async function f1(): Promise<string> {
  sleep(10000);
  return "f1";
}

async function f2(): Promise<string> {
  return "f2";

}

async function f3(): Promise<string> {
  return "f3";
}

async function res() {
  //串行,下个依赖上面那个
  let a: string = await f1();
  let b: string = a + await f2();
  let c: string = b + await f3();
  console.log(a);
  console.log(b);
  console.log(c);
  // f1
  // f1f2
  // f1f2f3
}

async function res2() {
  //并发处理
  let a: string = await f1();
  let b: string = await f2();
  let c: string = await f3();
  await Promise.all([a, b, c]);
  console.log(a, b, c);
}


res();
// res2()

