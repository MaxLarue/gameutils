"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FListener = /** @class */ (function () {
    function FListener(callback) {
        this.callback = callback;
    }
    FListener.prototype.onEvent = function (event) {
        this.callback(event);
    };
    return FListener;
}());
exports.default = FListener;
//# sourceMappingURL=FListener.js.map