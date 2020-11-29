"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe("testing all", function () {
    it("returns false for an empty array", function () {
        expect(__1.all([])).toBe(false);
    });
    it("returns false for a 1 false array", function () {
        expect(__1.all([false])).toBe(false);
    });
    it("returns true for a 1 true array", function () {
        expect(__1.all([true])).toBe(true);
    });
    it("returns true if all true", function () {
        expect(__1.all([true, true, true])).toBe(true);
    });
    it("returns false if any true", function () {
        expect(__1.all([true, false, true])).toBe(false);
    });
});
//# sourceMappingURL=all.test.js.map