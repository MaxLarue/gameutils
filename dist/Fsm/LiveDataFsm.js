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
        for (var _i = 0, _a = this.liveDataListeners; _i < _a.length; _i++) {
            var _b = _a[_i], listener = _b.listener, liveData = _b.liveData;
            liveData.unSubscribe(listener);
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