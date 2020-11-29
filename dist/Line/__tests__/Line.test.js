"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require(".."));
var __2 = require("../..");
var Exceptions_1 = require("../../Exceptions");
var Rect_1 = __importDefault(require("../../Rect"));
describe("testing the line class", function () {
    it("Can be built using Vec2", function () {
        var start = new __2.Vec2(10, 10);
        var end = new __2.Vec2(30, 30);
        var line = new __1.default(start, end);
        expect(line.from).toEqual(start);
        expect(line.to).toEqual(end);
    });
    it("can be built using numbers only", function () {
        var start = new __2.Vec2(10, 10);
        var end = new __2.Vec2(30, 30);
        var line = new __1.default(start.x, start.y, end.x, end.y);
        expect(line.from).toEqual(start);
        expect(line.to).toEqual(end);
    });
    it("throws if invalid combination", function () {
        expect(function () { return new __1.default(new __2.Vec2(0, 0), new __2.Vec2(10, 10), 5, 6); })
            .toThrow(Exceptions_1.InvalidArguments);
    });
});
describe("testing line to line collision", function () {
    it("does not collide (parallel)", function () {
        expect(new __1.default(0, 0, 10, 0).collideLine(new __1.default(0, 10, 10, 10)))
            .toBe(false);
    });
    it("collides (perpendicular)", function () {
        expect(new __1.default(0, 5, 10, 5).collideLine(new __1.default(5, 0, 5, 10)))
            .toBe(true);
    });
    it("collides (random)", function () {
        expect(new __1.default(0, 0, 100, 100).collideLine(new __1.default(0, 100, 100, 70)))
            .toBe(true);
    });
    it("does not collide (segment too short)", function () {
        expect(new __1.default(0, 0, 100, 100).collideLine(new __1.default(0, 100, 20, 70)))
            .toBe(false);
    });
});
describe("testing line to rect collision", function () {
    it("does not collide, line is parralel to an edge", function () {
        expect(new __1.default(0, 0, 100, 0).collideRect(new Rect_1.default(0, 200, 100, 200)))
            .toBe(false);
    });
    it("does not collide, line is too short", function () {
        expect(new __1.default(200, 0, 300, 0).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(false);
    });
    it("does not collide, regular test", function () {
        expect(new __1.default(0, 400, 400, 0).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(false);
    });
    it("collides when line is onto a side (top)", function () {
        expect(new __1.default(0, 0, 50, 0).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(true);
    });
    it("collides when line is onto a side (right)", function () {
        expect(new __1.default(100, 0, 100, 20).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(true);
    });
    it("collides when line is onto a side (bottom)", function () {
        expect(new __1.default(0, 200, 20, 200).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(true);
    });
    it("collides when line is onto a side (left)", function () {
        expect(new __1.default(0, 0, 0, 50).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(true);
    });
    it("collides when line crosses a side (top)", function () {
        expect(new __1.default(10, -20, 10, 20).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(true);
    });
    it("collides when line crosses a side (right)", function () {
        expect(new __1.default(50, 100, 200, 50).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(true);
    });
    it("collides when line crosses a side (bottom)", function () {
        expect(new __1.default(50, 100, 50, 300).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(true);
    });
    it("collides when line crosses a side (left)", function () {
        expect(new __1.default(-50, 100, 50, 100).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(true);
    });
    it("collides when line is inside the rect", function () {
        expect(new __1.default(25, 25, 75, 75).collideRect(new Rect_1.default(0, 0, 100, 200)))
            .toBe(true);
    });
});
describe("testing get rect, downward right line", function () {
    it("returns the rect for default case", function () {
        var line = new __1.default(0, 0, 30, 40);
        expect(line.rec).toEqual(new Rect_1.default(0, 0, 30, 40));
    });
    it("returns a 1 px height rect for horizontal line", function () {
        var line = new __1.default(10, 20, 50, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 40, 1));
    });
    it("returns a 1 px wide rect for vertical line", function () {
        var line = new __1.default(10, 20, 10, 50);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 1, 30));
    });
    it("returns a 1x1 rect for line where from === to", function () {
        var line = new __1.default(10, 20, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 1, 1));
    });
});
describe("testing get rect, downward left line", function () {
    it("returns the rect for default case", function () {
        var line = new __1.default(30, 0, 0, 40);
        expect(line.rec).toEqual(new Rect_1.default(0, 0, 30, 40));
    });
    it("returns a 1 px height rect for horizontal line", function () {
        var line = new __1.default(50, 20, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 40, 1));
    });
    it("returns a 1 px wide rect for vertical line", function () {
        var line = new __1.default(10, 50, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 1, 30));
    });
    it("returns a 1x1 rect for line where from === to", function () {
        var line = new __1.default(10, 20, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 1, 1));
    });
});
describe("testing get rect, upward right line", function () {
    it("returns the rect for default case", function () {
        var line = new __1.default(0, 40, 30, 0);
        expect(line.rec).toEqual(new Rect_1.default(0, 0, 30, 40));
    });
    it("returns a 1 px height rect for horizontal line", function () {
        var line = new __1.default(50, 20, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 40, 1));
    });
    it("returns a 1 px wide rect for vertical line", function () {
        var line = new __1.default(10, 50, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 1, 30));
    });
    it("returns a 1x1 rect for line where from === to", function () {
        var line = new __1.default(10, 20, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 1, 1));
    });
});
describe("testing get rect, upward left line", function () {
    it("returns the rect for default case", function () {
        var line = new __1.default(30, 40, 0, 0);
        expect(line.rec).toEqual(new Rect_1.default(0, 0, 30, 40));
    });
    it("returns a 1 px height rect for horizontal line", function () {
        var line = new __1.default(50, 20, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 40, 1));
    });
    it("returns a 1 px wide rect for vertical line", function () {
        var line = new __1.default(10, 50, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 1, 30));
    });
    it("returns a 1x1 rect for line where from === to", function () {
        var line = new __1.default(10, 20, 10, 20);
        expect(line.rec).toEqual(new Rect_1.default(10, 20, 1, 1));
    });
});
describe("test get Y for x", function () {
    it("will return y, horizontal line", function () {
        expect(new __1.default(0, 0, 30, 0).getYForX(15)).toEqual(0);
    });
    it("will return highest y, vertical line", function () {
        expect(new __1.default(0, 0, 0, 30).getYForX(0)).toEqual(30);
    });
    it("will return middle y, perfect diagonal line, downward right", function () {
        expect(new __1.default(0, 0, 30, 30).getYForX(15)).toEqual(15);
    });
    it("will return middle y, perfect diagonal line, downward left", function () {
        expect(new __1.default(30, 0, 0, 30).getYForX(15)).toEqual(15);
    });
    it("will return middle y, perfect diagonal line, upward left", function () {
        expect(new __1.default(30, 30, 0, 0).getYForX(15)).toEqual(15);
    });
    it("will return middle y, perfect diagonal line, upward right", function () {
        expect(new __1.default(0, 30, 30, 0).getYForX(15)).toEqual(15);
    });
    it("works for real life example", function () {
        var line = new __1.default(new __2.Vec2(1180.4455846113485, 523), new __2.Vec2(1072.4455846113485, 559.5));
        var points = [
            new __2.Vec2(1132.4455846113485, 539.222),
            new __2.Vec2(1114.4455846113485, 545.304),
            new __2.Vec2(1096.4455846113485, 551.388),
        ];
        points.map(function (p) { return expect(line.getYForX(p.x)).toBeCloseTo(p.y); });
    });
});
describe("testing direction accessors", function () {
    describe("down ", function () {
        it("should point down ", function () {
            expect(new __1.default(30, 0, 0, 40).pointDown).toBe(true);
        });
        it("should NOT point down ", function () {
            expect(new __1.default(0, 50, 30, 40).pointDown).toBe(false);
        });
    });
    describe("down ", function () {
        it("should point down ", function () {
            expect(new __1.default(0, 0, 30, 40).pointDown).toBe(true);
        });
        it("should NOT point down ", function () {
            expect(new __1.default(0, 0, 30, -40).pointDown).toBe(false);
        });
    });
    describe("Up ", function () {
        it("should point Up ", function () {
            expect(new __1.default(30, 40, 0, 0).pointUp).toBe(true);
        });
        it("should NOT point Up ", function () {
            expect(new __1.default(0, 0, 30, 40).pointUp).toBe(false);
        });
    });
    describe("Up ", function () {
        it("should point Up ", function () {
            expect(new __1.default(0, 40, 30, 0).pointUp).toBe(true);
        });
        it("should NOT point Up ", function () {
            expect(new __1.default(0, 0, 30, 40).pointUp).toBe(false);
        });
    });
    describe("down left", function () {
        it("should point down left", function () {
            expect(new __1.default(30, 0, 0, 40).pointDownLeft).toBe(true);
        });
        it("should NOT point down left", function () {
            expect(new __1.default(0, 0, 30, 40).pointDownLeft).toBe(false);
        });
    });
    describe("down right", function () {
        it("should point down right", function () {
            expect(new __1.default(0, 0, 30, 40).pointDownRight).toBe(true);
        });
        it("should NOT point down right", function () {
            expect(new __1.default(0, 0, 30, -40).pointDownRight).toBe(false);
        });
    });
    describe("Up left", function () {
        it("should point Up left", function () {
            expect(new __1.default(30, 40, 0, 0).pointUpLeft).toBe(true);
        });
        it("should NOT point Up left", function () {
            expect(new __1.default(0, 0, 30, 40).pointUpLeft).toBe(false);
        });
    });
    describe("Up right", function () {
        it("should point Up right", function () {
            expect(new __1.default(0, 40, 30, 0).pointUpRight).toBe(true);
        });
        it("should NOT point Up right", function () {
            expect(new __1.default(0, 0, 30, 40).pointUpRight).toBe(false);
        });
    });
});
describe("testing slope accessor", function () {
    it("is 0 for horizontal", function () {
        expect(new __1.default(0, 0, 30, 0).slope).toBe(0);
    });
    it("is Infinity for vertical", function () {
        expect(new __1.default(0, 0, 0, 30).slope).toBe(Infinity);
    });
    it("is -1 for a perfect diagonal going up right", function () {
        expect(new __1.default(0, 30, 30, 0).slope).toBe(-1);
    });
    it("is -1 for a perfect diagonal going down left", function () {
        expect(new __1.default(30, 0, 0, 30).slope).toBe(-1);
    });
    it("is 1 for a perfect diagonal going up left", function () {
        expect(new __1.default(30, 30, 0, 0).slope).toBe(1);
    });
    it("is 1 for a perfect diagonal going down right", function () {
        expect(new __1.default(0, 0, 30, 30).slope).toBe(1);
    });
});
describe("test is point on line", function () {
    it("is not on", function () {
        expect(new __1.default(0, 0, 40, 30).isPointOnLine(new __2.Vec2(60, 70))).toBe(false);
    });
    it("is not on (good slope but not on segment)", function () {
        expect(new __1.default(0, 0, 40, 40).isPointOnLine(new __2.Vec2(50, 50))).toBe(false);
    });
    it("is not on (bad slope but in segment area)", function () {
        expect(new __1.default(0, 0, 40, 40).isPointOnLine(new __2.Vec2(20, 21))).toBe(false);
    });
    it("is on", function () {
        expect(new __1.default(0, 0, 40, 40).isPointOnLine(new __2.Vec2(20, 20))).toBe(true);
    });
});
//# sourceMappingURL=Line.test.js.map