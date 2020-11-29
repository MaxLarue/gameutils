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
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions = __importStar(require("../Exceptions"));
var AbstractFsm = /** @class */ (function () {
    function AbstractFsm() {
        this.init();
    }
    AbstractFsm.prototype.getState = function () {
        return this.state;
    };
    AbstractFsm.prototype.transitionTo = function (state) {
        if (!this.canTransitionTo(state))
            throw new exceptions.InvalidArguments("Tried transitioning from " + this.state + " to " + state + ", which doesn't have a transition");
        this.state = state;
        return this;
    };
    AbstractFsm.prototype.canTransitionTo = function (state) {
        return this.getTransitionsFrom(this.state).map(function (s) { return s.to; }).includes(state);
    };
    AbstractFsm.prototype.init = function () {
        this.state = this.initialState;
    };
    AbstractFsm.prototype.getTransitionsFrom = function (from) {
        return this.transitions.filter(function (transition) { return transition.from === from; });
    };
    AbstractFsm.prototype.getTransitionsTo = function (to) {
        return this.transitions.filter(function (transition) { return transition.to === to; });
    };
    return AbstractFsm;
}());
exports.default = AbstractFsm;
//# sourceMappingURL=AbstractFsm.js.map