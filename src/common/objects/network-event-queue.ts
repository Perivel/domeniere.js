import { NetworkEventQueueInterface } from "./network-event-queue.interface";
import { DomainEvent } from "../../event/event.module";


export abstract class NetworkEventQueue implements NetworkEventQueueInterface {

    constructor() {}

    /**
     * dequeue()
     * 
     * dequeue() gets all the items from the queue.
     * @throws any kind of exception when an error occurs.
     */
    public abstract dequeue(): Promise<DomainEvent|null>;

    /**
     * enqueue()
     * 
     * enqueue() adds an event to the queue.
     * @throws any exception when an error occurs.
     * @param event the event to insert.
     */
    
    public abstract enqueue(event: DomainEvent): Promise<void>;
}