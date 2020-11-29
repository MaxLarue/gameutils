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
describe("Testing assert function", function () {
    it("does not raise if test is positive", function () {
        __1.assert(true);
    });
    it("raises with default message if none is provided", function () {
        expect(function () { return __1.assert(false); }).toThrow(exceptions.AssertionError);
        expect(function () { return __1.assert(false); }).toThrow("Assertion failed");
    });
    it("raises with specific message if it is provided", function () {
        expect(function () { return __1.assert(false); }).toThrow(exceptions.AssertionError);
        expect(function () { return __1.assert(false, "my message"); }).toThrow("my message");
    });
});
//# sourceMappingURL=assert.test.js.map