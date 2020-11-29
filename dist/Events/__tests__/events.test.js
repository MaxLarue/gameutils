"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Events;
(function (Events) {
    Events[Events["BIRTH"] = 0] = "BIRTH";
    Events[Events["SCHOOL"] = 1] = "SCHOOL";
    Events[Events["WORK"] = 2] = "WORK";
    Events[Events["WEDDING"] = 3] = "WEDDING";
    Events[Events["DEATH"] = 4] = "DEATH";
})(Events || (Events = {}));
var DummyListener = /** @class */ (function () {
    function DummyListener() {
        this.recordedEvents = [];
    }
    DummyListener.prototype.onEvent = function (event) {
        this.recordedEvents.push(event);
    };
    return DummyListener;
}());
describe("Emitting with a single listener", function () {
    it("Generates the event, listener receives it", function () {
        var emitter = new __1.Emitter();
        var listener = new DummyListener();
        emitter.subscribe(listener);
        expect(listener.recordedEvents.length).toBe(0);
        emitter.emit(Events.BIRTH);
        expect(listener.recordedEvents).toEqual([Events.BIRTH]);
    });
    it("Generates multiple events, listener receives all", function () {
        var emitter = new __1.Emitter();
        var listener = new DummyListener();
        emitter.subscribe(listener);
        expect(listener.recordedEvents.length).toBe(0);
        emitter.emit(Events.BIRTH);
        emitter.emit(Events.SCHOOL);
        emitter.emit(Events.WORK);
        emitter.emit(Events.WEDDING);
        emitter.emit(Events.DEATH);
        expect(listener.recordedEvents).toEqual([
            Events.BIRTH,
            Events.SCHOOL,
            Events.WORK,
            Events.WEDDING,
            Events.DEATH
        ]);
    });
    test("we can unsubscribe from an emitter", function () {
        var emitter = new __1.Emitter();
        var listener = new DummyListener();
        emitter.subscribe(listener);
        emitter.emit(Events.BIRTH);
        expect(listener.recordedEvents.length).toBe(1);
        emitter.unSubscribe(listener);
        emitter.emit(Events.BIRTH);
        expect(listener.recordedEvents.length).toBe(1);
    });
    test("if we purge an emitter, our listener won't be called", function () {
        var emitter = new __1.Emitter();
        var listener = new DummyListener();
        emitter.subscribe(listener);
        emitter.emit(Events.BIRTH);
        expect(listener.recordedEvents.length).toBe(1);
        emitter.purge();
        emitter.emit(Events.BIRTH);
        expect(listener.recordedEvents.length).toBe(1);
    });
});
describe("Emitting with multiple listeners", function () {
    it("Generates the event, both listener receives it", function () {
        var emitter = new __1.Emitter();
        var listener1 = new DummyListener();
        var listener2 = new DummyListener();
        emitter.subscribe(listener1);
        emitter.subscribe(listener2);
        expect(listener1.recordedEvents.length).toBe(0);
        expect(listener2.recordedEvents.length).toBe(0);
        emitter.emit(Events.BIRTH);
        expect(listener1.recordedEvents).toEqual([Events.BIRTH]);
        expect(listener2.recordedEvents).toEqual([Events.BIRTH]);
    });
    test("if only one listener is subscribed, only he receives the event", function () {
        var emitter = new __1.Emitter();
        var listener1 = new DummyListener();
        var listener2 = new DummyListener();
        emitter.subscribe(listener1);
        expect(listener1.recordedEvents.length).toBe(0);
        expect(listener2.recordedEvents.length).toBe(0);
        emitter.emit(Events.BIRTH);
        expect(listener1.recordedEvents).toEqual([Events.BIRTH]);
        expect(listener2.recordedEvents).toEqual([]);
    });
    test("if we purge an emitter, both listeners won't be called", function () {
        var emitter = new __1.Emitter();
        var listener1 = new DummyListener();
        var listener2 = new DummyListener();
        emitter.subscribe(listener1);
        emitter.subscribe(listener2);
        emitter.purge();
        emitter.emit(Events.BIRTH);
        expect(listener1.recordedEvents).toEqual([]);
        expect(listener2.recordedEvents).toEqual([]);
    });
});
//# sourceMappingURL=events.test.js.map