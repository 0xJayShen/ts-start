// import A from './src/a';
// import B from './src/b';
//
// let a_: A;
// a_ = new A("a", 13);
// a_.print_name();
//
// console.log("---".repeat(10));
//
// let b_: B;
// b_ = new B("b", 12);
// b_.print_age();
// b_.print_name();
// let dict: { [index: string]: any; }={};
// dict["name"] = 1;
// console.log(dict);
function sleep(second) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('request done! ' + Math.random());
        }, second);
    });
}
//# sourceMappingURL=start.js.map