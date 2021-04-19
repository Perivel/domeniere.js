"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
const foundation_1 = require("@perivel/foundation");
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
                await this.boradcastEvents(this._publishQueue);
            }
            catch (error) {
                // something went wrong broadcasting the events.
                throw error;
                ;
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
            // create the SotoredEvent
            const storedEvent = new stored_event_1.StoredEvent(event.eventId().id(), event.eventName(), event.eventClassification(), event.eventVersion(), event.serialize(), event.occuredOn());
            // add the event to the storage queue.
            this._storageQueue.enqueue(storedEvent);
            // determine if the event should be published.
            if ((event.shouldBeBroadcasted() && !event.isInternal()) || this.shouldBroadcastInternalEvents()) {
                // add event to publish queue
                this._publishQueue.enqueue(event);
            }
        }
    }
}
exports.EventStore = EventStore;
