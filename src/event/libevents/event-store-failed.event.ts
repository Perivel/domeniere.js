import { DomainEvent } from "../domain-event/domain-event"
import { Timestamp } from "foundation";
import { EventClassifications } from "../domain-event/event-classification.enum";

/**
 * EventStoreFailed
 * 
 * The EventStoreFailed event indicates that the event store failed to store and event.
 */

export class EventStoreFailed extends DomainEvent {

    private readonly _event: DomainEvent;
    private readonly _error: Error;

    constructor(event: DomainEvent, error: Error, timestamp: Timestamp = Timestamp.Now(), id: string|undefined = undefined) {
        super(timestamp, id);
        this._event = event;
        this._error = error;
    }

    /**
     * EventName()
     * 
     * EventName() gets the event name.
     */

    public static EventName(): string {
        return 'event-store-failed';
    }

    /**
     * EventClassification()
     * 
     * EventClassification() gets the event classification.
     */

    public static EventClassification(): string {
        return EventClassifications.InternalError.toString();
    }

    /**
     * EventName()
     * 
     * EventName() gets the event name.
     */

    public static EventVersion(): number {
        return 1.0;
    }

    /**
     * error()
     * 
     * error() gets the error that occcured.
     */

    public error(): Error {
        return this._error;
    }

    /**
     * event()
     * 
     * event() gets the event that could not be saved.
     */

    public event(): DomainEvent {
        return this._event;
    }

    /**
     * serialize()
     * 
     * serialize() serializes the event data.
     */

    public serialize(): string {
        return JSON.stringify({
            event: this.event(),
            error: this.error()
        });
    }
}