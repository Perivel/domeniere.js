"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandlerFailed = void 0;
const domain_event_1 = require("../domain-event/domain-event");
const foundation_1 = require("foundation");
const event_classification_enum_1 = require("../domain-event/event-classification.enum");
class EventHandlerFailed extends domain_event_1.DomainEvent {
    constructor(handler, event, timestamp = foundation_1.Timestamp.Now(), id = undefined) {
        super(timestamp, id);
        this._handler = handler;
        this._event = event;
    }
    static EventName() {
        return 'event-handler-failed';
    }
    static EventClassification() {
        return event_classification_enum_1.EventClassifications.InternalError.toString();
    }
    static EventVersion() {
        return 1.0;
    }
    event() {
        return this._event;
    }
    handler() {
        return this._handler;
    }
    attempts() {
        return this.handler().handleAttempts();
    }
    serialize() {
        const obj = {
            event: this.event(),
            handler: this.handler()
        };
        return JSON.stringify(obj);
    }
}
exports.EventHandlerFailed = EventHandlerFailed;
