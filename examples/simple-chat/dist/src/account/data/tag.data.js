"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagData = void 0;
const framework_1 = require("@domeniere/framework");
class TagData extends framework_1.Data {
    constructor(tag) {
        super();
        this.tag = tag;
    }
    serialize() {
        return this.tag;
    }
}
exports.TagData = TagData;
