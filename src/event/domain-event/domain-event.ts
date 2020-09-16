import { DomainEventInterface } from "./domain-event.interface";
import { Serializable, Timestamp } from "foundation";
import { DomainEventId } from "./domain-event-id";
import { EventClassifications } from "./event-classification.enum";

/**
 * DomainEvent
 *
 * DomainEvent represents something of interest that happened in the domain.
 *
 * When creating your own Domain Events, you must specifically specify the the
 * event name by redefining the EventName() static method.
 */


export abstract class DomainEvent implements DomainEventInterface, Serializable {

    private _timestamp: Timestamp;
    private _id: DomainEventId;
    private _eventName: string;
    private _eventClassification: string;
    private _eventVersion: number;

    /**
     * Creates a DomainEvent instance.
     * @param timestamp The timestamp of the event. If omitted, it will be set to the current DateTime timestamp.
     * @param id The unique occurence id for this specific event instance. This field is optional. It is highly recommended you do not provide this value manually.
     * @throws InvalidArgumentException if the event name is empty.
     */

    constructor(timestamp: Timestamp = Timestamp.Now(), id: string = "") {
        this._timestamp = timestamp;
        this._id = (id) ? new DomainEventId(id) : DomainEventId.Generate();
        this._eventName = (this.constructor as any).EventName();
        this._eventClassification = (this.constructor as any).EventClassification();
        this._eventVersion = (this.constructor as any).EventVersion();
    }

    /**
     * EventVersion()
     * 
     * EventClassification() specifies the classification of the event.
     * 
     */

    public static EventClassification(): string {
        return EventClassifications.Domain.toString();
    }

    /**
     * EventName()
     * 
     * EventName() specifies the name of the event. It is hightly recommended event names be unique and 
     * descriptive.
     * 
     * NOTE: This static method must be redefined for every subclass.
     */

    public static EventName(): string {
        throw new Error('EventNotSpecifiedException.');
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
     * eventId()
     * 
     * eventId() gets the event id.
     */

    public eventId(): DomainEventId {
        return new DomainEventId(this._id.id());
    }

    /**
     * eventName()
     * 
     * eventName() gets the name of the event.
     */

    public eventName(): string {
        return this._eventName;
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
     * occuredOn()
     * 
     * occuredOn() gets the timestamp when the event occured.
     */

    public occuredOn(): Timestamp {
        return this._timestamp;
    }

    /**
     * serialize()
     * 
     * serialize() serializes the event data.
     */

    public serialize(): string {
        return "";
    }

    /**
     * shouldBeBroadcasted()
     * 
     * shouldBeBroadcasted() determines if the event should be broadcasted to the network.
     */
    
    public shouldBeBroadcasted(): boolean {
        return true;
    }
}