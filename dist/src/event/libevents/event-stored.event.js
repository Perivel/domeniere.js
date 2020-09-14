import { DomainEvent } from "../domain-event/domain-event";
import { Timestamp } from "foundation";
import { EventClassifications } from "../domain-event/event-classification.enum";
export class EventStored extends DomainEvent {
    constructor(event, timestamp = Timestamp.Now(), id = undefined) {
        super(timestamp, id);
        this._event = event;
    }
    static EventName() {
        return 'domain-event-stored';
    }
    static EventClassification() {
        return EventClassifications.InternalEvent.toString();
    }
    static EventVersion() {
        return 1.0;
    }
    event() {
        return this._event;
    }
    serialize() {
        return JSON.stringify({
            event: this.event()
        });
    }
}
