"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.listeners = new Set();
    }
    Emitter.prototype.emit = function (event) {
        this.listeners.forEach(function (listener) { return listener.onEvent(event); });
    };
    Emitter.prototype.subscribe = function (listener) {
        this.listeners.add(listener);
    };
    Emitter.prototype.unSubscribe = function (listener) {
        this.listeners.delete(listener);
    };
    Emitter.prototype.purge = function () {
        this.listeners.clear();
    };
    return Emitter;
}());
exports.default = Emitter;
//# sourceMappingURL=Emitter.js.map