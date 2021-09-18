"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationId = void 0;
const VALUE_1 = require("@domeniere/VALUE");
const core_1 = require("@swindle/core");
class ConversationId extends VALUE_1.Value {
    constructor(value) {
        super();
        this._id = value;
    }
    static Generate() {
        return new ConversationId(core_1.UUID.V4().id());
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof ConversationId) {
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
exports.ConversationId = ConversationId;
