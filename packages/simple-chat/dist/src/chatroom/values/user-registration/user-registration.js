"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistration = void 0;
const value_1 = require("@domeniere/value");
const core_1 = require("@swindle/core");
class UserRegistration extends value_1.Value {
    constructor(username, nickname) {
        super();
        this._nickname = nickname;
        this._username = username;
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof UserRegistration) {
            const other = suspect;
            const equalUsername = this.username().equals(other.username());
            const equalNickname = this.nickname() ? this.nickname().equals(other.nickname()) : this.nickname() === other.nickname();
            isEqual = equalNickname && equalUsername;
        }
        return isEqual;
    }
    nickname() {
        return this._nickname;
    }
    serialize() {
        throw new core_1.MethodUndefinedException();
    }
    username() {
        return this._username;
    }
}
exports.UserRegistration = UserRegistration;
