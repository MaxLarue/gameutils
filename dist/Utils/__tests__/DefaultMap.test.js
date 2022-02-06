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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
describe('Testing the default map', function () {
    it('calls the factory when it has no value', function () {
        var map = new index_1.DefaultMap(function () { return 0; });
        expect(map.get('l')).toEqual(0);
    });
    it('can be used for histogram', function () {
        var e_1, _a;
        var map = new index_1.DefaultMap(function () { return 0; });
        try {
            for (var _b = __values('hello world'), _c = _b.next(); !_c.done; _c = _b.next()) {
                var letter = _c.value;
                map.update(letter, function (count) { return count + 1; });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        expect(map.get('l')).toEqual(3);
    });
    it('can set value', function () {
        var map = new index_1.DefaultMap(function () { return 0; });
        map.set('l', 15);
        expect(map.get('l')).toEqual(15);
    });
    it('passes the key to the factory', function () {
        var map = new index_1.DefaultMap(function (key) {
            if (key === 'l') {
                return 10;
            }
            return 1;
        });
        expect(map.get('l')).toEqual(10);
        expect(map.get('o')).toEqual(1);
    });
    it('can be cleared', function () {
        var map = new index_1.DefaultMap(function () { return 0; });
        map.set('l', 15);
        map.clear();
        expect(map.get('l')).toEqual(0);
    });
});
//# sourceMappingURL=DefaultMap.test.js.map