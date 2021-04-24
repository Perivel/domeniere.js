import { DateTime, Queue } from "@perivel/foundation";
import { DomainEvent } from "../event.module";
import { EventStore } from "./event-store";
import { StoredEvent } from "./stored-event";
/**
 * DefaultEventStore
 *
 * DefaultEventStore si the defualt event store.
 */
export declare class DefaultEventStore extends EventStore {
    constructor();
    protected boradcastEvents(eventQueue: Queue<DomainEvent>): Promise<void>;
    getEventsWithinInterval(from: DateTime, to: DateTime): Promise<Array<StoredEvent>>;
    protected saveEvents(eventQueue: Queue<StoredEvent>): Promise<void>;
}
//# sourceMappingURL=default-event-store.d.ts.map