"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nickname = void 0;
const value_1 = require("@domeniere/value");
class Nickname extends value_1.Value {
    constructor(value) {
        super();
        this._value = value;
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof Nickname) {
            const other = suspect;
            isEqual = this.value() === other.value();
        }
        return isEqual;
    }
    value() {
        return this._value;
    }
    serialize() {
        return this.value();
    }
}
exports.Nickname = Nickname;
