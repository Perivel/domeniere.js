import { EventHandler } from "../subscriber/event-handler.type";
import { DomainEventInterface } from "../domain-event/domain-event.interface";
import { EventStore } from "../event-store/event-store";

/**
 * EventStreamInterface
 * 
 * EventStreamInterface specifies the operations for an event stream
 */

export interface EventStreamInterface {

    /**
     * emit()
     * 
     * emit() publishes a domain event.
     */

    emit(event: DomainEventInterface): Promise<void>;

    /**
     * eventStore()
     * 
     * eventStore() gets the EventStore instance.
     */
    
    eventStore(): EventStore;

    /**
     * setEventStore()
     * 
     * setEventStore() sets the event store.
     */

    setEventStore(eventStore: EventStore): void;

    /**
     * creates a subscriber for the event stream.
     * @param id The id of the subscriber.
     * @param eventName The name of the event to listen for. This can be a specific event name or a wildcard.
     * @param priority The priority of the subscriber (the lower the number, the highrer the priority).
     * @param label a label to give to the subscriber.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if event propogation should stop if the handler encounters an error.
     */

    subscribe(id: string, eventName: string, priority: number, label: string, handler: EventHandler, stopPropogationOnError: boolean): void;
}