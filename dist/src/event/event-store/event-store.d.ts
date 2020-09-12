import { DomainEvent } from "../domain-event/domain-event";
import { StoredEvent } from "./stored-event";
export declare abstract class EventStore {
    constructor();
    protected abstract getUnpublishedEvents(): Promise<StoredEvent[]>;
    abstract save(events: StoredEvent | StoredEvent[]): Promise<void>;
    store(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=event-store.d.ts.map