"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransmittedEvent = void 0;
/**
 * TransmittedEvent
 *
 * A TransmittedEvent represents an event that was received from an external domain.
 */
class TransmittedEvent {
    constructor(id, name, classification, version, body, occuredOn) {
        this._body = body;
        this._classification = classification;
        this._id = id;
        this._name = name;
        this._version = version;
        this._occured_on = occuredOn;
    }
    /**
    * eventBody()
    *
    * eventBody() gets the event body.
    */
    eventBody() {
        return this._body;
    }
    /**
     * evnetClassification()
     *
     * eventClassification() gets the event classification.
     */
    eventClassification() {
        return this._classification;
    }
    /**
     * eventId()
     *
     * eventId() gets the event id.
     */
    eventId() {
        return this._id;
    }
    /**
     * eventName()
     *
     * eventName() gets the event name.
     */
    eventName() {
        return this._name;
    }
    /**
     * eventVersion()
     *
     * eventVersion() gets the event version.
     */
    eventVersion() {
        return this._version;
    }
    /**
     * occuredOn()
     *
     * occuredOn()
     */
    occuredOn() {
        return this._occured_on;
    }
}
exports.TransmittedEvent = TransmittedEvent;
