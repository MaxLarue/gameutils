"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Exceptions_1 = require("../Exceptions");
var Utils_1 = require("../Utils");
var Line = /** @class */ (function () {
    function Line(one, two, three, four) {
        if (one instanceof __1.Vec2 && two instanceof __1.Vec2 && three === undefined && four === undefined) {
            this._from = one;
            this._to = two;
        }
        else if (typeof one === typeof (1)
            && typeof two === typeof (1)
            && typeof three === typeof (1)
            && typeof four === typeof (1)) {
            this._from = new __1.Vec2(one, two);
            this._to = new __1.Vec2(three, four);
        }
        else {
            throw new Exceptions_1.InvalidArguments("Expected two vectors or four number");
        }
    }
    Object.defineProperty(Line.prototype, "from", {
        get: function () { return this._from; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "to", {
        get: function () { return this._to; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "pointDown", {
        get: function () { return this.from.y < this.to.y; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "pointLeft", {
        get: function () { return this.from.x > this.to.x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "pointUp", {
        get: function () { return !this.pointDown; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "pointRight", {
        get: function () { return !this.pointLeft; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "pointDownRight", {
        get: function () { return this.pointDown && this.pointRight; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "pointDownLeft", {
        get: function () { return this.pointDown && this.pointLeft; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "pointUpRight", {
        get: function () { return this.pointUp && this.pointRight; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "pointUpLeft", {
        get: function () { return this.pointUp && this.pointLeft; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "slope", {
        get: function () { return this.to.y !== this.from.y ? (this.to.y - this.from.y) / (this.to.x - this.from.x) : 0; },
        enumerable: false,
        configurable: true
    });
    Line.prototype.getYForX = function (x) {
        if (this.from.x === this.to.x) {
            return this.from.y > this.to.y
                ? this.from.y
                : this.to.y;
        }
        var progress = x - this.from.x;
        return this.from.y + this.slope * progress;
    };
    Line.prototype.isPointOnLine = function (point) {
        return this.rec.isPointInside(point)
            && this.getYForX(point.x) === point.y;
    };
    Line.prototype.collideLine = function (other) {
        var dX = this.to.x - this.from.x;
        var dY = this.to.y - this.from.y;
        var determinant = dX * (other.to.y - other.from.y) - (other.to.x - other.from.x) * dY;
        if (determinant === 0)
            return false; // parallel lines
        var lambda = ((other.to.y - other.from.y) * (other.to.x - this.from.x) + (other.from.x - other.to.x) * (other.to.y - this.from.y)) / determinant;
        var gamma = ((this.from.y - this.to.y) * (other.to.x - this.from.x) + dX * (other.to.y - this.from.y)) / determinant;
        if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1))
            return false;
        else
            return true;
    };
    Line.prototype.collideRect = function (rec) {
        var _this = this;
        return Utils_1.any(rec.lines.map(function (l) { return _this.collideLine(l); }))
            || rec.isPointInside(this.from)
            || rec.isPointInside(this.to);
    };
    Object.defineProperty(Line.prototype, "rec", {
        get: function () {
            if (this.from.x < this.to.x) {
                if (this.from.y < this.to.y) {
                    return __1.Rect.fromTopLeftBottomRight(this.from, this.to);
                }
                else if (this.from.y > this.to.y) {
                    return new __1.Rect(this.from.x, this.to.y, Math.abs(this.to.x - this.from.x), Math.abs(this.from.y - this.to.y));
                }
                else {
                    return __1.Rect.fromTopLeftBottomRight(this.from, new __1.Vec2(this.to.x, this.to.y + 1));
                }
            }
            else if (this.from.x > this.to.x) {
                if (this.from.y < this.to.y) {
                    return new __1.Rect(this.to.x, this.from.y, Math.abs(this.from.x - this.to.x), Math.abs(this.from.y - this.to.y));
                }
                else if (this.from.y > this.to.y) {
                    return new __1.Rect(this.to.x, this.to.y, Math.abs(this.from.x - this.to.x), Math.abs(this.from.y - this.to.y));
                }
                else {
                    return __1.Rect.fromTopLeftBottomRight(this.to, new __1.Vec2(this.from.x, this.from.y + 1));
                }
            }
            else {
                if (this.from.y < this.to.y) {
                    return __1.Rect.fromTopLeftBottomRight(this.from, new __1.Vec2(this.to.x + 1, this.to.y));
                }
                else if (this.from.y > this.to.y) {
                    return __1.Rect.fromTopLeftBottomRight(this.to, new __1.Vec2(this.from.x + 1, this.from.y));
                }
                else {
                    return __1.Rect.fromTopLeftBottomRight(this.from, new __1.Vec2(this.to.x + 1, this.to.y + 1));
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    return Line;
}());
exports.default = Line;
//# sourceMappingURL=index.js.map