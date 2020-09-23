"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreFailed = void 0;
const domain_event_1 = require("../domain-event/domain-event");
const foundation_1 = require("foundation");
const event_classification_enum_1 = require("../domain-event/event-classification.enum");
class EventStoreFailed extends domain_event_1.DomainEvent {
    constructor(error, timestamp = foundation_1.Timestamp.Now(), id = undefined) {
        super(timestamp, id);
        this._error = error;
    }
    static EventName() {
        return 'event-store-failed';
    }
    static EventClassification() {
        return event_classification_enum_1.EventClassifications.InternalError.toString();
    }
    static EventVersion() {
        return 1.0;
    }
    error() {
        return this._error;
    }
    serialize() {
        return JSON.stringify({
            error: this.error()
        });
    }
}
exports.EventStoreFailed = EventStoreFailed;
