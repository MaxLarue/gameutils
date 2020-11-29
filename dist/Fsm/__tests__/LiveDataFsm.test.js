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
var __1 = require("..");
var LiveData_1 = require("../../LiveData");
var State;
(function (State) {
    State[State["IDLING"] = 0] = "IDLING";
    State[State["RUNNING"] = 1] = "RUNNING";
})(State || (State = {}));
var TestFsm = /** @class */ (function (_super) {
    __extends(TestFsm, _super);
    function TestFsm() {
        var _this = _super.call(this) || this;
        _this.speed = new LiveData_1.LiveData(0);
        _this.subscribeRule(_this.speed, function (e) {
            if (e.previous < 0.5 && e.next > 0.5) {
                _this.transitionTo(State.RUNNING);
            }
            else if (e.previous > 0.5 && e.next < 0.5) {
                _this.transitionTo(State.IDLING);
            }
        });
        return _this;
    }
    Object.defineProperty(TestFsm.prototype, "initialState", {
        get: function () {
            return State.IDLING;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TestFsm.prototype, "transitions", {
        get: function () {
            return [
                { from: State.IDLING, to: State.RUNNING },
                { from: State.RUNNING, to: State.IDLING },
            ];
        },
        enumerable: false,
        configurable: true
    });
    return TestFsm;
}(__1.LiveDataFsm));
describe("testing LiveDatFsm", function () {
    it("is possible to create a new fsm", function () {
        new TestFsm();
    });
    it("will change state based on livedata", function () {
        var fsm = new TestFsm();
        expect(fsm.getState()).toBe(State.IDLING);
        fsm.speed.set(10);
        expect(fsm.getState()).toBe(State.RUNNING);
    });
    it("will change state based on livedata, back and forth", function () {
        var fsm = new TestFsm();
        expect(fsm.getState()).toBe(State.IDLING);
        fsm.speed.set(10);
        expect(fsm.getState()).toBe(State.RUNNING);
        fsm.speed.set(0);
        expect(fsm.getState()).toBe(State.IDLING);
    });
});
//# sourceMappingURL=LiveDataFsm.test.js.map