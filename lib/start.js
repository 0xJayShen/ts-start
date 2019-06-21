"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = __importDefault(require("./src/a"));
var b_1 = __importDefault(require("./src/b"));
var a_;
a_ = new a_1.default("a", 13);
a_.print_name();
console.log("---".repeat(10));
var b_;
b_ = new b_1.default("b", 12);
b_.print_age();
b_.print_name();
//# sourceMappingURL=start.js.map