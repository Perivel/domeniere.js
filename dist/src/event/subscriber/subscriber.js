"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
class Subscriber {
    constructor(id, eventName, priority, label, handler, stopPropogationOnError = false) {
        this._id = id;
        this._eventName = eventName;
        this._handler = handler;
        this._label = label;
        this._priority = priority;
        this._handleAttempts = 0;
        this._stopPropogationOnError = stopPropogationOnError;
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof Subscriber) {
            const other = suspect;
            isEqual = this.id().equals(other.id()) && this.eventName() === other.eventName();
        }
        return isEqual;
    }
    eventName() {
        return this._eventName;
    }
    handleAttempts() {
        return this._handleAttempts;
    }
    id() {
        return this._id;
    }
    incrementFailedHandleAttempts() {
        this._handleAttempts++;
    }
    label() {
        return this._label;
    }
    async handleEvent(event) {
        await this._handler(event);
    }
    priority() {
        return this._priority;
    }
    resetHandleAttempts() {
        this._handleAttempts = 0;
    }
    shouldStopPropogationOnError() {
        return this._stopPropogationOnError;
    }
}
exports.Subscriber = Subscriber;
