"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationCreated = void 0;
const event_1 = require("@domeniere/event");
const core_1 = require("@swindle/core");
class ConversationCreated extends event_1.DomainEvent {
    constructor(conversation, occuredOn = core_1.DateTime.Now(), id = undefined) {
        super(occuredOn, id);
        this._conversation = conversation;
    }
    static EventClassification() {
        return 'simple-chat';
    }
    static EventName() {
        return 'conversation-created';
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
            conversation: this.conversation().serialize()
        });
    }
    shouldBeBroadcasted() {
        return true;
    }
}
exports.ConversationCreated = ConversationCreated;
