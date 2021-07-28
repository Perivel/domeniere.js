"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultNetworkEventQueue = void 0;
const network_event_queue_1 = require("./network-event-queue");
const swindle_1 = require("swindle");
/**
 * The Default Network Event Queue
 */
class DefaultNetworkEventQueue extends network_event_queue_1.NetworkEventQueue {
    constructor() {
        super();
        this.queue = new swindle_1.Queue();
    }
    async dequeue() {
        return this.queue.dequeue();
    }
    async enqueue(event) {
        this.queue.enqueue(event);
    }
}
exports.DefaultNetworkEventQueue = DefaultNetworkEventQueue;
//# sourceMappingURL=default-network-event-queue.js.map