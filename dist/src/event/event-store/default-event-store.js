"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventStore = void 0;
const swindle_1 = require("swindle");
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
        throw new swindle_1.MethodUndefinedException();
    }
    async getTransmittedEventsSince(date) {
        return [];
    }
    async getUnpublishedEvents() {
        return [];
    }
    mapStoredEventToDomainEvent(storedEvent) {
        throw new swindle_1.MethodUndefinedException();
    }
    mapTransmittedEventToDomainEvent(transmittedEvent) {
        throw new swindle_1.MethodUndefinedException();
    }
    async saveEvents(eventQueue) { }
}
exports.DefaultEventStore = DefaultEventStore;
//# sourceMappingURL=default-event-store.js.map