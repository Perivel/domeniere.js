import { DomainEvent } from "../domain-event/domain-event";
import { StoredEvent } from "./stored-event";

/**
 * EventStore
 * 
 * EventStore defines the event store.
 */

export abstract class EventStore {

    constructor() {
        //
    }

    /**
     * getUnpublishedEvents()
     * 
     * getUnpublishedEvents() gets the unpublished events form the event store.
     */

    protected abstract getUnpublishedEvents(): Promise<StoredEvent[]>

    /**
     * save()
     * 
     * save() persists a stored event to the event store.
     * @param event the event to persist in storage.
     */

    public async abstract save(events: StoredEvent|StoredEvent[]): Promise<void>;

    /**
     * store()
     * 
     * store() stores the event.
     * @param event The event to store.
     */

    public async store(event: DomainEvent): Promise<void> {
        // create the SotoredEvent
        const storedEvent = new StoredEvent(
            event.eventId().id(),
            event.eventName(),
            event.eventClassification(),
            event.eventVersion(),
            event.serialize(),
            event.occuredOn()
        );

        // Save the stored event.
        try {
            // store the event.
            await this.save(storedEvent);
        }
        catch(error) {
            // failed to store the event.
            throw new Error("Failed to save the event");
        }
    }
}