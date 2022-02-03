"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomeniereEventEmitter = void 0;
const event_emitter_1 = require("@swindle/event-emitter");
const structs_1 = require("@swindle/structs");
const event_aggregate__type_1 = require("../event-stream/event-aggregate..type");
/**
 * DomeniereEventEmitter
 *
 * A custom event emitter with the additional capability of recognizing aggregate events.
 */
class DomeniereEventEmitter extends event_emitter_1.EventEmitter {
    constructor(subscribers = [], onBeforeHandlersExecute = undefined, onAfterHandlersExecute = undefined, onHandlerError = undefined) {
        super(subscribers, onBeforeHandlersExecute, onAfterHandlersExecute, onHandlerError);
    }
    /**
     * getSubscribersForEvent()
     *
     * gets the relevant subscribers for the given event. We extend the Swindle EventEmitter so it can recognize aggregate
     * event subscribers.
     *
     * this method is called internally by the EventEmitter to get the relevant subscribers.
     *
     * @param event the event
     * @param subscribers the list of all subscribers.
     * @returns A priority queue consisting of the relevant subscribers for the given event.
     */
    getSubscribersForEvent(event, subscribers) {
        const queue = new structs_1.PriorityQueue();
        const eventName = event.eventName();
        subscribers.forEach(sub => {
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
        return queue;
    }
    async emit(event) {
        await super.emit(event);
    }
}
exports.DomeniereEventEmitter = DomeniereEventEmitter;
//# sourceMappingURL=domeniere-event-emitter.js.map