"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreFailed = void 0;
const domain_event_1 = require("../domain-event/domain-event");
const foundation_1 = require("@perivel/foundation");
const event_classification_enum_1 = require("../domain-event/event-classification.enum");
/**
 * EventStoreFailed
 *
 * The EventStoreFailed event indicates that the event store failed to store and event.
 */
class EventStoreFailed extends domain_event_1.DomainEvent {
    constructor(error, timestamp = foundation_1.DateTime.Now(), id = undefined) {
        super(timestamp, id);
        this._error = error;
    }
    /**
     * EventName()
     *
     * EventName() gets the event name.
     */
    static EventName() {
        return 'event-store-failed';
    }
    /**
     * EventClassification()
     *
     * EventClassification() gets the event classification.
     */
    static EventClassification() {
        return event_classification_enum_1.EventClassifications.InternalError.toString();
    }
    /**
     * EventName()
     *
     * EventName() gets the event name.
     */
    static EventVersion() {
        return 1.0;
    }
    /**
     * error()
     *
     * error() gets the error that occcured.
     */
    error() {
        return this._error;
    }
    /**
     * serialize()
     *
     * serialize() serializes the event data.
     */
    serializeData() {
        return JSON.stringify({
            error: this.error()
        });
    }
}
exports.EventStoreFailed = EventStoreFailed;
