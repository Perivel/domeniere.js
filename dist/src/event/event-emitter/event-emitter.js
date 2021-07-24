"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const foundation_1 = require("@perivel/foundation");
const event_aggregate__type_1 = require("./event-aggregate..type");
const event_handler_failed_event_1 = require("../libevents/event-handler-failed.event");
const domain_module_1 = require("../../domain/domain.module");
/**
 * EventEmitter
 */
class EventEmitter {
    constructor(maxRetries = 3) {
        this.subscribers = new Array();
        this.maxRetries = maxRetries;
    }
    /**
     * add()
     *
     * add() attempts to add a subscription to the publisher list.
     *
     * NOTE: Duplicate subscriptions will not be added.
     * @param subscriber The subscription to be added.
     */
    addSubscriber(subscriber) {
        if (subscriber && (!this.subscriberExists(subscriber))) {
            this.subscribers.push(subscriber);
        }
    }
    /**
     * emit()
     *
     * emit() emits an event.
     * @param event The event to emit.
     * @emits EventHandlerFailed When an event handler fails.
     */
    async emit(event) {
        const queue = new foundation_1.PriorityQueue();
        // get the relevant subscribers.
        const eventName = event.eventName();
        this.subscribers.forEach(sub => {
            if (
            // The subscriber is registered to the specific event.
            (sub.eventName() === eventName) ||
                // The subscriber is listening to all events.
                (sub.eventName() === event_aggregate__type_1.EventAggregate.Any.toString()) ||
                // The subscriber is listening to framework events.
                ((event.isInternal()) && (sub.eventName() === event_aggregate__type_1.EventAggregate.Internal.toString())) ||
                // The subscriber is listening to an error event.
                ((event.isError()) && (sub.eventName() === event_aggregate__type_1.EventAggregate.Error.toString()))) {
                // add the subscriber to the queue.
                queue.enqueue(sub, sub.priority());
            }
        });
        // handle the events.
        await this.executeEventHandlers(queue.toArray(), event);
    }
    /**
     * removeSubscriber()
     *
     * remove() removes a subscription.
     * @param suspect The subscription to be removed.
     */
    removeSubscriber(suspect) {
        this.subscribers = this.subscribers.filter(subscriber => !subscriber.equals(suspect));
    }
    // HELPERS
    /**
     * subscriberExists()
     *
     * subscriberExists() determines whether or not a subscription exists already.
     * @param suspect The suscpect to be found.
     */
    subscriberExists(suspect) {
        const foundSubscribers = this.subscribers.filter(subscription => suspect.equals(subscription));
        return foundSubscribers.length !== 0;
    }
    // HELPERS
    /**
     * executeEventHandlers()
     *
     * executeEventHandlers() executes the event handlers for the event.
     * @param subscribersArray the list of subscribers to call.
     * @param event the event to execute upon.
     * @emits EventHandlerFailed when a subscriber fails.
     */
    async executeEventHandlers(subscribersArray, event) {
        for (let sub of subscribersArray) {
            try {
                // execute the operation.
                await sub.handleEvent(event);
                sub.resetHandleAttempts();
            }
            catch (error) {
                // The handler failed.
                sub.incrementFailedHandleAttempts();
                // emit the event handler failed event.
                await domain_module_1.Domain.EventStream().emit(new event_handler_failed_event_1.EventHandlerFailed(sub, event, error));
                if (sub.shouldStopPropogationOnError()) {
                    return false;
                }
            }
        }
        return true;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event-emitter.js.map