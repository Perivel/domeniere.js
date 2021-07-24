"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
const foundation_1 = require("@perivel/foundation");
const domain_module_1 = require("../../domain/domain.module");
const events_published_event_1 = require("../libevents/events-published.event");
const event_store_exception_1 = require("./event-store.exception");
const stored_event_1 = require("./stored-event");
/**
 * EventStore
 *
 * EventStore defines the event store.
 */
class EventStore {
    constructor() {
        this._storageQueue = new foundation_1.Queue();
        this._publishQueue = new foundation_1.Queue();
        this._broadcastedQueue = new foundation_1.Queue();
        this._updateQueue = new foundation_1.Queue();
    }
    /**
     * getDateOfLatestEvent()
     *
     * gets the date of the most recent event.
     * @returns the date of the most recent event.
     */
    async getDateOfLastEvent() {
        const latestEvent = await this.getLatestStoredEvent();
        return latestEvent ? latestEvent.occuredOn() : null;
    }
    /**
     * loadUnpublishedEvents()
     *
     * loads the unpublished events from storage.
     * @thorws EventStoreException when there is a problem processing the events.
     */
    async loadUnpublishedEvents() {
        try {
            // load unpublished events.
            const unpublishedStoredEvents = await this.getUnpublishedEvents();
            const sortedEvents = unpublishedStoredEvents.sort((a, b) => {
                if (a.occuredOn().isBefore(b.occuredOn())) {
                    return -1;
                }
                else if (b.occuredOn().isBefore(a.occuredOn())) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            // map the stored events to domain events
            sortedEvents.forEach(event => {
                // convert to domain event.
                const domainEvent = this.mapStoredEventToDomainEvent(event);
                // add unpublished events to publish queue.
                this._publishQueue.enqueue(domainEvent);
            });
        }
        catch (e) {
            throw new event_store_exception_1.EventStoreException(e.message);
        }
    }
    /**
     * markEventsAsPublished()
     *
     * Updates the events in storage that have been updated.
     */
    async updatePublishedEvents() {
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
    processPublishedEvents() {
        // convert to stored events.
        while (!this._broadcastedQueue.isEmpty()) {
            this._updateQueue.enqueue(this.convertEventToStoredEvent(this._broadcastedQueue.peek(), true));
            this._broadcastedQueue.dequeue();
        }
    }
    /**
     * publishEvents()
     *
     * publishEvents() publishes the domain events.
     * @emits EventBraodcastFailed event when there is an error broadcasting the events.
     */
    async publishEvents() {
        if (!this._publishQueue.isEmpty()) {
            try {
                await this.boradcastEvents(this._publishQueue, this._broadcastedQueue);
            }
            catch (error) {
                // something went wrong broadcasting the events.
                throw error;
                ;
            }
            finally {
                if (!this._broadcastedQueue.isEmpty()) {
                    // if there were some events that were broadcasted, we emit the EventsPublished event with these events.
                    await domain_module_1.Domain.EventStream().emit(new events_published_event_1.EventsPublished(this._broadcastedQueue));
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
    async persistEvents() {
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
     * shouldBroadcastInternalEvents()
     *
     * shouldBroadcastInternalEvents() detemrines if internal events should be broadcasted.
     */
    shouldBroadcastInternalEvents() {
        return false;
    }
    /**
     * shouldSaveInternalEvents()
     *
     * shouldSaveInternalEvents() determines if internal events should be saved.
     */
    shouldSaveInternalEvents() {
        return false;
    }
    /**
     * store()
     *
     * store() stores the event.
     * @param event The event to store.
     */
    async store(event) {
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
    convertEventToStoredEvent(event, markPublished = false) {
        return new stored_event_1.StoredEvent(event.eventId().id(), event.eventName(), event.eventClassification(), event.eventVersion(), event.serializeData(), event.occuredOn(), event.shouldBeBroadcasted(), markPublished);
    }
}
exports.EventStore = EventStore;
//# sourceMappingURL=event-store.js.map