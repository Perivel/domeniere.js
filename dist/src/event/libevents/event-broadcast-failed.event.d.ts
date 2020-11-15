import { DomainEvent } from "../domain-event/domain-event";
import { DateTime } from "foundation";
export declare class EventBroadcastFailed extends DomainEvent {
    private readonly _error;
    constructor(error: Error, timestamp?: DateTime, id?: string | undefined);
    static EventName(): string;
    static EventClassification(): string;
    static EventVersion(): number;
    error(): Error;
    serialize(): string;
}
//# sourceMappingURL=event-broadcast-failed.event.d.ts.map