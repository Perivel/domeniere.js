"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Username = void 0;
const value_1 = require("@domeniere/value");
class Username extends value_1.Value {
    constructor(first, last) {
        super();
        this._first = first;
        this._last = last;
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof Username) {
            const other = suspect;
            isEqual = ((this.first() === other.first()) &&
                (this.last() === other.last()));
        }
        return isEqual;
    }
    first() {
        return this._first;
    }
    last() {
        return this._last;
    }
    serialize() {
        return JSON.stringify({
            first: this.first(),
            last: this.last(),
        });
    }
}
exports.Username = Username;
