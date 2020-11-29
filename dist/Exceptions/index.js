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
exports.AssertionError = exports.InvalidArguments = exports.DivideByZeroException = void 0;
var DivideByZeroException = /** @class */ (function (_super) {
    __extends(DivideByZeroException, _super);
    function DivideByZeroException() {
        var _this = _super.call(this, "Division by zero") || this;
        Object.setPrototypeOf(_this, DivideByZeroException.prototype);
        return _this;
    }
    return DivideByZeroException;
}(Error));
exports.DivideByZeroException = DivideByZeroException;
var InvalidArguments = /** @class */ (function (_super) {
    __extends(InvalidArguments, _super);
    function InvalidArguments(msg) {
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, InvalidArguments.prototype);
        return _this;
    }
    return InvalidArguments;
}(Error));
exports.InvalidArguments = InvalidArguments;
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError(msg) {
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, AssertionError.prototype);
        return _this;
    }
    return AssertionError;
}(Error));
exports.AssertionError = AssertionError;
//# sourceMappingURL=index.js.map