var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var a;
a = { "a": 1, "b": 2 };
var b = a.b;
console.log(b); //2
var c = __assign({}, a);
console.log(c); //{ a: 1, b: 2 }
//# sourceMappingURL=normal_grammar.js.map