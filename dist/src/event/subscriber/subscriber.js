"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
/**
 * EventSubscription
 *
 * EventSubscription represents an Event Subscription.
 */
class Subscriber {
    /**
     * Creates an EventSubscription instance.
     * @param id The id of the subscription.
     * @param eventName the name of the event to subscribe to.
     * @param handler the event handler.
     */
    constructor(id, eventName, priority, label, handler, stopPropogationOnError = false) {
        this._id = id;
        this._eventName = eventName;
        this._handler = handler;
        this._label = label;
        this._priority = priority;
        this._handleAttempts = 0;
        this._stopPropogationOnError = stopPropogationOnError;
    }
    /**
     * equals()
     *
     * equals() compares the instance to the suspect, to determine if they are equal.
     * @param suspect The suspect to be compared
     */
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof Subscriber) {
            const other = suspect;
            isEqual = this.id().equals(other.id()) && this.eventName() === other.eventName();
        }
        return isEqual;
    }
    /**
     * eventName()
     *
     * eventName() gets the name of the event being subscribed to.
     */
    eventName() {
        return this._eventName;
    }
    /**
     * handleAttempts()
     *
     * gets the number of times the subscriber's handleEvent() function was called and failed.
     */
    handleAttempts() {
        return this._handleAttempts;
    }
    /**
     * id()
     *
     * id() gets the subscription id.
     */
    id() {
        return this._id;
    }
    /**
     * incrementFailedHandleAttempts()
     *
     * increments the number of times the handler has failed.
     */
    incrementFailedHandleAttempts() {
        this._handleAttempts++;
    }
    /**
     * label()
     *
     * label() gets the subscription label.
     */
    label() {
        return this._label;
    }
    /**
     * Executes the subscriber's designated event action.
     * @param event The event object
     */
    async handleEvent(event) {
        await this._handler(event);
    }
    /**
     * priority()
     *
     * priority() gets the priority of the event.
     */
    priority() {
        return this._priority;
    }
    /**
     * resetHandleAttempts()
     *
     * resets the number of handle attempts.
     */
    resetHandleAttempts() {
        this._handleAttempts = 0;
    }
    /**
     * shouldStopPropogationOnError()
     *
     * shouldStopPropogationOnError() determines if the event propogation
     * should stop if the handler encounters an error.
     */
    shouldStopPropogationOnError() {
        return this._stopPropogationOnError;
    }
    serialize() {
        return JSON.stringify({
            id: this.id().serialize(),
            event: this.eventName(),
            label: this.label(),
            priority: this.priority(),
            attempts: this.handleAttempts(),
            stop_propogation_on_error: this.shouldStopPropogationOnError(),
        });
    }
}
exports.Subscriber = Subscriber;
