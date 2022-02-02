import { CompositeEvent } from "@swindle/event-emitter";
import { DomainEventInterface } from "./domain-event.interface";
import { Serializable, DateTime } from "@swindle/core";
import { EventClassifications } from "./event-classification.enum";

/**
 * DomainEvent
 *
 * DomainEvent represents something of interest that happened in the domain.
 *
 * When creating your own Domain Events, you must specifically specify the the
 * event name by redefining the EventName() static method.
 */


export abstract class DomainEvent extends CompositeEvent implements DomainEventInterface, Serializable {

    private _eventClassification: string;
    private _eventVersion: number;

    /**
     * Creates a DomainEvent instance.
     * @param timestamp The timestamp of the event. If omitted, it will be set to the current DateTime timestamp.
     * @param id The unique occurence id for this specific event instance. This field is optional. It is highly recommended you do not provide this value manually.
     * @throws InvalidArgumentException if the event name is empty.
     */

    constructor(timestamp: DateTime = DateTime.Now(), id: string = "") {
        super(timestamp, id);
        this._eventClassification = (this.constructor as any).EventClassification();
        this._eventVersion = (this.constructor as any).EventVersion();
    }

    /**
     * EventVersion()
     * 
     * EventClassification() specifies the classification of the event.
     */

    public static EventClassification(): string {
        return EventClassifications.Domain.toString();
    }

    /**
     * EventVersion()
     * 
     * EventVersion() specifies the version number of the event.
     */

    public static EventVersion(): number {
        return 1.0;
    }

    /**
     * eventClassification()
     * 
     * eventClassification() gets the classification of the event.
     */

    public eventClassification(): string {
        return this._eventClassification;
    }

    /**
     * eventVersion()
     * 
     * eventVersion() gets the version number of the event.
     */

    public eventVersion(): number {
        return this._eventVersion;
    }

    /**
     * isError()
     * 
     * isError() indicates if the event is an error event.
     */

    public isError(): boolean {
        return this.eventClassification() === EventClassifications.InternalError.toString();
    }

    /**
     * isInternal()
     * 
     * isInternal() determines if the event is an internal framework event.
     */

    public isInternal(): boolean {
        return (this.eventClassification() === EventClassifications.InternalEvent.toString()) || (this.eventClassification() === EventClassifications.InternalError.toString());
    }

    /**
     * serialize()
     * 
     * serialize() serializes the event data.
     */

    public serialize(): string {
        return JSON.stringify({
            id: this.eventId().serialize(),
            name: this.eventName(),
            classification: this.eventClassification(),
            version: this.eventVersion(),
            data: this.serializeData()
        });
    }

    /**
     * shouldBeBroadcasted()
     * 
     * shouldBeBroadcasted() determines if the event should be broadcasted to the network.
     */
    
    public shouldBeBroadcasted(): boolean {
        return true;
    }

    public toString(): string {
        return this.serialize();
    }
}