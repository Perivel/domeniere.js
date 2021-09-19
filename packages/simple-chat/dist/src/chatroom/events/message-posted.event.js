"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePosted = void 0;
const event_1 = require("@domeniere/event");
const core_1 = require("@swindle/core");
class MessagePosted extends event_1.DomainEvent {
    constructor(mesage, conversation, occuredOn = core_1.DateTime.Now(), id = undefined) {
        super(occuredOn, id);
        this._message = mesage;
        this._conversation = conversation;
    }
    static EventClassification() {
        return 'simple-chat';
    }
    static EventName() {
        return 'message-posted';
    }
    static EventVersion() {
        return 1.0;
    }
    message() {
        return this._message;
    }
    conversation() {
        return this._conversation;
    }
    isError() {
        return false;
    }
    serializeData() {
        return JSON.stringify({
            message: this.message().serialize(),
            conversation: this.conversation().serialize()
        });
    }
    shouldBeBroadcasted() {
        return true;
    }
}
exports.MessagePosted = MessagePosted;
