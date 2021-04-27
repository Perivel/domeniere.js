"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredEvent = void 0;
/**
 * StoredEvent
 *
 * StoredEvent represents a stored event.
 */
class StoredEvent {
    constructor(eventId, eventName, eventClassification, eventVersion, body, occuredOn, shouldBePublishd, isPublished = false) {
        this._eventBody = body;
        this._eventClassification = eventClassification;
        this._eventId = eventId;
        this._eventName = eventName;
        this._eventVersion = eventVersion;
        this._occuredOn = occuredOn;
        this._isPublished = isPublished;
        this._shouldBePublished = shouldBePublishd;
    }
    /**
     * eventBody()
     *
     * eventBody() gets the event body.
     */
    eventBody() {
        return this._eventBody;
    }
    /**
     * evnetClassification()
     *
     * eventClassification() gets the event classification.
     */
    eventClassification() {
        return this._eventClassification;
    }
    /**
     * eventId()
     *
     * eventId() gets the event id.
     */
    eventId() {
        return this._eventId;
    }
    /**
     * eventName()
     *
     * eventName() gets the event name.
     */
    eventName() {
        return this._eventName;
    }
    /**
     * eventVersion()
     *
     * eventVersion() gets the event version.
     */
    eventVersion() {
        return this._eventVersion;
    }
    /**
     * isPublished()
     *
     * isPublished() determines if an event has been published.
     */
    isPublished() {
        return this._isPublished;
    }
    /**
     * markPublished()
     *
     * markPublished() marks a stored event as published.
     */
    markPublished() {
        this._isPublished = true;
    }
    /**
     * occuredOn()
     *
     * occuredOn()
     */
    occuredOn() {
        return this._occuredOn;
    }
    /**
     * shouldBePublished()
     *
     * indicates whether or not the event should be published.
     */
    shouldBePublished() {
        return this._shouldBePublished;
    }
}
exports.StoredEvent = StoredEvent;
