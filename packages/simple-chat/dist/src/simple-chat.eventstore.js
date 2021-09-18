"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleChatEventStore = void 0;
const event_1 = require("@domeniere/event");
/**
 * SimpleChatEventStore
 *
 * The EventStore manages the flow of events throughout your application.
 *
 * Learn more about EventStores at https://github.com/Perivel/domeniere/blob/master/src/event/README.md
 */
class SimpleChatEventStore extends event_1.EventStore {
    constructor() {
        super();
    }
}
exports.SimpleChatEventStore = SimpleChatEventStore;
