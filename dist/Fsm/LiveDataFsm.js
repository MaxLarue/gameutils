"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Events_1 = require("../Events");
var LiveDataFsm = /** @class */ (function (_super) {
    __extends(LiveDataFsm, _super);
    function LiveDataFsm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.liveDataListeners = [];
        return _this;
    }
    LiveDataFsm.prototype.purgeListeners = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.liveDataListeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = _c.value, listener = _d.listener, liveData = _d.liveData;
                liveData.unSubscribe(listener);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.liveDataListeners = [];
    };
    LiveDataFsm.prototype.subscribeRule = function (liveData, callback) {
        var listener = new Events_1.FListener(callback);
        liveData.subscribe(listener);
        this.liveDataListeners.push({ listener: listener, liveData: liveData });
    };
    return LiveDataFsm;
}(_1.AbstractFsm));
exports.default = LiveDataFsm;
//# sourceMappingURL=LiveDataFsm.js.map