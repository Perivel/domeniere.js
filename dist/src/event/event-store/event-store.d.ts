import { Queue } from "foundation";
import { DomainEvent } from "../domain-event/domain-event";
import { StoredEvent } from "./stored-event";
export declare abstract class EventStore {
    private _storageQueue;
    private _publishQueue;
    constructor();
    protected abstract boradcastEvents(eventQueue: Queue<DomainEvent>): Promise<void>;
    publishEvents(): Promise<void>;
    persistEvents(): Promise<void>;
    protected abstract saveEvents(eventQueue: Queue<StoredEvent>): Promise<void>;
    protected shouldBroadcastInternalEvents(): boolean;
    protected shouldSaveInternalEvents(): boolean;
    store(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=event-store.d.ts.map