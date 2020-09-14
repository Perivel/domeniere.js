import { DomainEvent } from "../domain-event/domain-event";
import { Timestamp } from "foundation";
export declare class EventStored extends DomainEvent {
    private readonly _event;
    constructor(event: DomainEvent, timestamp?: Timestamp, id?: string | undefined);
    static EventName(): string;
    static EventClassification(): string;
    static EventVersion(): number;
    event(): DomainEvent;
    serialize(): string;
}
//# sourceMappingURL=event-stored.event.d.ts.map