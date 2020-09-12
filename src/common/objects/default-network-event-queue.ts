import { NetworkEventQueue } from "./network-event-queue";
import { StoredEventInterface } from "../../event/event-store/stored-event.interface";
import { Queue } from "foundation";

/**
 * The Default Network Event Queue
 */

export class DefaultNetworkEventQueue extends NetworkEventQueue {

    private queue: Queue<StoredEventInterface>;

    constructor() {
        super();
        this.queue = new Queue<StoredEventInterface>();
    }


    public async dequeue(): Promise<StoredEventInterface[]> {
        const elements = new Array<StoredEventInterface>();
        
        while (!this.queue.isEmpty()) {
            elements.push(this.queue.dequeue()!);
        }

        return elements;
    }

    public async enqueue(event: StoredEventInterface): Promise<void> {
        this.queue.enqueue(event);
    }
    
}