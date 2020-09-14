import { DomainEvent } from "../domain-event/domain-event";
import { Timestamp } from "foundation";
import { EventClassifications } from "../domain-event/event-classification.enum";
export class EventHandlerFailed extends DomainEvent {
    constructor(handler, event, timestamp = Timestamp.Now(), id = undefined) {
        super(timestamp, id);
        this._handler = handler;
        this._event = event;
    }
    static EventName() {
        return 'event-handler-failed';
    }
    static EventClassification() {
        return EventClassifications.InternalError.toString();
    }
    static EventVersion() {
        return 1.0;
    }
    event() {
        return this._event;
    }
    handler() {
        return this._handler;
    }
    attempts() {
        return this.handler().handleAttempts();
    }
    serialize() {
        const obj = {
            event: this.event(),
            handler: this.handler()
        };
        return JSON.stringify(obj);
    }
}
