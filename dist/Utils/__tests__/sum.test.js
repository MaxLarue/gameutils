"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe("testing sum function", function () {
    it("returns 0 for empty arrays", function () {
        expect(__1.sum([])).toBe(0);
    });
    it("returns the element for single element array", function () {
        expect(__1.sum([2])).toBe(2);
    });
    it("returns the sum", function () {
        expect(__1.sum([2, 3])).toBe(5);
    });
    it("works with negative numbers", function () {
        expect(__1.sum([2, -3, 5])).toBe(4);
    });
});
//# sourceMappingURL=sum.test.js.map