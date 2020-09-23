"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredEvent = void 0;
class StoredEvent {
    constructor(eventId, eventName, eventClassification, eventVersion, body, occuredOn, isPublished = false) {
        this._eventBody = body;
        this._eventClassification = eventClassification;
        this._eventId = eventId;
        this._eventName = eventName;
        this._eventVersion = eventVersion;
        this._occuredOn = occuredOn;
        this._isPublished = isPublished;
    }
    eventBody() {
        return this._eventBody;
    }
    eventClassification() {
        return this._eventClassification;
    }
    eventId() {
        return this._eventId;
    }
    eventName() {
        return this._eventName;
    }
    eventVersion() {
        return this._eventVersion;
    }
    isPublished() {
        return this._isPublished;
    }
    markPublished() {
        this._isPublished = true;
    }
    occuredOn() {
        return this._occuredOn;
    }
}
exports.StoredEvent = StoredEvent;
