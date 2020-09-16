import { DomainEventInterface } from "./domain-event.interface";
import { Serializable, Timestamp } from "foundation";
import { DomainEventId } from "./domain-event-id";
export declare abstract class DomainEvent implements DomainEventInterface, Serializable {
    private _timestamp;
    private _id;
    private _eventName;
    private _eventClassification;
    private _eventVersion;
    constructor(timestamp?: Timestamp, id?: string);
    static EventClassification(): string;
    static EventName(): string;
    static EventVersion(): number;
    eventClassification(): string;
    eventId(): DomainEventId;
    eventName(): string;
    eventVersion(): number;
    isError(): boolean;
    isInternal(): boolean;
    occuredOn(): Timestamp;
    serialize(): string;
    shouldBeBroadcasted(): boolean;
}
//# sourceMappingURL=domain-event.d.ts.map