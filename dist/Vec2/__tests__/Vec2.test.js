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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions = __importStar(require("../../Exceptions"));
var utils = __importStar(require("../../Utils"));
var __1 = __importDefault(require(".."));
describe("constructor", function () {
    it("uses the args as coordinates", function () {
        var v = new __1.default(2, 3);
        expect(v.x).toBe(2);
        expect(v.y).toBe(3);
    });
    it("uses only one arg for copy constructor", function () {
        var v = new __1.default(2, 3);
        expect(new __1.default(v).x).toBe(2);
        expect(new __1.default(v).y).toBe(3);
        expect(new __1.default(v)).not.toBe(v);
    });
    it("uses only one arg for array constructor", function () {
        var v = new __1.default([2, 3]);
        expect(v.x).toBe(2);
        expect(v.y).toBe(3);
    });
    it("throws otherwise", function () {
        expect(function () { return new __1.default([2, 3], [4, 5]); })
            .toThrow(exceptions.InvalidArguments);
    });
});
describe("add", function () {
    var v1 = new __1.default(1, 2);
    var v2 = new __1.default(2, 3);
    var sum = v1.add(v2);
    it("can add 2 vectors to create a third one", function () {
        expect(sum.x).toEqual(3);
        expect(sum.y).toEqual(5);
    });
    it("works with negative number", function () {
        var v3 = new __1.default(-1, -1);
        var negSum = sum.add(v3);
        expect(negSum.x).toBe(2);
        expect(negSum.y).toBe(4);
    });
    it("created a new vector", function () {
        expect(v1).not.toBe(sum);
        expect(v2).not.toBe(sum);
    });
});
describe("sub", function () {
    var v1 = new __1.default(1, 2);
    var v2 = new __1.default(2, 4);
    var sub = v2.sub(v1);
    it("can add 2 vectors to create a third one", function () {
        expect(sub.x).toEqual(1);
        expect(sub.y).toEqual(2);
    });
    it("works with negative number", function () {
        var v3 = new __1.default(-1, -1);
        var negSub = v3.sub(sub);
        expect(negSub.x).toBe(-2);
        expect(negSub.y).toBe(-3);
    });
    it("created a new vector", function () {
        expect(v1).not.toBe(sub);
        expect(v2).not.toBe(sub);
    });
});
describe("multiply by scalar", function () {
    it("can multiply by zero", function () {
        var byZero = new __1.default(3, 4).mul(0);
        expect(byZero.x).toBe(0);
        expect(byZero.y).toBe(0);
    });
    it("can multiply by a negative number", function () {
        var byZero = new __1.default(3, 4).mul(-1);
        expect(byZero.x).toBe(-3);
        expect(byZero.y).toBe(-4);
    });
    it("can multiply by a positive number", function () {
        var byZero = new __1.default(3, 4).mul(2);
        expect(byZero.x).toBe(6);
        expect(byZero.y).toBe(8);
    });
    it("returns a copy", function () {
        var original = new __1.default(1, 1);
        expect(original.mul(2)).not.toBe(original);
    });
});
describe("divide by scalar", function () {
    it("can divide by a positive number, without remainder", function () {
        var div = new __1.default(4, 6).div(2);
        expect(div.x).toBe(2);
        expect(div.y).toBe(3);
    });
    it("can divide by a positive number, with remainder", function () {
        var div = new __1.default(4, 5).div(2);
        expect(div.x).toBe(2);
        expect(div.y).toBe(2.5);
    });
    it("can divide by a negative number, without remainder", function () {
        var div = new __1.default(4, 6).div(-2);
        expect(div.x).toBe(-2);
        expect(div.y).toBe(-3);
    });
    it("can divide by a negative number, with remainder", function () {
        var div = new __1.default(4, 5).div(-2);
        expect(div.x).toBe(-2);
        expect(div.y).toBe(-2.5);
    });
    it("returns a copy", function () {
        var original = new __1.default(3, 5);
        expect(original.div(2)).not.toBe(original);
    });
    it("throws when dividing by zero", function () {
        expect(function () { return new __1.default(3, 4).div(0); })
            .toThrowError(new exceptions.DivideByZeroException());
    });
});
describe("sqLen", function () {
    it("return the square of the length", function () {
        expect(new __1.default(2, 3).sqLen()).toBe(13);
    });
});
describe("len", function () {
    it("return the length of the vector", function () {
        expect(new __1.default(3, 4).len()).toBe(5);
    });
});
describe("unit", function () {
    it("return a vector of len 1, perfect diagonal", function () {
        expect(new __1.default(3, 3).unit().len()).toBe(1);
    });
    it("return a vector of len 1, vertical", function () {
        expect(new __1.default(0, 3).unit().x).toBe(0);
        expect(new __1.default(0, 3).unit().y).toBe(1);
    });
    it("return a vector of len 1, horizontal", function () {
        expect(new __1.default(4, 0).unit().x).toBe(1);
        expect(new __1.default(4, 0).unit().y).toBe(0);
    });
});
describe("testing scalar product", function () {
    it("does a regular scalar product", function () {
        expect(new __1.default(2, 3).scal(new __1.default(5, 6))).toBe(2 * 5 + 3 * 6);
    });
    it("is negative when two vectors are perpendicular", function () {
        expect(new __1.default(0, 1).scal(new __1.default(1, 0))).toBe(0);
    });
    it("is equivalent to the norm form", function () {
        var a = new __1.default(1, 1);
        var b = new __1.default(1, 0);
        expect(a.scal(b)).toBeCloseTo(a.len() * b.len() * Math.cos(Math.PI / 4));
    });
});
describe("Testing getting the angle beteen two vectors", function () {
    it("is pi/2 for ortogonal vectors", function () {
        expect(new __1.default(1, 0).angle(new __1.default(0, 1))).toBeCloseTo(Math.PI / 2);
    });
    it("is pi for opposite vectors", function () {
        expect(new __1.default(1, 1).angle(new __1.default(-1, -1))).toBeCloseTo(Math.PI);
    });
    it("is pi/4 for the main diagonal with the horizontal vectors", function () {
        expect(new __1.default(1, 1).angle(new __1.default(1, 0))).toBeCloseTo(Math.PI / 4);
    });
    test("the order of the vector composition is not relevant", function () {
        var a = new __1.default(2, 3);
        var b = new __1.default(1, 9);
        expect(a.angle(b)).toBeCloseTo(b.angle(a));
    });
    test("the length of the vectors is not relevant", function () {
        var a = new __1.default(2, 3);
        var b = new __1.default(1, 9);
        expect(a.angle(b)).toBeCloseTo(b.mul(5).angle(a.mul(3)));
    });
    describe("Some automated/fuzzy tests", function () {
        var randomAngles = utils.range(100).map(function () { return Math.random() * Math.PI; }).map(function (a) { return [a]; });
        test.each(randomAngles)("for angle %s", function (angle) {
            // since we test against an horizontal positive vector, we can build
            // another vector from the angle using cos(a), -sin(a). -sin because
            // the y axes is downward, but that shouldn't cause a difference
            // also the length shouldn't matter
            var v = new __1.default(Math.cos(angle), -1 * Math.sin(angle)).mul(Math.random() * 20);
            var reference = new __1.default(1, 0).mul(Math.random() * 20);
            expect(v.angle(reference)).toBeCloseTo(angle);
            expect(reference.angle(v)).toBeCloseTo(angle);
        });
    });
});
describe("toString", function () {
    it("returns a pretty string", function () {
        expect("" + new __1.default(3, 4)).toEqual("(3, 4)");
    });
});
describe("equals", function () {
    it("is equal when both coordinates are equal", function () {
        expect(new __1.default(3, 4).equals(new __1.default(3, 4))).toBe(true);
    });
    it("is not equal when one coordinate is different", function () {
        expect(new __1.default(3, 4).equals(new __1.default(3, 5))).toBe(false);
    });
    it("is not equal when both coordinates are different", function () {
        expect(new __1.default(2, 4).equals(new __1.default(3, 5))).toBe(false);
    });
});
//# sourceMappingURL=Vec2.test.js.map