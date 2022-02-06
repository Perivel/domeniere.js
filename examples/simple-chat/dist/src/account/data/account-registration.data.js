"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRegistrationData = void 0;
const framework_1 = require("@domeniere/framework");
class AccountRegistrationData extends framework_1.Data {
    constructor(username, tag, dob) {
        super();
        this.username = username;
        this.tag = tag;
        this.dob = dob;
    }
    serialize() {
        return JSON.stringify({
            username: this.username,
            tag: this.tag,
            dob: this.dob.toString(),
        });
    }
}
exports.AccountRegistrationData = AccountRegistrationData;
