"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = exports.any = exports.all = exports.sum = exports.assert = void 0;
var exceptions = __importStar(require("../Exceptions"));
function assert(expr, msg) {
    if (!expr) {
        throw new exceptions.AssertionError(msg || "Assertion failed");
    }
}
exports.assert = assert;
function sum(of) {
    return of.reduce(function (prev, curr) { return prev + curr; }, 0);
}
exports.sum = sum;
function all(of) {
    if (of.length === 0)
        return false;
    return of.reduce(function (prev, curr) { return prev && curr; }, true);
}
exports.all = all;
function any(of) {
    if (of.length === 0)
        return true;
    return of.reduce(function (prev, curr) { return prev || curr; }, false);
}
exports.any = any;
function range(max) {
    if (max < 0)
        throw new exceptions.InvalidArguments("Cannot create ranges below 0");
    var ret = [];
    for (var i = 0; i < max; ++i) {
        ret.push(i);
    }
    return ret;
}
exports.range = range;
//# sourceMappingURL=index.js.map