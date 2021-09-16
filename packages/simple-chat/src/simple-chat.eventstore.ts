import { EventStore } from "@domeniere/event";

/**
 * SimpleChatEventStore
 * 
 * The EventStore manages the flow of events throughout your application.
 * 
 * Learn more about EventStores at https://github.com/Perivel/domeniere/blob/master/src/event/README.md
 */


export abstract class SimpleChatEventStore extends EventStore {

    constructor() {
        super();
    }
}