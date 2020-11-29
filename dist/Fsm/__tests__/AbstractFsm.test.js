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
var __1 = require("..");
var exceptions = __importStar(require("../../Exceptions"));
var States;
(function (States) {
    States[States["IDLE"] = 0] = "IDLE";
    States[States["RUNNING"] = 1] = "RUNNING";
    States[States["JUMPING"] = 2] = "JUMPING";
    States[States["FLYING"] = 3] = "FLYING";
})(States || (States = {}));
var TestFsm = /** @class */ (function (_super) {
    __extends(TestFsm, _super);
    function TestFsm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TestFsm.prototype, "initialState", {
        get: function () {
            return States.IDLE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TestFsm.prototype, "transitions", {
        get: function () {
            return [
                { from: States.IDLE, to: States.RUNNING },
                { from: States.IDLE, to: States.JUMPING },
                { from: States.RUNNING, to: States.JUMPING },
                { from: States.JUMPING, to: States.IDLE },
                { from: States.JUMPING, to: States.RUNNING },
            ];
        },
        enumerable: false,
        configurable: true
    });
    return TestFsm;
}(__1.AbstractFsm));
describe("Testing a basic fsm", function () {
    it("starts with the intial sate", function () {
        expect(new TestFsm().getState()).toBe(States.IDLE);
    });
    it("can transition to next state", function () {
        expect(new TestFsm().transitionTo(States.RUNNING).getState())
            .toBe(States.RUNNING);
    });
    it("can transition to next state, multiple times", function () {
        expect(new TestFsm()
            .transitionTo(States.RUNNING)
            .transitionTo(States.JUMPING)
            .getState())
            .toBe(States.JUMPING);
    });
    it("cannot transition to same state (unless a transition exists)", function () {
        expect(function () { return new TestFsm()
            .transitionTo(States.RUNNING)
            .transitionTo(States.RUNNING)
            .getState(); })
            .toThrowError(exceptions.InvalidArguments);
    });
    it("cannot transition to another state if no transition", function () {
        expect(function () { return new TestFsm()
            .transitionTo(States.RUNNING)
            .transitionTo(States.FLYING)
            .getState(); })
            .toThrowError(exceptions.InvalidArguments);
    });
    test("We can query if transitionning is possible", function () {
        expect(new TestFsm().transitionTo(States.RUNNING).canTransitionTo(States.JUMPING))
            .toBe(true);
        expect(new TestFsm().transitionTo(States.RUNNING).canTransitionTo(States.FLYING))
            .toBe(false);
    });
});
//# sourceMappingURL=AbstractFsm.test.js.map