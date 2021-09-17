"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreated = void 0;
const event_1 = require("@domeniere/event");
const core_1 = require("@swindle/core");
class UserCreated extends event_1.DomainEvent {
    constructor(user, occuredOn = core_1.DateTime.Now(), id = undefined) {
        super(occuredOn, id);
        this._user = user;
    }
    static EventClassification() {
        return 'simple-chat';
    }
    static EventName() {
        return 'user-created';
    }
    static EventVersion() {
        return 1.0;
    }
    isError() {
        return false;
    }
    serializeData() {
        return JSON.stringify({
            user: this.user().serialize()
        });
    }
    shouldBeBroadcasted() {
        return true;
    }
    user() {
        return this._user;
    }
}
exports.UserCreated = UserCreated;
