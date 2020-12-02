"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var TagManager = /** @class */ (function () {
    function TagManager(tags) {
        this.tags = new Set();
        this.tags = new Set(tags);
    }
    TagManager.prototype.hasTag = function (tag) {
        return this.tags.has(tag);
    };
    TagManager.prototype.hasAnyTag = function (tags) {
        var _this = this;
        return Utils_1.any(tags.map(function (t) { return _this.hasTag(t); }));
    };
    return TagManager;
}());
exports.default = TagManager;
//# sourceMappingURL=TagManager.js.map