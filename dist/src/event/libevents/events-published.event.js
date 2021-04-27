"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsPublished = void 0;
const domain_event_1 = require("../domain-event/domain-event");
const foundation_1 = require("@perivel/foundation");
const event_classification_enum_1 = require("../domain-event/event-classification.enum");
/**
 * EventsPublished
 *
 * An event indicating that domain events were published successfully.
 */
class EventsPublished extends domain_event_1.DomainEvent {
    constructor(events, timestamp = foundation_1.DateTime.Now(), id = undefined) {
        super(timestamp, id);
        this._events = events;
    }
    /**
     * EventName()
     *
     * EventName() gets the event name.
     */
    static EventName() {
        return 'event-published';
    }
    /**
     * EventClassification()
     *
     * EventClassification() gets the event classification.
     */
    static EventClassification() {
        return event_classification_enum_1.EventClassifications.InternalEvent.toString();
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
     * events()
     *
     * events() gets the events that were published.
     */
    events() {
        return this._events;
    }
    /**
     * serializeData()
     *
     * serializeData() serializes the event data.
     */
    serializeData() {
        return JSON.stringify({
            events: this.events().toArray().map(event => {
                event.serialize();
            })
        });
    }
}
exports.EventsPublished = EventsPublished;
