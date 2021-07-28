import { DomainEvent } from "../domain-event/domain-event"
import { DateTime, Queue } from "swindle";
import { EventClassifications } from "../domain-event/event-classification.enum";

/**
 * EventsPublished
 * 
 * An event indicating that domain events were published successfully.
 */

export class EventsPublished extends DomainEvent {

    private readonly _events: Queue<DomainEvent>

    constructor(events: Queue<DomainEvent>, timestamp: DateTime = DateTime.Now(), id: string | undefined = undefined) {
        super(timestamp, id);
        this._events = events;
    }

    /**
     * EventName()
     * 
     * EventName() gets the event name.
     */

    public static EventName(): string {
        return 'event-published';
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
     * EventVersion() gets the event version.
     */

    public static EventVersion(): number {
        return 1.0;
    }

    /**
     * events()
     * 
     * events() gets the events that were published.
     */

    public events(): Queue<DomainEvent> {
        return this._events;
    }

    /**
     * serializeData()
     * 
     * serializeData() serializes the event data.
     */

    public serializeData(): string {
        return JSON.stringify({
            events: this.events().toArray().map(event => {
                event.serialize();
            })
        });
    }
}