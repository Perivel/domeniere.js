"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const foundation_1 = require("foundation");
const domain_event_id_1 = require("./domain-event-id");
const event_classification_enum_1 = require("./event-classification.enum");
class DomainEvent {
    constructor(timestamp = foundation_1.Timestamp.Now(), id = "") {
        this._timestamp = timestamp;
        this._id = (id) ? new domain_event_id_1.DomainEventId(id) : domain_event_id_1.DomainEventId.Generate();
        this._eventName = this.constructor.EventName();
        this._eventClassification = this.constructor.EventClassification();
        this._eventVersion = this.constructor.EventVersion();
    }
    static EventClassification() {
        return event_classification_enum_1.EventClassifications.Domain.toString();
    }
    static EventName() {
        throw new Error('EventNotSpecifiedException.');
    }
    static EventVersion() {
        return 1.0;
    }
    eventClassification() {
        return this._eventClassification;
    }
    eventId() {
        return new domain_event_id_1.DomainEventId(this._id.id());
    }
    eventName() {
        return this._eventName;
    }
    eventVersion() {
        return this._eventVersion;
    }
    isError() {
        return this.eventClassification() === event_classification_enum_1.EventClassifications.InternalError.toString();
    }
    isInternal() {
        return (this.eventClassification() === event_classification_enum_1.EventClassifications.InternalEvent.toString()) || (this.eventClassification() === event_classification_enum_1.EventClassifications.InternalError.toString());
    }
    occuredOn() {
        return this._timestamp;
    }
    serialize() {
        return "";
    }
    shouldBeBroadcasted() {
        return true;
    }
}
exports.DomainEvent = DomainEvent;
