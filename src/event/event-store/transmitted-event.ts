import { DateTime } from '@perivel/foundation';
import { TransmittedEventInterface } from './transmitted-event.interface';

/**
 * TransmittedEvent
 * 
 * A TransmittedEvent represents an event that was received from an external domain.
 */

export class TransmittedEvent implements TransmittedEventInterface {

    private readonly _body: string;
    private readonly _classification: string;
    private readonly _id: string;
    private readonly _name: string;
    private readonly _version: number;
    private readonly _occured_on: DateTime;

    constructor(id: string, name: string, classification: string, version: number, body: string, occuredOn: DateTime) {
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

    public eventBody(): string {
        return this._body;
    }

    /**
     * evnetClassification()
     * 
     * eventClassification() gets the event classification.
     */

    public eventClassification(): string {
        return this._classification;
    }

    /**
     * eventId()
     * 
     * eventId() gets the event id.
     */

    public eventId(): string {
        return this._id;
    }

    /**
     * eventName()
     * 
     * eventName() gets the event name.
     */

    public eventName(): string {
        return this._name;
    }

    /**
     * eventVersion()
     * 
     * eventVersion() gets the event version.
     */

    public eventVersion(): number {
        return this._version;
    }

    /**
     * occuredOn()
     * 
     * occuredOn()
     */

    public occuredOn(): DateTime {
        return this._occured_on;
    }
}