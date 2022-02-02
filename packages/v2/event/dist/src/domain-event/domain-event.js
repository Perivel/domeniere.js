"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const event_emitter_1 = require("@swindle/event-emitter");
const core_1 = require("@swindle/core");
const event_classification_enum_1 = require("./event-classification.enum");
/**
 * DomainEvent
 *
 * DomainEvent represents something of interest that happened in the domain.
 *
 * When creating your own Domain Events, you must specifically specify the the
 * event name by redefining the EventName() static method.
 */
class DomainEvent extends event_emitter_1.CompositeEvent {
    /**
     * Creates a DomainEvent instance.
     * @param timestamp The timestamp of the event. If omitted, it will be set to the current DateTime timestamp.
     * @param id The unique occurence id for this specific event instance. This field is optional. It is highly recommended you do not provide this value manually.
     * @throws InvalidArgumentException if the event name is empty.
     */
    constructor(timestamp = core_1.DateTime.Now(), id = "") {
        super(timestamp, id);
        this._eventClassification = this.constructor.EventClassification();
        this._eventVersion = this.constructor.EventVersion();
    }
    /**
     * EventVersion()
     *
     * EventClassification() specifies the classification of the event.
     */
    static EventClassification() {
        return event_classification_enum_1.EventClassifications.Domain.toString();
    }
    /**
     * EventVersion()
     *
     * EventVersion() specifies the version number of the event.
     */
    static EventVersion() {
        return 1.0;
    }
    /**
     * eventClassification()
     *
     * eventClassification() gets the classification of the event.
     */
    eventClassification() {
        return this._eventClassification;
    }
    /**
     * eventVersion()
     *
     * eventVersion() gets the version number of the event.
     */
    eventVersion() {
        return this._eventVersion;
    }
    /**
     * isError()
     *
     * isError() indicates if the event is an error event.
     */
    isError() {
        return this.eventClassification() === event_classification_enum_1.EventClassifications.InternalError.toString();
    }
    /**
     * isInternal()
     *
     * isInternal() determines if the event is an internal framework event.
     */
    isInternal() {
        return (this.eventClassification() === event_classification_enum_1.EventClassifications.InternalEvent.toString()) || (this.eventClassification() === event_classification_enum_1.EventClassifications.InternalError.toString());
    }
    /**
     * serialize()
     *
     * serialize() serializes the event data.
     */
    serialize() {
        return JSON.stringify({
            id: this.eventId().serialize(),
            name: this.eventName(),
            classification: this.eventClassification(),
            version: this.eventVersion(),
            data: this.serializeData()
        });
    }
    /**
     * shouldBeBroadcasted()
     *
     * shouldBeBroadcasted() determines if the event should be broadcasted to the network.
     */
    shouldBeBroadcasted() {
        return true;
    }
    toString() {
        return this.serialize();
    }
}
exports.DomainEvent = DomainEvent;
//# sourceMappingURL=domain-event.js.map