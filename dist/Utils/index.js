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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMap = exports.reversed = exports.range = exports.any = exports.all = exports.sum = exports.assert = void 0;
var exceptions = __importStar(require("../Exceptions"));
function assert(expr, msg) {
    if (!expr) {
        throw new exceptions.AssertionError(msg || "Assertion failed");
    }
}
exports.assert = assert;
function sum(of) {
    return of.reduce(function (prev, curr) { return prev + curr; }, 0);
}
exports.sum = sum;
function all(of) {
    if (of.length === 0)
        return false;
    return of.reduce(function (prev, curr) { return prev && curr; }, true);
}
exports.all = all;
function any(of) {
    if (of.length === 0)
        return true;
    return of.reduce(function (prev, curr) { return prev || curr; }, false);
}
exports.any = any;
function range(max) {
    if (max < 0)
        throw new exceptions.InvalidArguments("Cannot create ranges below 0");
    var ret = [];
    for (var i = 0; i < max; ++i) {
        ret.push(i);
    }
    return ret;
}
exports.range = range;
function reversed(array) {
    var index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = array.length - 1;
                _a.label = 1;
            case 1:
                if (!(index >= 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, array[index]];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                --index;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.reversed = reversed;
var DefaultMap = /** @class */ (function () {
    function DefaultMap(factory) {
        this.factory = factory;
        this.innerMap = {};
    }
    DefaultMap.prototype.get = function (key) {
        if (!(key in this.innerMap)) {
            this.innerMap[key] = this.factory(key);
        }
        return this.innerMap[key];
    };
    DefaultMap.prototype.set = function (key, value) {
        this.innerMap[key] = value;
    };
    DefaultMap.prototype.update = function (key, updateFunction) {
        this.set(key, updateFunction(this.get(key)));
    };
    DefaultMap.prototype.clear = function () { this.innerMap = {}; };
    return DefaultMap;
}());
exports.DefaultMap = DefaultMap;
//# sourceMappingURL=index.js.map