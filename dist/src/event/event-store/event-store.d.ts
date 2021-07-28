import { DateTime, Queue } from "swindle";
import { DomainEvent } from "../domain-event/domain-event";
import { StoredEvent } from "./stored-event";
import { TransmittedEvent } from "./transmitted-event";
/**
 * EventStore
 *
 * EventStore defines the event store.
 */
export declare abstract class EventStore {
    private _storageQueue;
    private _publishQueue;
    private _broadcastedQueue;
    private _updateQueue;
    constructor();
    /**
     * broadcastEvents()
     *
     * broadcastEvents() braodcasts the domain events.
     * @param eventsToPublish The queue of events to broadcast.
     * @param publishedEvents The events that have been successfully broadcasted.
     */
    protected abstract boradcastEvents(eventsToPublish: Queue<DomainEvent>, publishedEvents: Queue<DomainEvent>): Promise<void>;
    /**
     * getDateOfLatestEvent()
     *
     * gets the date of the most recent event.
     * @returns the date of the most recent event.
     */
    getDateOfLastEvent(): Promise<DateTime | null>;
    /**
     * getLatestStoredEvent()
     *
     * gets the most reent stored event.
     * @throws any exception when there is an error.
     */
    protected abstract getLatestStoredEvent(): Promise<StoredEvent | null>;
    /**
     * getTransmittedEventSince()
     *
     * Gets a list of all the events since the specified time period.
     * @param date The date to start from. If null, get all events.
     */
    abstract getTransmittedEventsSince(date: DateTime | null): Promise<Array<TransmittedEvent>>;
    /**
     * getUnpublishedEvents()
     *
     * gets the unpublished events from storage.
     * @throws An exception if there is an error.
     */
    abstract getUnpublishedEvents(): Promise<Array<StoredEvent>>;
    /**
     * loadUnpublishedEvents()
     *
     * loads the unpublished events from storage.
     * @thorws EventStoreException when there is a problem processing the events.
     */
    loadUnpublishedEvents(): Promise<void>;
    /**
     * mapStoredEventToDomainEvent()
     *
     * converts a given stored event to a domain event.
     * @param storedEvent the event to convert.
     */
    protected abstract mapStoredEventToDomainEvent(storedEvent: StoredEvent): DomainEvent;
    /**
     * mapTransmittedEventToDomainEvent()
     *
     * converts a transmitted event into a domain event.
     * @param transmittedEvent the transmitted event to convert.
     * @throws any exception when it is unable to convert the transmitted event.
     */
    abstract mapTransmittedEventToDomainEvent(transmittedEvent: TransmittedEvent): DomainEvent;
    /**
     * markEventsAsPublished()
     *
     * Updates the events in storage that have been updated.
     */
    updatePublishedEvents(): Promise<void>;
    /**
     * processPublishedEvents()
     *
     * performs necessary processing to published events.
     */
    processPublishedEvents(): void;
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
    /**
     * convertEventToStoredEvent()
     *
     * converts an event to a strored event.
     * @param event The event to convert
     * @returns the created stored event.
     */
    private convertEventToStoredEvent;
}
//# sourceMappingURL=event-store.d.ts.map