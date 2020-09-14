import { Timestamp } from "foundation";
import { DomainEventId } from "./domain-event-id";
import { EventClassifications } from "./event-classification.enum";
export class DomainEvent {
    constructor(timestamp = Timestamp.Now(), id = "") {
        this._timestamp = timestamp;
        this._id = (id) ? new DomainEventId(id) : DomainEventId.Generate();
        this._eventName = this.constructor.EventName();
        this._eventClassification = this.constructor.EventClassification();
        this._eventVersion = this.constructor.EventVersion();
    }
    static EventClassification() {
        return EventClassifications.Domain.toString();
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
        return new DomainEventId(this._id.id());
    }
    eventName() {
        return this._eventName;
    }
    eventVersion() {
        return this._eventVersion;
    }
    isError() {
        return this.eventClassification() === EventClassifications.InternalError.toString();
    }
    isInternal() {
        return (this.eventClassification() === EventClassifications.InternalEvent.toString()) || (this.eventClassification() === EventClassifications.InternalError.toString());
    }
    occuredOn() {
        return this._timestamp;
    }
    serialize() {
        return "";
    }
}
