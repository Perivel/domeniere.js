import { DateTime } from "@perivel/foundation";
import { StoredEventInterface } from "./stored-event.interface";
/**
 * StoredEvent
 *
 * StoredEvent represents a stored event.
 */
export declare class StoredEvent implements StoredEventInterface {
    private _eventBody;
    private _eventClassification;
    private _eventId;
    private _eventName;
    private _eventVersion;
    private _occuredOn;
    private _isPublished;
    constructor(eventId: string, eventName: string, eventClassification: string, eventVersion: number, body: string, occuredOn: DateTime, isPublished?: boolean);
    /**
     * eventBody()
     *
     * eventBody() gets the event body.
     */
    eventBody(): string;
    /**
     * evnetClassification()
     *
     * eventClassification() gets the event classification.
     */
    eventClassification(): string;
    /**
     * eventId()
     *
     * eventId() gets the event id.
     */
    eventId(): string;
    /**
     * eventName()
     *
     * eventName() gets the event name.
     */
    eventName(): string;
    /**
     * eventVersion()
     *
     * eventVersion() gets the event version.
     */
    eventVersion(): number;
    /**
     * isPublished()
     *
     * isPublished() determines if an event has been published.
     */
    isPublished(): boolean;
    /**
     * markPublished()
     *
     * markPublished() marks a stored event as published.
     */
    markPublished(): void;
    /**
     * occuredOn()
     *
     * occuredOn()
     */
    occuredOn(): DateTime;
}
//# sourceMappingURL=stored-event.d.ts.map