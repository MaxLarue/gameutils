"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var DummyEvent = /** @class */ (function () {
    function DummyEvent(value) {
        this.value = value;
    }
    return DummyEvent;
}());
describe("Testing FListener implementation", function () {
    it("calls our callback upon trigger", function () {
        var testVal = 5;
        var listener = new __1.FListener(function (e) { testVal = e.value; });
        listener.onEvent(new DummyEvent(6));
        expect(testVal).toBe(6);
    });
});
//# sourceMappingURL=FListener.test.js.map