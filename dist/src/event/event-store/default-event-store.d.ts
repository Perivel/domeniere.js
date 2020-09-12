import { EventStore } from "./event-store";
import { StoredEvent } from "./stored-event";
export declare class DefaultEventStore extends EventStore {
    constructor();
    protected getUnpublishedEvents(): Promise<StoredEvent[]>;
    save(events: StoredEvent | StoredEvent[]): Promise<void>;
}
//# sourceMappingURL=default-event-store.d.ts.map