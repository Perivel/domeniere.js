"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventStore = void 0;
const foundation_1 = require("@perivel/foundation");
const event_store_1 = require("./event-store");
/**
 * DefaultEventStore
 *
 * DefaultEventStore si the defualt event store.
 */
class DefaultEventStore extends event_store_1.EventStore {
    constructor() {
        super();
    }
    async boradcastEvents(eventsToPublish, publishedEvents) {
        while (!eventsToPublish.isEmpty()) {
            publishedEvents.enqueue(eventsToPublish.dequeue());
        }
    }
    getLatestStoredEvent() {
        throw new foundation_1.MethodUndefinedException();
    }
    async getTransmittedEventsSince(date) {
        return [];
    }
    mapStoredEventToDomainEvent(storedEvent) {
        throw new foundation_1.MethodUndefinedException();
    }
    mapTransmittedEventToDomainEvent(transmittedEvent) {
        throw new foundation_1.MethodUndefinedException();
    }
    async saveEvents(eventQueue) { }
}
exports.DefaultEventStore = DefaultEventStore;
