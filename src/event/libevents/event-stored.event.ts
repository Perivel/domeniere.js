import { DomainEvent } from "../domain-event/domain-event";
import { Timestamp } from "foundation";
import { EventClassifications } from "../domain-event/event-classification.enum";

/**
 * EventStored
 * 
 * EventStored indicates that an event has been successfully stored.
 */

export class EventStored extends DomainEvent {

    private readonly _event: DomainEvent;

    constructor(event: DomainEvent, timestamp: Timestamp = Timestamp.Now(), id: string|undefined = undefined) {
        super(timestamp, id);
        this._event = event;
    }

    /**
     * EventName()
     * 
     * EventName() gets the event name.
     */

    public static EventName(): string {
        return 'domain-event-stored';
    }

    /**
     * EventClassification()
     * 
     * EventClassification() gets the event classification.
     */

    public static EventClassification(): string {
        return EventClassifications.InternalEvent.toString();
    }

    /**
     * EventVersion()
     * 
     * EventVersion() gets the version of the event.
     */

    public static EventVersion(): number {
        return 1.0;
    }

    /**
     * event()
     * 
     * event() gets the event that has been successfully saved.
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
            event: this.event()
        });
    }
}