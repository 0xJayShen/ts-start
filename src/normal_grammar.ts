let a: { [name: string]: any };
a = {"a": 1, "b": 2};
let {b} = a;
console.log(b);//2
let c = {...a};
console.log(c);//{ a: 1, b: 2 }