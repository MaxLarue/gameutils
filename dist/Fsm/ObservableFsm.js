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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractFsm_1 = __importDefault(require("./AbstractFsm"));
var Events_1 = require("../Events");
var ObservableFsm = /** @class */ (function (_super) {
    __extends(ObservableFsm, _super);
    function ObservableFsm() {
        var _this = _super.call(this) || this;
        _this.emitter = new Events_1.Emitter();
        return _this;
    }
    ObservableFsm.prototype.transitionTo = function (state) {
        var prevState = this.state;
        var ret = _super.prototype.transitionTo.call(this, state);
        var newState = this.state;
        this.emit({ from: prevState, to: newState });
        return ret;
    };
    // emitter delegation
    ObservableFsm.prototype.emit = function (event) {
        this.emitter.emit(event);
    };
    ObservableFsm.prototype.subscribe = function (listener) {
        this.emitter.subscribe(listener);
    };
    ObservableFsm.prototype.unSubscribe = function (listener) {
        this.emitter.unSubscribe(listener);
    };
    ObservableFsm.prototype.purge = function () {
        this.emitter.purge();
    };
    return ObservableFsm;
}(AbstractFsm_1.default));
exports.default = ObservableFsm;
//# sourceMappingURL=ObservableFsm.js.map