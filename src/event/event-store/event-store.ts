import { DateTime, Queue } from "swindle";
import { Domain } from "../../domain/domain.module";
import { DomainEvent } from "../domain-event/domain-event";
import { EventsPublished } from "../libevents/events-published.event";
import { EventStoreException } from "./event-store.exception";
import { StoredEvent } from "./stored-event";
import { TransmittedEvent } from "./transmitted-event";
import { TransmittedEventInterface } from "./transmitted-event.interface";

/**
 * EventStore
 * 
 * EventStore defines the event store.
 */

export abstract class EventStore {

    // queue of events to be persisted in storage.
    private _storageQueue: Queue<StoredEvent>;

    // queue of events to be published
    private _publishQueue: Queue<DomainEvent>;

    // queue of events that have been published.
    private _broadcastedQueue: Queue<DomainEvent>;

    private _updateQueue: Queue<StoredEvent>;

    constructor() {
        this._storageQueue = new Queue<StoredEvent>();
        this._publishQueue = new Queue<DomainEvent>();
        this._broadcastedQueue = new Queue<DomainEvent>();
        this._updateQueue = new Queue<StoredEvent>();
    }

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
    public async getDateOfLastEvent(): Promise<DateTime | null> {
        const latestEvent = await this.getLatestStoredEvent();
        return latestEvent ? latestEvent.occuredOn() : null;
    }

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

    public abstract getTransmittedEventsSince(date: DateTime | null): Promise<Array<TransmittedEvent>>;

    /**
     * getUnpublishedEvents()
     * 
     * gets the unpublished events from storage.
     * @throws An exception if there is an error.
     */

    public abstract getUnpublishedEvents(): Promise<Array<StoredEvent>>;

    /**
     * loadUnpublishedEvents()
     * 
     * loads the unpublished events from storage.
     * @thorws EventStoreException when there is a problem processing the events.
     */

    public async loadUnpublishedEvents(): Promise<void> {
        try {
            // load unpublished events.
            const unpublishedStoredEvents = await this.getUnpublishedEvents();
            const sortedEvents = unpublishedStoredEvents.sort((a: StoredEvent, b: StoredEvent) => {
                if (a.occuredOn().isBefore(b.occuredOn())) {
                    return -1;
                }
                else if (b.occuredOn().isBefore(a.occuredOn())) {
                    return 1;
                }
                else {
                    return 0;
                }
            })

            // map the stored events to domain events
            sortedEvents.forEach(event => {
                // convert to domain event.
                const domainEvent = this.mapStoredEventToDomainEvent(event);

                // add unpublished events to publish queue.
                this._publishQueue.enqueue(domainEvent);
            });
        }
        catch (e) {
            throw new EventStoreException((e as Error).message);
        }
    }

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

    public abstract mapTransmittedEventToDomainEvent(transmittedEvent: TransmittedEvent): DomainEvent;

    /**
     * markEventsAsPublished()
     * 
     * Updates the events in storage that have been updated.
     */

    public async updatePublishedEvents(): Promise<void> {
        // save the updated events.
        if (!this._updateQueue.isEmpty()) {
            await this.saveEvents(this._updateQueue);
        }
    }

    /**
     * processPublishedEvents()
     * 
     * performs necessary processing to published events.
     */

    public processPublishedEvents(): void {
        // convert to stored events.
        while (!this._broadcastedQueue.isEmpty()) {
            this._updateQueue.enqueue(this.convertEventToStoredEvent(this._broadcastedQueue.peek()!, true));
            this._broadcastedQueue.dequeue();
        }
    }

    /**
     * publishEvents()
     * 
     * publishEvents() publishes the domain events.
     * @emits EventBraodcastFailed event when there is an error broadcasting the events.
     */

    public async publishEvents(): Promise<void> {

        if (!this._publishQueue.isEmpty()) {
            try {
                await this.boradcastEvents(this._publishQueue, this._broadcastedQueue);
            }
            catch (error) {
                // something went wrong broadcasting the events.
                throw error;;
            }
            finally {
                if (!this._broadcastedQueue.isEmpty()) {
                    // if there were some events that were broadcasted, we emit the EventsPublished event with these events.
                    await Domain.EventStream().emit(new EventsPublished(this._broadcastedQueue));
                }
            }
        }
    }

    /**
     * persistEvents()
     * 
     * persistEvents() perisists the events to storage.
     * 
     */

    public async persistEvents(): Promise<void> {

        if (!this._storageQueue.isEmpty()) {

            try {
                await this.saveEvents(this._storageQueue);
            }
            catch (err) {
                // something went wrong saving the event.
                throw err;
            }
        }
    }


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

    protected shouldBroadcastInternalEvents(): boolean {
        return false;
    }

    /**
     * shouldSaveInternalEvents()
     * 
     * shouldSaveInternalEvents() determines if internal events should be saved.
     */
    protected shouldSaveInternalEvents(): boolean {
        return false;
    }

    /**
     * store()
     * 
     * store() stores the event.
     * @param event The event to store.
     */

    public async store(event: DomainEvent): Promise<void> {

        // determine if the event should be stored.
        if (!event.isInternal() || this.shouldSaveInternalEvents()) {
            const storedEvent = this.convertEventToStoredEvent(event);

            // add the event to the storage queue.
            this._storageQueue.enqueue(storedEvent);

            // determine if the event should be published.

            if ((event.shouldBeBroadcasted() && !event.isInternal()) || this.shouldBroadcastInternalEvents()) {
                // add event to publish queue
                this._publishQueue.enqueue(event);
            }
        }
    }

    // ==================================
    // Helpers
    // ==================================

    /**
     * convertEventToStoredEvent()
     * 
     * converts an event to a strored event.
     * @param event The event to convert
     * @returns the created stored event.
     */

    private convertEventToStoredEvent(event: DomainEvent, markPublished: boolean = false): StoredEvent {
        return new StoredEvent(
            event.eventId().id(),
            event.eventName(),
            event.eventClassification(),
            event.eventVersion(),
            event.serializeData(),
            event.occuredOn(),
            event.shouldBeBroadcasted(),
            markPublished
        );
    }
}