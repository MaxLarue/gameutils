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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions = __importStar(require("../../Exceptions"));
var __1 = __importDefault(require(".."));
var Vec2_1 = __importDefault(require("../../Vec2"));
var Line_1 = __importDefault(require("../../Line"));
describe("Testing the rect constructor", function () {
    it("builds a rect using top-left coordinates + size", function () {
        var rect = new __1.default(2, 3, 5, 6);
        expect(rect.x).toBe(2);
        expect(rect.y).toBe(3);
        expect(rect.w).toBe(5);
        expect(rect.h).toBe(6);
    });
    it("cannot be built top-left coordinates + size if size is negative", function () {
        expect(function () { return new __1.default(2, 3, -5, 6); }).toThrow(exceptions.InvalidArguments);
    });
    it("can be built using top-left + size using static constructor", function () {
        var rect = __1.default.fromTopLeft(new Vec2_1.default(2, 3), new Vec2_1.default(3, 4));
        expect(rect.x).toBe(2);
        expect(rect.y).toBe(3);
        expect(rect.w).toBe(3);
        expect(rect.h).toBe(4);
    });
    it("cannot be built top-left + size using static constructor if size is negative", function () {
        expect(function () { return __1.default.fromTopLeft(new Vec2_1.default(2, 3), new Vec2_1.default(-5, 6)); })
            .toThrow(exceptions.InvalidArguments);
    });
    it("can be built using center + size using static constructor", function () {
        var rect = __1.default.fromCenter(new Vec2_1.default(2, 3), new Vec2_1.default(3, 4));
        expect(rect.x).toBe(0.5);
        expect(rect.y).toBe(1);
        expect(rect.w).toBe(3);
        expect(rect.h).toBe(4);
    });
    it("cannot be built using center + size using static constructor if size is negative", function () {
        expect(function () { return __1.default.fromTopLeft(new Vec2_1.default(2, 3), new Vec2_1.default(-5, 6)); })
            .toThrow(exceptions.InvalidArguments);
    });
    it("can be built using topLeft + bottomRight", function () {
        var rect = __1.default.fromTopLeftBottomRight(new Vec2_1.default(2, 3), new Vec2_1.default(5, 6));
        expect(rect.x).toBe(2);
        expect(rect.y).toBe(3);
        expect(rect.w).toBe(3);
        expect(rect.h).toBe(3);
    });
    it("cannot be built using topLeft + bottomRight if size is negative", function () {
        expect(function () { return __1.default.fromTopLeftBottomRight(new Vec2_1.default(3, 3), new Vec2_1.default(2, 6)); })
            .toThrow(exceptions.InvalidArguments);
    });
});
describe("getting each corners + center", function () {
    var r = __1.default.fromTopLeft(new Vec2_1.default(2, 3), new Vec2_1.default(5, 6));
    it("gives the top left corner", function () {
        expect(r.topLeft.x).toBe(2);
        expect(r.topLeft.y).toBe(3);
    });
    it("gives the top right corner", function () {
        expect(r.topRight.x).toBe(7);
        expect(r.topRight.y).toBe(3);
    });
    it("gives the bottom left corner", function () {
        expect(r.bottomLeft.x).toBe(2);
        expect(r.bottomLeft.y).toBe(9);
    });
    it("gives the bottom right corner", function () {
        expect(r.bottomRight.x).toBe(7);
        expect(r.bottomRight.y).toBe(9);
    });
    it("gives the center", function () {
        expect(r.center.x).toBe(4.5);
        expect(r.center.y).toBe(6);
    });
});
describe("Test flip", function () {
    it("flips the rect, keeping the same center", function () {
        var r = new __1.default(2, 2, 4, 5);
        var flipped = r.flip();
        expect(flipped.x).toBe(1.5);
        expect(flipped.y).toBe(2.5);
        expect(flipped.w).toBe(5);
        expect(flipped.h).toBe(4);
    });
    test("when flipping twice it's the same rect", function () {
        var r = new __1.default(2, 2, 4, 5);
        var flipped = r.flip().flip();
        expect(flipped.x).toBe(r.x);
        expect(flipped.y).toBe(r.y);
        expect(flipped.w).toBe(r.w);
        expect(flipped.h).toBe(r.h);
    });
});
describe("testing equality", function () {
    test("when x is different", function () {
        expect(new __1.default(0, 0, 3, 4).equals(new __1.default(1, 0, 3, 4))).toBe(false);
    });
    test("when y is different", function () {
        expect(new __1.default(0, 1, 3, 4).equals(new __1.default(0, 0, 3, 4))).toBe(false);
    });
    test("when w is different", function () {
        expect(new __1.default(0, 0, 2, 4).equals(new __1.default(0, 0, 3, 4))).toBe(false);
    });
    test("when h is different", function () {
        expect(new __1.default(0, 0, 3, 4).equals(new __1.default(0, 0, 3, 5))).toBe(false);
    });
    test("when they are the same", function () {
        expect(new __1.default(0, 0, 3, 4).equals(new __1.default(0, 0, 3, 4))).toBe(true);
    });
});
describe("testing sides getters", function () {
    var r = new __1.default(2, 3, 4, 5);
    test("left", function () { return expect(r.left).toBe(2); });
    test("right", function () { return expect(r.right).toBe(6); });
    test("top", function () { return expect(r.top).toBe(3); });
    test("bottom", function () { return expect(r.bottom).toBe(8); });
});
describe("testing is point inside", function () {
    var r = __1.default.fromCenter(new Vec2_1.default(4, 4), new Vec2_1.default(5, 6));
    it("is not inside", function () {
        expect(r.isPointInside(new Vec2_1.default(99, 99))).toBe(false);
    });
    it("is on the edge", function () {
        expect(r.isPointInside(new Vec2_1.default(6.5, 7))).toBe(true);
    });
    it("is the center", function () {
        expect(r.isPointInside(new Vec2_1.default(4, 4))).toBe(true);
    });
    it("is inside", function () {
        expect(r.isPointInside(new Vec2_1.default(5, 6))).toBe(true);
    });
});
describe("testing contains", function () {
    var r = __1.default.fromCenter(new Vec2_1.default(4, 4), new Vec2_1.default(5, 6));
    it("does not contains a rect which does not even touch", function () {
        expect(r.contains(__1.default.fromCenter(new Vec2_1.default(99, 99), new Vec2_1.default(2, 3))))
            .toBe(false);
    });
    it("does not contains a rect which overflows", function () {
        expect(r.contains(__1.default.fromCenter(new Vec2_1.default(4, 4), new Vec2_1.default(6, 6))))
            .toBe(false);
    });
    it("does contain a rect which overlaps (as they in they are equals)", function () {
        expect(r.contains(__1.default.fromCenter(new Vec2_1.default(4, 4), new Vec2_1.default(5, 6))))
            .toBe(true);
    });
    it("does contain a rect which is contained", function () {
        expect(r.contains(__1.default.fromCenter(new Vec2_1.default(4, 4), new Vec2_1.default(2, 2))))
            .toBe(true);
    });
    it("does contain a rect which is contained, different center", function () {
        expect(r.contains(__1.default.fromCenter(new Vec2_1.default(5, 5), new Vec2_1.default(2, 2))))
            .toBe(true);
    });
});
describe("test get lines", function () {
    it("gives the right lines, from origin", function () {
        var rec = new __1.default(0, 0, 20, 40);
        var _a = __read(rec.lines, 4), top = _a[0], right = _a[1], bottom = _a[2], left = _a[3];
        expect(top).toEqual(new Line_1.default(0, 0, 20, 0));
        expect(right).toEqual(new Line_1.default(20, 0, 20, 40));
        expect(bottom).toEqual(new Line_1.default(20, 40, 0, 40));
        expect(left).toEqual(new Line_1.default(0, 40, 0, 0));
    });
    it("gives the right lines, not on origin", function () {
        var rec = new __1.default(100, 100, 20, 40);
        var _a = __read(rec.lines, 4), top = _a[0], right = _a[1], bottom = _a[2], left = _a[3];
        expect(top).toEqual(new Line_1.default(100, 100, 120, 100));
        expect(right).toEqual(new Line_1.default(120, 100, 120, 140));
        expect(bottom).toEqual(new Line_1.default(120, 140, 100, 140));
        expect(left).toEqual(new Line_1.default(100, 140, 100, 100));
    });
    it("gives the right lines, x !== y", function () {
        var rec = new __1.default(200, 100, 20, 40);
        var _a = __read(rec.lines, 4), top = _a[0], right = _a[1], bottom = _a[2], left = _a[3];
        expect(top).toEqual(new Line_1.default(200, 100, 220, 100));
        expect(right).toEqual(new Line_1.default(220, 100, 220, 140));
        expect(bottom).toEqual(new Line_1.default(220, 140, 200, 140));
        expect(left).toEqual(new Line_1.default(200, 140, 200, 100));
    });
});
describe("testing collides", function () {
    var r = new __1.default(2, 3, 4, 5);
    it("does not collide a far away rect", function () {
        expect(r.collides(new __1.default(99, 99, 2, 3))).toBe(false);
    });
    it("collides with a rect which is contained", function () {
        expect(r.collides(new __1.default(3, 4, 1, 1))).toBe(true);
    });
    it("collides with a rect which is overlapping", function () {
        expect(r.collides(new __1.default(1, 1, 2, 4))).toBe(true);
    });
    it("collides with a rect which is touching", function () {
        expect(r.collides(new __1.default(1, 1, 1, 2))).toBe(true);
    });
});
describe("toString", function () {
    it("gives a representation in the x, y, w, h format", function () {
        expect("" + new __1.default(1, 2, 3, 4)).toEqual("(1, 2, 3, 4)");
    });
});
//# sourceMappingURL=Rect.test.js.map