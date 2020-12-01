"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventStore = void 0;
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
    async boradcastEvents(eventQueue) { }
    async saveEvents(eventQueue) { }
}
exports.DefaultEventStore = DefaultEventStore;
