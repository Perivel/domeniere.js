import { NetworkEventQueueInterface } from "./network-event-queue.interface";
import { StoredEventInterface } from "../../event/event-store/stored-event.interface";


export abstract class NetworkEventQueue implements NetworkEventQueueInterface {

    constructor() {}

    /**
     * dequeue()
     * 
     * dequeue() gets all the items from the queue.
     * @throws any kind of exception when an error occurs.
     */
    public async abstract dequeue(): Promise<StoredEventInterface[]>;

    /**
     * enqueue()
     * 
     * enqueue() adds an event to the queue.
     * @throws any exception when an error occurs.
     * @param event the event to insert.
     */
    
    public async abstract enqueue(event: StoredEventInterface): Promise<void>;
}