"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRegistration = void 0;
const framework_1 = require("@domeniere/framework");
const core_1 = require("@swindle/core");
/**
 * AccountRegistration
 *
 * An account registration.
 */
class AccountRegistration extends framework_1.Value {
    constructor(username, tag, dob) {
        super();
        this._dob = dob;
        this._tag = tag;
        this._username = username;
    }
    /**
     * age()
     *
     * gets the age of the registrant.
     */
    age() {
        const now = core_1.DateTime.Now();
        const dobInYears = Math.floor(core_1.Duration.FromDateTimeDifference(now, this.dob().toUtc()).inYears());
        return Math.abs(dobInYears);
    }
    /**
     * dob()
     *
     * gets the date of birth.
     */
    dob() {
        return this._dob;
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof AccountRegistration) {
            const other = suspect;
            isEqual = (this.username().equals(other.username()) &&
                this.dob().equals(other.dob()) &&
                this.tag().equals(other.tag()));
        }
        return isEqual;
    }
    serialize() {
        return JSON.stringify({
            dob: this.dob().toString(),
            username: this.username().toString(),
            age: this.age(),
            tag: this.tag().toString(),
        });
    }
    /**
     * tag()
     *
     * gets the tag.
     */
    tag() {
        return this._tag;
    }
    /**
     * username()
     *
     * gets the username.
     */
    username() {
        return this._username;
    }
}
exports.AccountRegistration = AccountRegistration;
