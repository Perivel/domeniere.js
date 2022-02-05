"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const framework_1 = require("@domeniere/framework");
const core_1 = require("@swindle/core");
/**
 * Account
 *
 * A user account.
 */
class Account extends framework_1.TimestampedAggregate {
    constructor(user, version = 1.0, createdOn = core_1.DateTime.Now(), updatedOn = core_1.DateTime.Now(), deletedOn = null) {
        super(user, version, createdOn, updatedOn, deletedOn);
    }
    equals(suspect) {
        let isEquals = false;
        if (suspect instanceof Account) {
            const other = suspect;
            isEquals = this.id().equals(other.id());
        }
        return isEquals;
    }
    id() {
        return super.id();
    }
    /**
     * ownerAge()
     *
     * gets the owner age.
     */
    ownerAge() {
        return this.root().age();
    }
    /**
     * ownerDob()
     *
     * gets the owner date of birth.
     */
    ownerDob() {
        return this.root().dob();
    }
    root() {
        return super.root();
    }
    serializeData() {
        return JSON.stringify({});
    }
    /**
     * setUsername()
     *
     * sets the username.
     * @param username the username to set.
     */
    setUsername(username) {
        this.root().setUsername(username);
        this.commitStateChanges();
    }
    /**
     * tag()
     *
     * gets the tag.
     */
    tag() {
        return this.root().tag();
    }
    /**
     * username()
     *
     * gets the account username.
     */
    username() {
        return this.root().username();
    }
}
exports.Account = Account;
