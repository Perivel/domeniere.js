import { DateTime } from "@swindle/core";
import { StoredEventInterface } from "./stored-event.interface";

/**
 * StoredEvent
 * 
 * StoredEvent represents a stored event.
 */

export class StoredEvent implements StoredEventInterface {

    private _eventBody: string;
    private _eventClassification: string;
    private _eventId: string;
    private _eventName: string;
    private _eventVersion: number;
    private _occuredOn: DateTime;
    private _isPublished: boolean;
    private _shouldBePublished: boolean;


    constructor(eventId: string, eventName: string, eventClassification: string, eventVersion: number, body: string, occuredOn: DateTime, shouldBePublishd: boolean, isPublished: boolean = false) {
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

    public eventBody(): string {
        return this._eventBody;
    }

    /**
     * evnetClassification()
     * 
     * eventClassification() gets the event classification.
     */

    public eventClassification(): string {
        return this._eventClassification;
    }

    /**
     * eventId()
     * 
     * eventId() gets the event id.
     */
    public eventId(): string {
        return this._eventId;
    }

    /**
     * eventName()
     * 
     * eventName() gets the event name.
     */

    public eventName(): string {
        return this._eventName;
    }

    /**
     * eventVersion()
     * 
     * eventVersion() gets the event version.
     */

    public eventVersion(): number {
        return this._eventVersion;
    }

    /**
     * isPublished()
     * 
     * isPublished() determines if an event has been published.
     */
    public isPublished(): boolean {
        return this._isPublished;
    }

    /**
     * markPublished()
     * 
     * markPublished() marks a stored event as published.
     */
    public markPublished(): void {
        this._isPublished = true;
    }

    /**
     * occuredOn()
     * 
     * occuredOn()
     */

    public occuredOn(): DateTime {
        return this._occuredOn;
    }

    /**
     * shouldBePublished()
     * 
     * indicates whether or not the event should be published.
     */
    
    public shouldBePublished(): boolean {
        return this._shouldBePublished;
    }
}