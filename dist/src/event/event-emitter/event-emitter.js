"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const foundation_1 = require("foundation");
const event_aggregate__type_1 = require("./event-aggregate..type");
const event_stream_1 = require("../event-stream/event-stream");
const event_handler_failed_event_1 = require("../libevents/event-handler-failed.event");
class EventEmitter {
    constructor(maxRetries = 3) {
        this.subscribers = new Array();
        this.maxRetries = maxRetries;
    }
    addSubscriber(subscriber) {
        if (subscriber && (!this.subscriberExists(subscriber))) {
            this.subscribers.push(subscriber);
        }
    }
    async emit(event) {
        const queue = new foundation_1.PriorityQueue();
        const eventName = event.eventName();
        this.subscribers.forEach(sub => {
            if ((sub.eventName() === eventName) ||
                (sub.eventName() === event_aggregate__type_1.EventAggregate.Any.toString()) ||
                ((event.isInternal()) && (sub.eventName() === event_aggregate__type_1.EventAggregate.Internal.toString())) ||
                ((event.isError()) && (sub.eventName() === event_aggregate__type_1.EventAggregate.Error.toString()))) {
                queue.enqueue(sub, sub.priority());
            }
        });
        await this.executeEventHandlers(queue.toArray(), event);
    }
    removeSubscriber(suspect) {
        this.subscribers = this.subscribers.filter(subscriber => !subscriber.equals(suspect));
    }
    subscriberExists(suspect) {
        const foundSubscribers = this.subscribers.filter(subscription => suspect.equals(subscription));
        return foundSubscribers.length !== 0;
    }
    async executeEventHandlers(subscribersArray, event) {
        for (let sub of subscribersArray) {
            try {
                await sub.handleEvent(event);
                sub.resetHandleAttempts();
            }
            catch (error) {
                sub.incrementFailedHandleAttempts();
                await event_stream_1.EventStream.instance().emit(new event_handler_failed_event_1.EventHandlerFailed(sub, event));
                if (sub.shouldStopPropogationOnError()) {
                    return false;
                }
            }
        }
        return true;
    }
}
exports.EventEmitter = EventEmitter;
