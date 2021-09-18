"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageId = void 0;
const value_1 = require("@domeniere/value");
const core_1 = require("@swindle/core");
class MessageId extends value_1.Value {
    constructor(value) {
        super();
        this._id = value;
    }
    static Generate() {
        return new MessageId(core_1.UUID.V4().id());
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof MessageId) {
            const other = suspect;
            isEqual = this.id() === other.id();
        }
        return isEqual;
    }
    id() {
        return this._id;
    }
    serialize() {
        return this.id();
    }
}
exports.MessageId = MessageId;
