import { NetworkEventQueueInterface } from "./network-event-queue.interface";
import { DomainEvent } from "../../event/event.module";
export declare abstract class NetworkEventQueue implements NetworkEventQueueInterface {
    constructor();
    /**
     * dequeue()
     *
     * dequeue() gets all the items from the queue.
     * @throws any kind of exception when an error occurs.
     */
    abstract dequeue(): Promise<DomainEvent | null>;
    /**
     * enqueue()
     *
     * enqueue() adds an event to the queue.
     * @throws any exception when an error occurs.
     * @param event the event to insert.
     */
    abstract enqueue(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=network-event-queue.d.ts.map