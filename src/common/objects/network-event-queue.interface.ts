import { StoredEventInterface } from "../../event/event-store/stored-event.interface";


export interface NetworkEventQueueInterface {

    /**
     * dequeue()
     * 
     * dequeue() gets the latest events in the queue
     */
    dequeue(): Promise<StoredEventInterface[]>;

    /**
     * enqueue()
     * 
     * enqueue() adds the event to the queue.
     * @param event The event to add.
     */
    enqueue(event: StoredEventInterface): Promise<void>;
}