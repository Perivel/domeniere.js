import { DomainEventInterface } from "./domain-event.interface";
import { Serializable, DateTime } from "foundation";
import { DomainEventId } from "./domain-event-id";
export declare abstract class DomainEvent implements DomainEventInterface, Serializable {
    private _timestamp;
    private _id;
    private _eventName;
    private _eventClassification;
    private _eventVersion;
    constructor(timestamp?: DateTime, id?: string);
    static EventClassification(): string;
    static EventName(): string;
    static EventVersion(): number;
    eventClassification(): string;
    eventId(): DomainEventId;
    eventName(): string;
    eventVersion(): number;
    isError(): boolean;
    isInternal(): boolean;
    occuredOn(): DateTime;
    serialize(): string;
    shouldBeBroadcasted(): boolean;
}
//# sourceMappingURL=domain-event.d.ts.map