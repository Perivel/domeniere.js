import { DomainEventInterface } from "./domain-event.interface";
import { Serializable, DateTime } from "@perivel/foundation";
import { DomainEventId } from "./domain-event-id";
/**
 * DomainEvent
 *
 * DomainEvent represents something of interest that happened in the domain.
 *
 * When creating your own Domain Events, you must specifically specify the the
 * event name by redefining the EventName() static method.
 */
export declare abstract class DomainEvent implements DomainEventInterface, Serializable {
    private _timestamp;
    private _id;
    private _eventName;
    private _eventClassification;
    private _eventVersion;
    /**
     * Creates a DomainEvent instance.
     * @param timestamp The timestamp of the event. If omitted, it will be set to the current DateTime timestamp.
     * @param id The unique occurence id for this specific event instance. This field is optional. It is highly recommended you do not provide this value manually.
     * @throws InvalidArgumentException if the event name is empty.
     */
    constructor(timestamp?: DateTime, id?: string);
    /**
     * EventVersion()
     *
     * EventClassification() specifies the classification of the event.
     *
     */
    static EventClassification(): string;
    /**
     * EventName()
     *
     * EventName() specifies the name of the event. It is hightly recommended event names be unique and
     * descriptive.
     *
     * NOTE: This static method must be redefined for every subclass.
     */
    static EventName(): string;
    /**
     * EventVersion()
     *
     * EventVersion() specifies the version number of the event.
     */
    static EventVersion(): number;
    /**
     * eventClassification()
     *
     * eventClassification() gets the classification of the event.
     */
    eventClassification(): string;
    /**
     * eventId()
     *
     * eventId() gets the event id.
     */
    eventId(): DomainEventId;
    /**
     * eventName()
     *
     * eventName() gets the name of the event.
     */
    eventName(): string;
    /**
     * eventVersion()
     *
     * eventVersion() gets the version number of the event.
     */
    eventVersion(): number;
    /**
     * isError()
     *
     * isError() indicates if the event is an error event.
     */
    isError(): boolean;
    /**
     * isInternal()
     *
     * isInternal() determines if the event is an internal framework event.
     */
    isInternal(): boolean;
    /**
     * occuredOn()
     *
     * occuredOn() gets the timestamp when the event occured.
     */
    occuredOn(): DateTime;
    /**
     * serialize()
     *
     * serialize() serializes the event data.
     */
    serialize(): string;
    /**
     * serializeData()
     *
     * serializes the event data.
     */
    abstract serializeData(): string;
    /**
     * shouldBeBroadcasted()
     *
     * shouldBeBroadcasted() determines if the event should be broadcasted to the network.
     */
    shouldBeBroadcasted(): boolean;
    toString(): string;
}
//# sourceMappingURL=domain-event.d.ts.map