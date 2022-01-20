"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
function testReversed(input, output) {
    var e_1, _a;
    var yielded = [];
    try {
        for (var _b = __values(index_1.reversed(input)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var element = _c.value;
            yielded.push(element);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    expect(output).toEqual(yielded);
}
describe('testing reversed', function () {
    var testCases = [
        [[], []],
        [[0], [0]],
        [[0, 1, 2, 3], [3, 2, 1, 0]],
        [['a', 'b', 'c'], ['c', 'b', 'a']],
        ['abc', ['c', 'b', 'a']],
    ];
    testCases.forEach(function (_a) {
        var _b = __read(_a, 2), input = _b[0], output = _b[1];
        return it("Given " + input + " should yield " + output, function () { return testReversed(input, output); });
    });
});
//# sourceMappingURL=reversed.test.js.map