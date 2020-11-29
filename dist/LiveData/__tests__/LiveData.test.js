"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LiveData_1 = __importDefault(require("../LiveData"));
var DummyObject = /** @class */ (function () {
    function DummyObject(name) {
        this.name = name;
    }
    return DummyObject;
}());
var LiveDataSyncer = /** @class */ (function () {
    function LiveDataSyncer() {
    }
    LiveDataSyncer.prototype.onEvent = function (event) {
        this.data = event.next;
    };
    return LiveDataSyncer;
}());
describe("testing LiveData", function () {
    it("allows us to set/get numbers", function () {
        var liveData = new LiveData_1.default(0);
        expect(liveData.get()).toEqual(0);
        liveData.set(5);
        expect(liveData.get()).toEqual(5);
    });
    it("allows us to set/get strings", function () {
        var liveData = new LiveData_1.default("");
        expect(liveData.get()).toEqual("");
        liveData.set("hello");
        expect(liveData.get()).toEqual("hello");
    });
    it("allows us to set/get complex objects", function () {
        var initialObject = new DummyObject("");
        var liveData = new LiveData_1.default(initialObject);
        expect(liveData.get()).toEqual(initialObject);
        liveData.set(new DummyObject("hi"));
        expect(liveData.get()).not.toEqual(initialObject);
    });
});
describe("test listening on live data", function () {
    it("sends an event without 'from' on subscription", function () {
        var liveData = new LiveData_1.default(3);
        var synced = new LiveDataSyncer();
        liveData.subscribe(synced);
        expect(synced.data).toBe(3);
    });
    it("sends an event when changing the data inside", function () {
        var liveData = new LiveData_1.default(3);
        var synced = new LiveDataSyncer();
        liveData.subscribe(synced);
        liveData.set(7);
        expect(synced.data).toBe(7);
    });
    it("allows us to unsubscribe", function () {
        var liveData = new LiveData_1.default(3);
        var synced = new LiveDataSyncer();
        liveData.subscribe(synced);
        liveData.set(7);
        liveData.unSubscribe(synced);
        liveData.set(9);
        expect(synced.data).toBe(7);
    });
    it("allows us to unsubscribe, with purge", function () {
        var liveData = new LiveData_1.default(3);
        var synced = new LiveDataSyncer();
        liveData.subscribe(synced);
        liveData.set(7);
        liveData.purge();
        liveData.set(9);
        expect(synced.data).toBe(7);
    });
});
//# sourceMappingURL=LiveData.test.js.map