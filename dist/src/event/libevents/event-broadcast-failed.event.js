"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBroadcastFailed = void 0;
const domain_event_1 = require("../domain-event/domain-event");
const foundation_1 = require("@perivel/foundation");
const event_classification_enum_1 = require("../domain-event/event-classification.enum");
/**
 * EventBroadcastFailed
 *
 * The EventBroadcastFailed event indicates that the event broadcasting service failed.
 */
class EventBroadcastFailed extends domain_event_1.DomainEvent {
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
        return 'event-broadcast-failed';
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
     * EventVersion()
     *
     * EventVersion() gets the event version.
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
     * serializeData()
     *
     * serializeData() serializes the event data.
     */
    serializeData() {
        return JSON.stringify({
            error: this.error().message
        });
    }
}
exports.EventBroadcastFailed = EventBroadcastFailed;
//# sourceMappingURL=event-broadcast-failed.event.js.map