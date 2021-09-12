import { DateTime, MethodUndefinedException } from "@swindle/core";
import { Queue } from "@swindle/structs"
import { DomainEvent } from "../event.module";
import { EventStore } from "./event-store";
import { StoredEvent } from "./stored-event";
import { TransmittedEvent } from "./transmitted-event";

/**
 * DefaultEventStore
 * 
 * DefaultEventStore si the defualt event store.
 */


export class DefaultEventStore extends EventStore {

    constructor() {
        super();
    }

    protected async boradcastEvents(eventsToPublish: Queue<DomainEvent>, publishedEvents: Queue<DomainEvent>): Promise<void> {
        while (!eventsToPublish.isEmpty()) {
            publishedEvents.enqueue(eventsToPublish.dequeue()!);
        }
    }

    protected getLatestStoredEvent(): Promise<StoredEvent | null> {
        throw new MethodUndefinedException();
    }
    
    public async getTransmittedEventsSince(date: DateTime|null): Promise<TransmittedEvent[]> {
        return [];
    }

    public async getUnpublishedEvents(): Promise<Array<StoredEvent>> {
        return [];
    }

    protected mapStoredEventToDomainEvent(storedEvent: StoredEvent): DomainEvent {
        throw new MethodUndefinedException();
    }
    
    public mapTransmittedEventToDomainEvent(transmittedEvent: TransmittedEvent): DomainEvent {
        throw new MethodUndefinedException();
    }

    protected async saveEvents(eventQueue: Queue<StoredEvent>): Promise<void> {}
}