"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TagManager_1 = __importDefault(require("../TagManager"));
describe("testing the tag manager", function () {
    it("has a single tag", function () {
        var tg = new TagManager_1.default(["hey"]);
        expect(tg.hasTag("hey")).toBe(true);
    });
    it("does not have a single tag", function () {
        var tg = new TagManager_1.default(["hello"]);
        expect(tg.hasTag("hey")).toBe(false);
    });
    it("has many tags", function () {
        var tg = new TagManager_1.default(["a", "b"]);
        expect(tg.hasTag("a")).toBe(true);
        expect(tg.hasTag("b")).toBe(true);
    });
    it("has not many tags", function () {
        var tg = new TagManager_1.default(["a", "b"]);
        expect(tg.hasTag("c")).toBe(false);
        expect(tg.hasTag("d")).toBe(false);
    });
    it("has any tag", function () {
        var tg = new TagManager_1.default(["a", "b"]);
        expect(tg.hasAnyTag(["a"])).toBe(true);
        expect(tg.hasAnyTag(["a", "c"])).toBe(true);
    });
    it("does not have any tag", function () {
        var tg = new TagManager_1.default(["a", "b"]);
        expect(tg.hasAnyTag(["c"])).toBe(false);
        expect(tg.hasAnyTag(["c", "d"])).toBe(false);
    });
});
//# sourceMappingURL=TagManager.test.js.map