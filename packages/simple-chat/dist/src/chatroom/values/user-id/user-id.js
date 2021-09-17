"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const value_1 = require("@domeniere/value");
const core_1 = require("@swindle/core");
class UserId extends value_1.Value {
    constructor(value) {
        super();
        this._value = value;
    }
    static Generate() {
        return new UserId(core_1.UUID.V4().id());
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof UserId) {
            const other = suspect;
            isEqual = this.id() === other.id();
        }
        return isEqual;
    }
    id() {
        return this._value;
    }
    serialize() {
        return this.id();
    }
}
exports.UserId = UserId;
