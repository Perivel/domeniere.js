import { DomainEventInterface } from "../../event/event.module";


export interface NetworkEventQueueInterface {

    /**
     * dequeue()
     * 
     * dequeue() gets the latest events in the queue
     */
    dequeue(): Promise<DomainEventInterface|null>;

    /**
     * enqueue()
     * 
     * enqueue() adds the event to the queue.
     * @param event The event to add.
     */
    enqueue(event: DomainEventInterface): Promise<void>;
}