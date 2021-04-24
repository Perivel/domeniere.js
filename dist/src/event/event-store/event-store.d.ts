import { DateTime, Queue } from "@perivel/foundation";
import { DomainEvent } from "../domain-event/domain-event";
import { StoredEvent } from "./stored-event";
/**
 * EventStore
 *
 * EventStore defines the event store.
 */
export declare abstract class EventStore {
    private _storageQueue;
    private _publishQueue;
    constructor();
    /**
     * broadcastEvents()
     *
     * broadcastEvents() braodcasts the domain events.
     * @param eventQueue The queue of events to broadcast.
     */
    protected abstract boradcastEvents(eventQueue: Queue<DomainEvent>): Promise<void>;
    /**
     * getEventsWithinInterval()
     *
     * gets the domain events within the interval.
     * @param from the start date of events to look for.
     * @param to the end date of events to look for.
     * @throws any exceptin when there is a problem obtainting the events.
     */
    abstract getEventsWithinInterval(from: DateTime, to: DateTime): Promise<Array<StoredEvent>>;
    /**
     * publishEvents()
     *
     * publishEvents() publishes the domain events.
     * @emits EventBraodcastFailed event when there is an error broadcasting the events.
     */
    publishEvents(): Promise<void>;
    /**
     * persistEvents()
     *
     * persistEvents() perisists the events to storage.
     *
     */
    persistEvents(): Promise<void>;
    /**
     * saveEvents()
     *
     * saveEvents() persists the events to storage..
     * @param event the queue of events to persist in storage.
     * @throws Any kind of exception when an error occurs.
     */
    protected abstract saveEvents(eventQueue: Queue<StoredEvent>): Promise<void>;
    /**
     * shouldBroadcastInternalEvents()
     *
     * shouldBroadcastInternalEvents() detemrines if internal events should be broadcasted.
     */
    protected shouldBroadcastInternalEvents(): boolean;
    /**
     * shouldSaveInternalEvents()
     *
     * shouldSaveInternalEvents() determines if internal events should be saved.
     */
    protected shouldSaveInternalEvents(): boolean;
    /**
     * store()
     *
     * store() stores the event.
     * @param event The event to store.
     */
    store(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=event-store.d.ts.map