"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Username = void 0;
const framework_1 = require("@domeniere/framework");
/**
 * Username
 *
 * A username
 */
class Username extends framework_1.Value {
    constructor(value) {
        super();
        this._val = value;
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof Username) {
            const other = suspect;
            isEqual = this.value() === other.value();
        }
        return isEqual;
    }
    serialize() {
        return this.value();
    }
    /**
     * value()
     *
     * gets the value of the username.
     */
    value() {
        return this._val;
    }
}
exports.Username = Username;
