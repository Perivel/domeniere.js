"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationJoined = void 0;
const event_1 = require("@domeniere/event");
const core_1 = require("@swindle/core");
class ConversationJoined extends event_1.DomainEvent {
    constructor(user, conversation, occuredOn = core_1.DateTime.Now(), id = undefined) {
        super(occuredOn, id);
        this._conversation = conversation;
        this._user = user;
    }
    static EventClassification() {
        return 'simple-chat';
    }
    static EventName() {
        return 'conversation-joined';
    }
    static EventVersion() {
        return 1.0;
    }
    conversation() {
        return this._conversation;
    }
    isError() {
        return false;
    }
    serializeData() {
        return JSON.stringify({
            conversation: this.conversation().serialize(),
            user: this.user().serialize(),
        });
    }
    shouldBeBroadcasted() {
        return true;
    }
    user() {
        return this._user;
    }
}
exports.ConversationJoined = ConversationJoined;
