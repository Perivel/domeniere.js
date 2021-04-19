"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandlerFailed = void 0;
const domain_event_1 = require("../domain-event/domain-event");
const foundation_1 = require("foundation");
const event_classification_enum_1 = require("../domain-event/event-classification.enum");
/**
 * EventHandlerFailed
 *
 * EventHandlerFailed indicates that an event handler has failed.
 */
class EventHandlerFailed extends domain_event_1.DomainEvent {
    constructor(handler, event, timestamp = foundation_1.DateTime.Now(), id = undefined) {
        super(timestamp, id);
        this._handler = handler;
        this._event = event;
    }
    /**
     * EventName()
     *
     * EventName() gets the event name.
     */
    static EventName() {
        return 'event-handler-failed';
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
     * event()
     *
     * event() gets the event that caused the error.
     */
    event() {
        return this._event;
    }
    /**
     * handler()
     *
     * handler() gets 4he event handler.
     */
    handler() {
        return this._handler;
    }
    /**
     * attempts()
     *
     * attempts() gets the number of attemmps the handler has been executed for the current event.
     */
    attempts() {
        return this.handler().handleAttempts();
    }
    /**
     * serialize()
     *
     * serialsie() serializes the event data.
     */
    serialize() {
        const obj = {
            event: this.event(),
            handler: this.handler()
        };
        return JSON.stringify(obj);
    }
}
exports.EventHandlerFailed = EventHandlerFailed;
