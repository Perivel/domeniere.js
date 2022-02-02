"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventStore = void 0;
const core_1 = require("@swindle/core");
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
        throw new core_1.MethodUndefinedException();
    }
    async getTransmittedEventsSince(date) {
        return [];
    }
    async getUnpublishedEvents() {
        return [];
    }
    mapStoredEventToDomainEvent(storedEvent) {
        throw new core_1.MethodUndefinedException();
    }
    mapTransmittedEventToDomainEvent(transmittedEvent) {
        throw new core_1.MethodUndefinedException();
    }
    async saveEvents(eventQueue) { }
}
exports.DefaultEventStore = DefaultEventStore;
//# sourceMappingURL=default-event-store.js.map