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
var exceptions = __importStar(require("../Exceptions"));
var Vec2_1 = __importDefault(require("../Vec2"));
var utils = __importStar(require("../Utils"));
var Line_1 = __importDefault(require("../Line"));
var Rect = /** @class */ (function () {
    function Rect(x, y, w, h) {
        if (w <= 0 || h <= 0) {
            throw new exceptions.InvalidArguments("Negative or null-sized Rect");
        }
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
    }
    Rect.fromTopLeft = function (topLeft, size) {
        return new Rect(topLeft.x, topLeft.y, size.x, size.y);
    };
    Rect.fromCenter = function (center, size) {
        return new Rect(center.x - size.x / 2, center.y - size.y / 2, size.x, size.y);
    };
    Rect.fromTopLeftBottomRight = function (topLeft, bottomRight) {
        return new Rect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
    };
    Object.defineProperty(Rect.prototype, "x", {
        get: function () { return this._x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "y", {
        get: function () { return this._y; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "position", {
        get: function () { return new Vec2_1.default(this.x, this.y); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "w", {
        get: function () { return this._w; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "h", {
        get: function () { return this._h; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "size", {
        get: function () { return new Vec2_1.default(this.w, this.h); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "left", {
        get: function () { return this.x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "right", {
        get: function () { return this.x + this.w; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "top", {
        get: function () { return this.y; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottom", {
        get: function () { return this.y + this.h; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "topLeft", {
        get: function () { return new Vec2_1.default(this.left, this.top); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "topRight", {
        get: function () { return new Vec2_1.default(this.right, this.top); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottomLeft", {
        get: function () { return new Vec2_1.default(this.left, this.bottom); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottomRight", {
        get: function () { return new Vec2_1.default(this.right, this.bottom); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "center", {
        get: function () { return new Vec2_1.default(this.x + this.w / 2, this.y + this.h / 2); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "lines", {
        get: function () {
            return [
                //top
                new Line_1.default(this.left, this.top, this.right, this.top),
                //right
                new Line_1.default(this.right, this.top, this.right, this.bottom),
                //bottom
                new Line_1.default(this.right, this.bottom, this.left, this.bottom),
                //left
                new Line_1.default(this.left, this.bottom, this.left, this.top)
            ];
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.flip = function () {
        return Rect.fromCenter(this.center, new Vec2_1.default(this.h, this.w));
    };
    Rect.prototype.equals = function (other) {
        return this.center.equals(other.center) && this.topLeft.equals(other.topLeft);
    };
    Rect.prototype.isPointInside = function (point) {
        return utils.all([
            point.x >= this.left,
            point.x <= this.right,
            point.y >= this.top,
            point.y <= this.bottom,
        ]);
    };
    Rect.prototype.contains = function (other) {
        return utils.all([
            this.left <= other.left,
            this.right >= other.right,
            this.top <= other.top,
            this.bottom >= other.bottom,
        ]);
    };
    Rect.prototype.collides = function (other) {
        return !utils.any([
            this.left > other.right,
            this.right < other.left,
            this.top > other.bottom,
            this.bottom < other.top,
        ]);
    };
    Rect.prototype.getMinimalAdjustment = function (other) {
        return other.center.sub(this.center);
    };
    Rect.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ", " + this.w + ", " + this.h + ")";
    };
    return Rect;
}());
exports.default = Rect;
//# sourceMappingURL=index.js.map