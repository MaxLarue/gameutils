"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Events");
var LiveData = /** @class */ (function () {
    function LiveData(initialValue) {
        this.data = initialValue;
        this.emitter = new Events_1.Emitter();
    }
    LiveData.prototype.get = function () { return this.data; };
    LiveData.prototype.set = function (data) {
        this.emitter.emit({ previous: this.data, next: data });
        this.data = data;
    };
    // emitter delegation
    LiveData.prototype.subscribe = function (listener) {
        this.emitter.subscribe(listener);
        this.emitter.emit({ next: this.data });
    };
    LiveData.prototype.unSubscribe = function (listener) {
        this.emitter.unSubscribe(listener);
    };
    LiveData.prototype.purge = function () {
        this.emitter.purge();
    };
    return LiveData;
}());
exports.default = LiveData;
//# sourceMappingURL=LiveData.js.map