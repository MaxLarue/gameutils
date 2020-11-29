"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require(".."));
describe("testing cooldown", function () {
    it("takes a time parameter", function () {
        var cooldown = new __1.default(300);
        expect(cooldown.time).toBe(300);
    });
    it("can receveive delta (of time)", function () {
        var cooldown = new __1.default(300);
        cooldown.addDelta(100);
        expect(cooldown.elapsed).toBe(100);
    });
    it("can tell us if it is ready (default true)", function () {
        var cooldown = new __1.default(300);
        expect(cooldown.ready).toBe(true);
    });
    it("can only be activated once per {time}", function () {
        var cooldown = new __1.default(300);
        cooldown.activate();
        expect(cooldown.ready).toBe(false);
    });
    it("can cool down the be activated again", function () {
        var cooldown = new __1.default(300);
        cooldown.activate();
        expect(cooldown.ready).toBe(false);
        cooldown.addDelta(300);
        expect(cooldown.ready).toBe(true);
    });
});
describe("Some real life test", function () {
    test("real life scenarion", function () {
        var cooldown = new __1.default(300);
        expect(cooldown.ready).toBe(true);
        cooldown.activate();
        cooldown.addDelta(100);
        expect(cooldown.ready).toBe(false);
        cooldown.addDelta(100);
        expect(cooldown.ready).toBe(false);
        cooldown.addDelta(100);
        expect(cooldown.ready).toBe(true);
        cooldown.activate();
        expect(cooldown.ready).toBe(false);
        cooldown.addDelta(100);
        expect(cooldown.ready).toBe(false);
        cooldown.addDelta(200);
        expect(cooldown.ready).toBe(true);
    });
});
//# sourceMappingURL=Cooldown.test.js.map