"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe("testing any", function () {
    it("returns true for an empty array", function () {
        expect(__1.any([])).toBe(true);
    });
    it("returns false for a false only array", function () {
        expect(__1.any([false])).toBe(false);
    });
    it("returns false for a false only array, multiple elements", function () {
        expect(__1.any([false, false, false])).toBe(false);
    });
    it("returns true for a true only array, multiple elements", function () {
        expect(__1.any([true, true, true])).toBe(true);
    });
    it("returns true for a mixed array, multiple elements", function () {
        expect(__1.any([true, false, true])).toBe(true);
    });
});
//# sourceMappingURL=any.test.js.map