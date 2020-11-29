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
var exceptions = __importStar(require("../../Exceptions"));
var __1 = require("..");
describe("testing range", function () {
    test("range(0) yields an empty list", function () {
        expect(__1.range(0)).toEqual([]);
    });
    test("range(1) yields a list of 1 0", function () {
        expect(__1.range(1)).toEqual([0]);
    });
    test("range(10) yields 9 elements", function () {
        expect(__1.range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it("throws an exception if argument is negative", function () {
        expect(function () { return __1.range(-2); }).toThrow(exceptions.InvalidArguments);
    });
});
//# sourceMappingURL=range.test.js.map