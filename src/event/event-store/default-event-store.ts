import { Queue } from "@perivel/foundation";
import { DomainEvent } from "../event.module";
import { EventStore } from "./event-store";
import { StoredEvent } from "./stored-event";

/**
 * DefaultEventStore
 * 
 * DefaultEventStore si the defualt event store.
 */


export class DefaultEventStore extends EventStore {

    constructor() {
        super();
    }

    protected async boradcastEvents(eventQueue: Queue<DomainEvent>): Promise<void> {}

    protected async saveEvents(eventQueue: Queue<StoredEvent>): Promise<void> {}
}