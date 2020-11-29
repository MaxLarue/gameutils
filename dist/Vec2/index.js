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
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions = __importStar(require("../Exceptions"));
var Vec2 = /** @class */ (function () {
    function Vec2(first, second) {
        if (first instanceof Vec2) {
            this.x = first.x;
            this.y = first.y;
        }
        else if (typeof first === 'number' && typeof second === 'number') {
            this.x = first;
            this.y = second;
        }
        else if (Array.isArray(first) && !second) {
            this.x = first[0];
            this.y = first[1];
        }
        else {
            throw new exceptions.InvalidArguments("Expected either two number, an array of two numbers or another Vec2 instance");
        }
    }
    Vec2.prototype.add = function (other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    };
    Vec2.prototype.sub = function (other) {
        return new Vec2(this.x - other.x, this.y - other.y);
    };
    Vec2.prototype.mul = function (by) {
        return new Vec2(this.x * by, this.y * by);
    };
    Vec2.prototype.div = function (by) {
        if (by === 0) {
            throw new exceptions.DivideByZeroException();
        }
        return new Vec2(this.x / by, this.y / by);
    };
    Vec2.prototype.sqLen = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vec2.prototype.len = function () {
        return Math.sqrt(this.sqLen());
    };
    Vec2.prototype.unit = function () {
        return this.div(this.len());
    };
    Vec2.prototype.equals = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    Vec2.prototype.scal = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Vec2.prototype.angle = function (other) {
        return Math.acos(this.scal(other) / (this.len() * other.len()));
    };
    Vec2.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    return Vec2;
}());
exports.default = Vec2;
//# sourceMappingURL=index.js.map