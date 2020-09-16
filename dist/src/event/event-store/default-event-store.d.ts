import { Queue } from "foundation";
import { DomainEvent } from "../event.module";
import { EventStore } from "./event-store";
import { StoredEvent } from "./stored-event";
export declare class DefaultEventStore extends EventStore {
    constructor();
    protected boradcastEvents(eventQueue: Queue<DomainEvent>): Promise<void>;
    protected saveEvents(eventQueue: Queue<StoredEvent>): Promise<void>;
}
//# sourceMappingURL=default-event-store.d.ts.map