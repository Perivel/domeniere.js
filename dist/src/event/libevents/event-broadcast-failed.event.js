import { DomainEvent } from "../domain-event/domain-event";
import { Timestamp } from "foundation";
import { EventClassifications } from "../domain-event/event-classification.enum";
export class EventBroadcastFailed extends DomainEvent {
    constructor(error, timestamp = Timestamp.Now(), id = undefined) {
        super(timestamp, id);
        this._error = error;
    }
    static EventName() {
        return 'event-broadcast-failed';
    }
    static EventClassification() {
        return EventClassifications.InternalError.toString();
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
