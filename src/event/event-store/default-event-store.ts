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

    protected async getUnpublishedEvents(): Promise<StoredEvent[]> {
        return new Array<StoredEvent>();
    }
    
    public async save(events: StoredEvent | StoredEvent[]): Promise<void> {
        //
    }
}