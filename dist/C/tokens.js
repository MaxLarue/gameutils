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
exports.TokenFsm = exports.TrashTokens = exports.TokenType = void 0;
var Fsm_1 = require("../Fsm");
var TokenType;
(function (TokenType) {
    TokenType[TokenType["IDENTIFIER"] = 0] = "IDENTIFIER";
    TokenType[TokenType["GROUP_OPEN"] = 1] = "GROUP_OPEN";
    TokenType[TokenType["GROUP_CLOSE"] = 2] = "GROUP_CLOSE";
    TokenType[TokenType["IDLE"] = 3] = "IDLE";
    TokenType[TokenType["INVALID"] = 4] = "INVALID";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
exports.TrashTokens = [
    "\t",
    "\n",
    "\r",
    " ",
];
var TokenFsm = /** @class */ (function (_super) {
    __extends(TokenFsm, _super);
    function TokenFsm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TokenFsm.prototype, "initialState", {
        get: function () {
            return TokenType.IDLE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TokenFsm.prototype, "transitions", {
        get: function () {
            return [
                { from: TokenType.IDLE, to: TokenType.IDENTIFIER },
                { from: TokenType.IDLE, to: TokenType.GROUP_OPEN },
                { from: TokenType.IDENTIFIER, to: TokenType.IDLE },
                { from: TokenType.IDENTIFIER, to: TokenType.GROUP_OPEN },
                { from: TokenType.IDLE, to: TokenType.GROUP_CLOSE },
                { from: TokenType.GROUP_CLOSE, to: TokenType.IDLE },
                { from: TokenType.GROUP_CLOSE, to: TokenType.IDENTIFIER },
            ];
        },
        enumerable: false,
        configurable: true
    });
    return TokenFsm;
}(Fsm_1.AbstractFsm));
exports.TokenFsm = TokenFsm;
//# sourceMappingURL=tokens.js.map