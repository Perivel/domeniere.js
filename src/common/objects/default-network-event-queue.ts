import { NetworkEventQueue } from "./network-event-queue";
import { Queue } from "@perivel/foundation";
import { DomainEvent } from "../../event/event.module";


/**
 * The Default Network Event Queue
 */

export class DefaultNetworkEventQueue extends NetworkEventQueue {

    private queue: Queue<DomainEvent>;

    constructor() {
        super();
        this.queue = new Queue<DomainEvent>();
    }


    public async dequeue(): Promise<DomainEvent|null> {
        return this.queue.dequeue();
    }

    public async enqueue(event: DomainEvent): Promise<void> {
        this.queue.enqueue(event);
    }
    
}