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
var State;
(function (State) {
    State[State["RUNING"] = 0] = "RUNING";
    State[State["JUMPING"] = 1] = "JUMPING";
    State[State["DUCKING"] = 2] = "DUCKING";
    State[State["IDLING"] = 3] = "IDLING";
    State[State["LANDING"] = 4] = "LANDING";
})(State || (State = {}));
var TestFsm = /** @class */ (function (_super) {
    __extends(TestFsm, _super);
    function TestFsm() {
        return _super !== null && _super.apply(this, arguments) || this;
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
                { from: State.IDLING, to: State.RUNING },
                { from: State.IDLING, to: State.DUCKING },
                { from: State.RUNING, to: State.JUMPING },
                { from: State.JUMPING, to: State.LANDING },
                { from: State.LANDING, to: State.IDLING },
            ];
        },
        enumerable: false,
        configurable: true
    });
    return TestFsm;
}(__1.ObservableFsm));
var DummyListener = /** @class */ (function () {
    function DummyListener() {
        this.history = [];
    }
    DummyListener.prototype.onEvent = function (event) {
        this.history.push(event);
    };
    return DummyListener;
}());
describe("Testing the observable fsm", function () {
    it("records whatever transition happens in the fsm", function () {
        var listener = new DummyListener();
        var fsm = new TestFsm();
        fsm.subscribe(listener);
        fsm.transitionTo(State.RUNING);
        fsm.transitionTo(State.JUMPING);
        fsm.transitionTo(State.LANDING);
        fsm.transitionTo(State.IDLING);
        fsm.transitionTo(State.DUCKING);
        expect(listener.history)
            .toEqual([
            { from: State.IDLING, to: State.RUNING },
            { from: State.RUNING, to: State.JUMPING },
            { from: State.JUMPING, to: State.LANDING },
            { from: State.LANDING, to: State.IDLING },
            { from: State.IDLING, to: State.DUCKING },
        ]);
    });
});
//# sourceMappingURL=ObservableFsm.test.js.map