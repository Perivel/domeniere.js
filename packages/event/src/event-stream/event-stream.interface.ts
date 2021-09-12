import { EventHandler } from "@swindle/event-emitter";
import { DomainEventInterface } from "../domain-event/domain-event.interface";
import { EventStore } from "../eventstore/event-store";
import { TransmittedEvent } from "../eventstore/transmitted-event";
import { DomainEventHandlerPriority } from "./domain-event-handler-priority.enum";
import { EventAggregate } from "./event-aggregate..type";
import { FrameworkEventHandlerPriority } from "./framework-event-handler-priority.enum";

/**
 * EventStreamInterface
 * 
 * EventStreamInterface specifies the operations for an event stream
 */


export interface EventStreamInterface {

    /**
     * initializeEvents()
     * 
     * initializes the state of the event stream.
     */

    initializeEvents(): Promise<void>;

    /**
     * emit()
     * 
     * emit() publishes a domain event.
     */

    emit(event: DomainEventInterface): Promise<void>;

    /**
     * eventStore()
     * 
     * eventStore() gets the event store.
     */
    
    eventStore(): EventStore;

    /**
     * publishEvents()
     * 
     * publishEvents() publishes (or broadcasts) all unpublished events.
     */

    publishEvents(): Promise<void>;

    /**
     * processTransmittedEvent()
     * 
     * processes a transmitted event.
     * @param transmittedEvent the event to process.
     */

    processTransmittedEvent(transmittedEvent: TransmittedEvent): Promise<void>;

    /**
     * setEventStore()
     * 
     * setEventStore() sets the event store.
     */

    setEventStore(eventStore: EventStore): void;

    /**
     * creates a subscriber for the event stream.
     * @param eventName The name of the event to listen for. This can be a specific event name or a wildcard.
     * @param priority The priority of the subscriber (the lower the number, the highrer the priority).
     * @param label a label to give to the subscriber.
     * @param handler The function to execute when an event occurs.
     * @param stopPropogationOnError indicates if event propogation should stop if the handler encounters an error.
     */

    subscribe(eventName: string|EventAggregate, handler: EventHandler, priority: FrameworkEventHandlerPriority|DomainEventHandlerPriority, label: string, stopPropogationOnError: boolean): void;
}