import { CompositeEvent } from "@swindle/event-emitter";
import { DomainEventInterface } from "./domain-event.interface";
import { Serializable, DateTime } from "@swindle/core";
/**
 * DomainEvent
 *
 * DomainEvent represents something of interest that happened in the domain.
 *
 * When creating your own Domain Events, you must specifically specify the the
 * event name by redefining the EventName() static method.
 */
export declare abstract class DomainEvent extends CompositeEvent implements DomainEventInterface, Serializable {
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
     */
    static EventClassification(): string;
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
     * serialize()
     *
     * serialize() serializes the event data.
     */
    serialize(): string;
    /**
     * shouldBeBroadcasted()
     *
     * shouldBeBroadcasted() determines if the event should be broadcasted to the network.
     */
    shouldBeBroadcasted(): boolean;
    toString(): string;
}
//# sourceMappingURL=domain-event.d.ts.map