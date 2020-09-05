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

    protected broadcastEvent(event: StoredEvent): Promise<void> {
        //
    }
    protected getUnpublishedEvents(): Promise<StoredEvent[]> {
        //
    }
    protected save(events: StoredEvent | StoredEvent[]): Promise<void> {
        //
    }
}