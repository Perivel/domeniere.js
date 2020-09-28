import { DomainEvent } from "../domain-event/domain-event";
import { Timestamp } from "foundation";
export declare class EventStoreFailed extends DomainEvent {
    private readonly _error;
    constructor(error: Error, timestamp?: Timestamp, id?: string | undefined);
    static EventName(): string;
    static EventClassification(): string;
    static EventVersion(): number;
    error(): Error;
    serialize(): string;
}
//# sourceMappingURL=event-store-failed.event.d.ts.map