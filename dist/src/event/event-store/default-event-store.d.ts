import { DateTime, Queue } from "swindle";
import { DomainEvent } from "../event.module";
import { EventStore } from "./event-store";
import { StoredEvent } from "./stored-event";
import { TransmittedEvent } from "./transmitted-event";
/**
 * DefaultEventStore
 *
 * DefaultEventStore si the defualt event store.
 */
export declare class DefaultEventStore extends EventStore {
    constructor();
    protected boradcastEvents(eventsToPublish: Queue<DomainEvent>, publishedEvents: Queue<DomainEvent>): Promise<void>;
    protected getLatestStoredEvent(): Promise<StoredEvent | null>;
    getTransmittedEventsSince(date: DateTime | null): Promise<TransmittedEvent[]>;
    getUnpublishedEvents(): Promise<Array<StoredEvent>>;
    protected mapStoredEventToDomainEvent(storedEvent: StoredEvent): DomainEvent;
    mapTransmittedEventToDomainEvent(transmittedEvent: TransmittedEvent): DomainEvent;
    protected saveEvents(eventQueue: Queue<StoredEvent>): Promise<void>;
}
//# sourceMappingURL=default-event-store.d.ts.map