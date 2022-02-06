"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCreated = void 0;
const framework_1 = require("@domeniere/framework");
const core_1 = require("@swindle/core");
/**
 * AccountCreated
 *
 * An event indicating that an account was created successfully.
 */
class AccountCreated extends framework_1.DomainEvent {
    constructor(account, occuredOn = core_1.DateTime.Now(), id = undefined) {
        super(occuredOn, id);
        this._account = account;
    }
    static EventClassification() {
        return 'simple-chat';
    }
    static EventName() {
        return 'account-created';
    }
    static EventVersion() {
        return 1.0;
    }
    account() {
        return this._account;
    }
    isError() {
        return false;
    }
    serializeData() {
        return JSON.stringify({
            account: this.account().toString(),
        });
    }
    shouldBeBroadcasted() {
        return true;
    }
}
exports.AccountCreated = AccountCreated;
