"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cooldown = /** @class */ (function () {
    function Cooldown(time) {
        this._time = time;
        this._elapsed = 0;
        this._lastActivation = -1 * time;
    }
    Object.defineProperty(Cooldown.prototype, "time", {
        get: function () { return this._time; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cooldown.prototype, "elapsed", {
        get: function () { return this._elapsed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cooldown.prototype, "ready", {
        get: function () {
            return this._elapsed - this._lastActivation >= this._time;
        },
        enumerable: false,
        configurable: true
    });
    Cooldown.prototype.addDelta = function (delta) {
        this._elapsed += delta;
    };
    Cooldown.prototype.activate = function () {
        if (this.ready)
            this._lastActivation = this._elapsed;
    };
    return Cooldown;
}());
exports.default = Cooldown;
//# sourceMappingURL=index.js.map